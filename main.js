const API_URL =
  "https://bayut.p.rapidapi.com/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4";
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "169fe60703mshe88b7af446e7bd9p130d2cjsnabbed6375b91",
    "X-RapidAPI-Host": "bayut.p.rapidapi.com",
  },
};
const propertyListings = document.getElementById("propertiesList");
const main = document.querySelector("main");
const loader = document.querySelector(".loader");

fetch(API_URL, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("NETWORK RESPONSE ERROR");
    }
  })
  .then((data) => {
    removeLoader();
    displayProperties(data?.hits);
  })
  .catch((error) => {
    console.error("FETCH ERROR:", error);
    displayError("An error occurred fetching the data.");
  });

export function removeLoader() {
  loader.style.display = "none";
}

function displayProperties(properties) {
  propertyListings.style.display = "grid";
  properties.forEach((property) => {
    const propertyLink = document.createElement("a");
    propertyLink.href = `property-details.html?id=${property.externalID}`;
    propertyLink.className = "property-link";

    const propertyElement = document.createElement("div");
    propertyElement.className = "property";

    const location = document.createElement("p");
    location.textContent =
      property.location[0].name +
      " " +
      property.location[1].name +
      ", " +
      property.location[2].name;
    location.className = "location";

    const title = document.createElement("h2");
    let formattedTitle = property.title.split("||")[0].trim();
    title.textContent = formattedTitle;
    title.className = "title";

    const price = document.createElement("p");
    price.textContent = "$" + property.price;
    price.className = "price";

    const propertyImage = document.createElement("img");
    propertyImage.src = property.coverPhoto.url;
    propertyImage.className = "property-image";

    propertyLink.appendChild(propertyElement);

    propertyElement.appendChild(propertyImage);
    propertyElement.appendChild(title);
    propertyElement.appendChild(price);
    propertyElement.appendChild(location);

    propertyListings.appendChild(propertyLink);
  });
}

export function displayError(message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error";
  errorElement.textContent = message;
  main.appendChild(errorElement);
}
