"use strict";
// Fetch data from a REST API endpoint
async function fetchData(url = "https://media1.edu.metropolia.fi/restaurant/api/v1/restaurants", options = {}) {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    if (json.error) {
      throw new Error(json.error);
    } else {
      throw new Error('HTTP error: ' + response.status);
    }
  }
  return json;
}
window.fetchData = fetchData;