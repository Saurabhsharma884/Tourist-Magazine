const placesBox = document.getElementById("places");

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
  function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    const api_url = ` https://api.geoapify.com/v2/places?categories=commercial.shopping_mall,catering.restaurant,tourism,entertainment,leisure&filter=circle:77.3210786,28.5691484,5000&bias=proximity:${longitude},${latitude}&limit=10&apiKey=ef550c29b846479ea69d61ea4c6cdc7f`;
    console.log(position);
    // console.log(api_url)
    getPlaces(api_url);
  }
}

function getPlaces(url) {
  var requestOptions = {
    method: "GET",
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      addPlaceToUI(result.features);
      console.log(result.features);
    })
    .catch((error) => console.log("error", error));
}

function addPlaceToUI(places) {
  places.forEach((p) => {
    categories = "";
    p.properties.categories.forEach((e) => {
      categories += " " + e;
    });

    var a = `<div class="col col-6 mb-2">
      <div class="card" style="height: 200px;">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h2 class="card-title">${p.properties.address_line1}</h2>
              <h5 class="card-title">${p.properties.address_line2}</h5>
              <p class="card-text">${categories}</p>
              <p class="card-text"><small class="text-muted">${
                p.properties.distance / 1000
              } Kms</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

    placesBox.innerHTML += a;
  });
}

getUserLocation();

