export function detectIntent(input: string) {
  const text = input.toLowerCase()

  if (
    text.includes("scholarship") ||
    text.includes("scheme") ||
    text.includes("government") ||
    text.includes("eligibility")
  ) {
    return "scheme"
  }

  return "general"
}