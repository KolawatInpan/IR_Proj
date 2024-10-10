// utils.js

export const createChartData = (labels, data, label, backgroundColor, borderColor) => ({
  labels,
  datasets: [
    {
      label,
      data,
      backgroundColor,
      borderColor,
      borderWidth: 1,
    },
  ],
});

export const countQueryWords = (query) => {
  // Remove punctuation and convert to lowercase
  const cleanedQuery = query.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase();
  const words = cleanedQuery.split(/\s+/);

  const wordCounts = {
    bird: 0,
    cat: 0,
    dog: 0,
    tiger: 0,
  };

  words.forEach((word) => {
    if (wordCounts.hasOwnProperty(word)) {
      wordCounts[word] += 1;
    }
  });

  return wordCounts;
};