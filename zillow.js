async function fetchData() {
  document.getElementById('loading').style.display = 'block';
  var budget = document.getElementById("budget").value.toString();
  var street = document.getElementById("street").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;

  const url = `https://zillow56.p.rapidapi.com/search?location=${city}&price_max=${budget}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "7f1747c93dmsh4c1913f416a270fp159513jsn6607c1734003",
      "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    document.getElementById('loading').style.display = 'none';

    houses = result.results;

    houses.forEach((house) => {
      // Create Container for Each House's Info
      const houseContainer = document.createElement("div");
      houseContainer.className = "house-info";

      // Display House Image
      const houseImage = document.createElement("img");
      houseImage.src = house.imgSrc;
      houseContainer.appendChild(houseImage);

      // Display House Address
      const houseAddress = document.createElement("h4");
      houseAddress.textContent = `${house.streetAddress}, ${house.city}, ${house.state} ${house.zipcode}`;
      houseContainer.appendChild(houseAddress);

      // Display House Price
      const housePrice = document.createElement("h4");
      housePrice.textContent = `Price: $${house.price}`;
      houseContainer.appendChild(housePrice);

      // Append House Container to the Grid
      document.getElementById("houses").appendChild(houseContainer);
    });
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  document.getElementById("thankYouMessage").style.display = "block";
  fetchData();
});
