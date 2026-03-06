const natural = require("natural");
const schemes = require("./data/schemes.json");

const tfidf = new natural.TfIdf();

// build document index
schemes.forEach((scheme) => {
  const text =
    scheme.name +
    " " +
    scheme.description +
    " " +
    scheme.eligibility +
    " " +
    scheme.benefits;

  tfidf.addDocument(text);
});

function semanticSearch(query, schemeList) {
    const natural = require("natural");
    const tfidf = new natural.TfIdf();
  
    schemeList.forEach((scheme) => {
      const text =
        scheme.name +
        " " +
        scheme.description +
        " " +
        scheme.eligibility +
        " " +
        scheme.benefits;
  
      tfidf.addDocument(text);
    });
  
    const scores = [];
  
    schemeList.forEach((scheme, index) => {
      let score = 0;
  
      tfidf.tfidfs(query, function (i, measure) {
        if (i === index) score = measure;
      });
  
      scores.push({ scheme, score });
    });
  
    scores.sort((a, b) => b.score - a.score);
  
    return scores.slice(0, 3).map((s) => s.scheme);
  }
  
module.exports = { semanticSearch };
