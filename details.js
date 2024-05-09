import { formatPrice } from "./utils.js";

const urlParams = new URLSearchParams(window.location.search);
const propertyID = urlParams.get("id");
const API_URL = `https://bayut.p.rapidapi.com/properties/detail?externalID=${propertyID}`;

const propertyDetails = document.getElementById("propertyDetails");
const loader = document.querySelector(".loader");
const loaderContainer = document.querySelector(".loader-container");

export function removeLoader() {
  loader.style.display = "none";
  loaderContainer.style.display = "none";
}

export function displayError(message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error";
  errorElement.textContent = message;
  main.appendChild(errorElement);
}

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "169fe60703mshe88b7af446e7bd9p130d2cjsnabbed6375b91",
    "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  },
};

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
  const formattedPrice = formatPrice(property.price);

  propertyDetails.innerHTML = ` <div class="image-container">
  <img
    src="${property.coverPhoto.url}"
    alt=""
    class="cover-image"
  />
  <button class="label purpose">${property.purpose.replace(/[-\s]/g, ' ')}</button>
  <button class="label price">${"$" + formattedPrice}</button>
</div>

<div class="overview-container">
  <h2 class="">Overview</h2>
  <div class="property-overview-box">

    <div class="property-overview-item">
      <div class="icon-box">
        <img src="images/icon-bedrooms.svg" alt="">
      </div>

      <div class="property-overview-content">
        <h3>Bedrooms</h3>
        <p>${property.rooms}</p>
      </div>
    </div>
 
    <div class="property-overview-item">
      <div class="icon-box">
        <img src="images/icon-bathrooms.svg" alt="">
      </div>

      <div class="property-overview-content">
        <h3>Bathrooms</h3>
        <p>${property.baths}</p>
      </div>
    </div>



    <div class="property-overview-item">
      <div class="icon-box">
        <img src="images/icon-areas.svg" alt="">
      </div>

      <div class="property-overview-content">
        <h3>Area</h3>
        <p>${property.area.toFixed(2)} ft</p>
      </div>
    </div>


  </div>
</div>

<div class="overview-container">
  <h2 class="">About this property</h2>

  <p class="description">${property.description}</p>
   
  </div>`;
}
