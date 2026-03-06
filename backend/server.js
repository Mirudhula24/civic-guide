const express = require("express");
const cors = require("cors");
require("dotenv").config();
const schemes = require("./data/schemes.json");
const { detectIntent } = require("./intentRouter");
const { ComprehendClient, DetectDominantLanguageCommand } = require("@aws-sdk/client-comprehend");
const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { semanticSearch } = require("./retrieval");

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
    const schemesFound = semanticSearch(prompt, filteredSchemes);
    let eligibleSchemes = schemesFound;

    if (userProfile) {
      eligibleSchemes = schemesFound.filter((scheme) => {

        if (scheme.income && userProfile.income > scheme.income) {
          return false;
        }

        if (scheme.age) {
          if (
            userProfile.age < scheme.age.min ||
            userProfile.age > scheme.age.max
          ) {
            return false;
          }
        }

        return true;
      });
    }    
    let context = "";

    eligibleSchemes.forEach((scheme) => {
      context += `
    Scheme Name: ${scheme.name}
    Description: ${scheme.description}
    Eligibility: ${scheme.eligibility}
    Benefits: ${scheme.benefits}

    `;
    });

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
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 400,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content:  `
            User question:
            ${prompt}
            
            Use the following scheme information if relevant:
            
            ${context}
            
            Explain in simple terms for a citizen.
            `
          }
        ]
      })
    });

    const response = await bedrock.send(command);

    const decoded = new TextDecoder().decode(response.body);

    const parsed = JSON.parse(decoded);

    const rawReply = parsed.content[0].text;

    const reply = rawReply
      .replace(/\\n/g, "\n")
      .replace(/\n\s+/g, "\n")
      .trim();

    res.json({
        intent,
        reply
    });

  } catch (error) {
    console.error("BEDROCK ERROR:", error);
    res.status(500).json({ error: "Bedrock request failed" });
  }
});
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});