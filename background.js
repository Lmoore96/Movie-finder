// Background Script (background.js)

// Create a cache to store the streaming platform data
let platformData = {};

async function fetchPlatformData(title) {
  // Check if the data is already in the cache
  if (platformData[title]) {
    return platformData[title];
  }

  try {
    // Fetch data from the streaming platform APIs
    const netflixData = await fetch(`https://api.netflix.com/title/${title}`).then(res => res.json());
    const huluData = await fetch(`https://api.hulu.com/title/${title}`).then(res => res.json());
    const amazonData = await fetch(`https://api.amazon.com/title/${title}`).then(res => res.json());
    const disneyData = await fetch(`https://api.disneyplus.com/title/${title}`).then(res => res.json());
    const hboData = await fetch(`https://api.hbomax.com/title/${title}`).then(res => res.json());
    const paramountData = await fetch(`https://api.paramountplus.com/title/${title}`).then(res => res.json());

    // Combine the data and store it in the cache
    platformData[title] = {
      netflix: netflixData,
      hulu: huluData,
      amazon: amazonData,
      disney: disneyData,
      hbo: hboData,
      paramount: paramountData
    };

    return platformData[title];
  } catch (error) {
    console.error('Error fetching platform data:', error);
    return null;
  }
}
