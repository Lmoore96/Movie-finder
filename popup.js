// Popup Script (popup.js)

// Get references to the DOM elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('resultsContainer');

// Add an event listener to the search button
searchButton.addEventListener('click', async () => {
  const title = searchInput.value.trim();
  if (title) {
    // Fetch the platform data from the background script
    const platformData = await chrome.runtime.sendMessage({ type: 'fetchPlatformData', title });

    // Display the search results
    displayResults(platformData);
  }
});

function displayResults(data) {
  // Clear the previous results
  resultsContainer.innerHTML = '';

  if (!data) {
    resultsContainer.textContent = 'No results found.';
    return;
  }

  // Create and append the result elements
  for (const [platform, platformData] of Object.entries(data)) {
    const resultElement = document.createElement('div');
    resultElement.textContent = `${platform}: ${platformData.title} (${platformData.year})`;
    resultsContainer.appendChild(resultElement);
  }
}
