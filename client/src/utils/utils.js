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
  const queryWords = query.toLowerCase().split(/\s+/);
  const queryWordCounts = { bird: 0, cat: 0, dog: 0, tiger: 0 };
  queryWords.forEach(word => {
    if (queryWordCounts.hasOwnProperty(word)) {
      queryWordCounts[word] += 1;
    }
  });
  return queryWordCounts;
};