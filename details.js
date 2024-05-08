import { displayError, options, removeLoader } from "./main.js";

const urlParams = new URLSearchParams(window.location.search);
const propertyID = urlParams.get("id");
const API_URL = `https://bayut.p.rapidapi.com/properties/detail?externalID=${propertyID}`;

const propertyDetails = document.getElementById("propertyDetails");

fetch(API_URL, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then((data) => {
    console.log(data);
    removeLoader();
    displayPropertyDetails(data);
  })
  .catch((error) => {
    console.error("FETCH ERROR:", error);
    displayError("An error occurred fetching the data.");
  });

function displayPropertyDetails(property) {
  console.log(property);
}
