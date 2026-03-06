import { ComprehendClient, DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";

const client = new ComprehendClient({
  region: "ap-south-1", // Mumbai region
});

export async function detectLanguage(text: string) {
  const command = new DetectDominantLanguageCommand({
    Text: text,
  });

  const response = await client.send(command);

  return response.Languages?.[0]?.LanguageCode || "en";
}