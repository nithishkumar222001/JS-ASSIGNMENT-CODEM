document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const zipcodeInput = document.getElementById("zipcodeInput");
  const resultDiv = document.getElementById("result");
  const errorDiv = document.getElementById("error");

  submitBtn.addEventListener("click", function () {
    const zipcode = zipcodeInput.value.trim();

    if (zipcode.length === 5 && /^\d+$/.test(zipcode)) {
      fetch(`https://api.zippopotam.us/us/${zipcode}`)
        .then((response) => response.json())
        .then((data) => {
          const city = data.places[0]["place name"];
          const state = data.places[0]["state"];
          const country = data.country;
          resultDiv.innerHTML = `<strong>City:</strong> ${city}<br><strong>State:</strong> ${state}<br><strong>Country:</strong> ${country}`;
          errorDiv.innerHTML = "";
        })
        .catch((error) => {
          console.error(error);
          errorDiv.innerHTML = "An error occurred while fetching data.";
          resultDiv.innerHTML = "";
        });
    } else {
      resultDiv.innerHTML = "";
      errorDiv.innerHTML = "The given zipcode is invalid";
    }
  });

  resetBtn.addEventListener("click", function () {
    zipcodeInput.value = "";
    resultDiv.innerHTML = "";
    errorDiv.innerHTML = "";
  });
});
