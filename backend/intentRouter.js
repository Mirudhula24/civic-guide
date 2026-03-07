function detectIntent(input) {
    if(!input) return "general";
    const text = input.toLowerCase();
  
    const schemeKeywords = [
      // education schemes
      "scholarship",
      "scheme",
      "government",
      "eligibility",
  
      // health schemes
      "ayushman",
      "health",
      "insurance",
      "hospital",
      "treatment",
  
      // Hindi
      "योजना",
      "छात्रवृत्ति",
      "स्वास्थ्य",
  
      // Tamil (nice bonus for demo)
      "திட்டம்",
      "அரசு"
    ];
  
    for (const word of schemeKeywords) {
      if (lower.text.includes(word)) {
        return "scheme";
      }
    }
  
    return "general";
  }
  
  module.exports = { detectIntent };