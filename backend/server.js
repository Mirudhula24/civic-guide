const express = require("express");
const cors = require("cors");
require("dotenv").config();
const schemes = require("./data/schemes.json");
const { detectIntent } = require("./intentRouter");
const { ComprehendClient, DetectDominantLanguageCommand } = require("@aws-sdk/client-comprehend");
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { semanticSearch } = require("./retrieval");
const {
  BedrockAgentRuntimeClient,
  RetrieveAndGenerateCommand
} = require("@aws-sdk/client-bedrock-agent-runtime");




const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

const client = new ComprehendClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bedrock = new BedrockRuntimeClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const kbClient = new BedrockAgentRuntimeClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

function findRelevantScheme(query) {
  const text = query.toLowerCase();

  for (const scheme of schemes) {

    // check scheme name
    if (text.includes(scheme.name.toLowerCase())) {
      return scheme;
    }

    // check keywords
    for (const keyword of scheme.keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return scheme;
      }
    }
  }

  return null;
}
function checkEligibility(user, scheme) {

  if (scheme.income && user.income > scheme.income) {
    return false;
  }

  if (scheme.age) {
    if (user.age < scheme.age.min || user.age > scheme.age.max) {
      return false;
    }
  }

  return true;
}

app.post("/detect-language", async (req, res) => {
  try {
    const { text } = req.body;

    const command = new DetectDominantLanguageCommand({
      Text: text,
    });

    const response = await client.send(command);

    const language = response.Languages?.[0]?.LanguageCode || "en";

    res.json({ language });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Language detection failed" });
  }
});
app.post("/ask-ai", async (req, res) => {
  try {
    const { prompt, userProfile } = req.body;
    const intent = detectIntent(prompt);
   
    let filteredSchemes = schemes;

    if (intent === "scheme") {
      filteredSchemes = schemes.filter(
        s => s.category === "education"
      );
    }
    //const schemesFound = semanticSearch(prompt, filteredSchemes);
    const kbCommand = new RetrieveAndGenerateCommand({
      input: {
        text: prompt
      },
      retrieveAndGenerateConfiguration: {
        type: "KNOWLEDGE_BASE",
        knowledgeBaseConfiguration: {
          knowledgeBaseId: "O1CVOKYQ0C",
          modelArn:
            "arn:aws:bedrock:ap-south-1::foundation-model/anthropic.claude-3-haiku-20240307-v1:0"
        }
      }
    });
    
    const kbResponse = await kbClient.send(kbCommand);
    
    const reply = kbResponse.output.text;
    

    let systemPrompt = "";
    if (intent === "scheme") {
      systemPrompt = `
    You are a civic assistant helping Indian citizens understand government schemes.
    
    Rules:
    - Use simple language.
    - Use clean bullet points or numbered lists.
    - Avoid escape characters like \\n in the output.
    - Format responses clearly for reading in a chat interface.
    `;
    } else {
      systemPrompt = `
    You are a helpful assistant.
    
    Rules:
    - Respond clearly.
    - Use proper spacing and bullet points if needed.
    `;
    }

    res.json({
        intent,
        reply
    });

  } catch (error) {
    console.error("BEDROCK ERROR:", error);
    res.status(500).json({ error: "Bedrock request failed" });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running");
});