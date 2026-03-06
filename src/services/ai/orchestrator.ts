import { detectIntent } from "./intentRouter";
import { runRAG } from "./ragService";
import { runEligibilityFlow } from "./lexService";
//import { detectLanguage } from "./translateService";

export async function handleUserQuery(input: string) {

  //const language = await detectLanguage(input);
  //console.log("Detected language:", language);

  const intent = detectIntent(input);

  if (intent === "Eligibility") {
    const eligibilityData = await runEligibilityFlow();
    return `Eligibility Flow Triggered: ${JSON.stringify(eligibilityData)}`;
  }

  const ragResult = await runRAG(input);
  return `RAG Flow Triggered: ${ragResult}`;
}