$(document).ready(function () {
  let checkedAmenities = {};
  let checkedStatesAndCities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data("id")] = $(this).data("name");
      checkedStatesAndCities[$(this).data("id")] = $(this).data("name");
    } else {
      delete checkedAmenities[$(this).data("id")];
      delete checkedStatesAndCities[$(this).data("id")];
    }

    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $("div.amenities h4").text(lst.join(", "));
    } else {
      $("div.amenities h4").html("&nbsp;");
    }

    lst = Object.values(checkedStatesAndCities);
    if (lst.length > 0) {
      $("div.locations h4").text(lst.join(", "));
    } else {
      $("div.locations h4").html("&nbsp;");
    }
  });

  // Make a GET request to the status API
  $.get(
    "http://0.0.0.0:5001/api/v1/places_search/",
    function (data, textStatus, jqXHR) {
      if (data.status === "OK") {
        // If the status is "OK", add the class "available" to the div#api_status
        $("#api_status").addClass("available");
      } else {
        // Otherwise, remove the class "available" from the div#api_status
        $("#api_status").removeClass("available");
      }
    }
  );

  // When the button is clicked, make a POST request with the checked amenities
  $("button").click(function () {
    $.post(
      "http://0.0.0.0:5001/api/v1/places_search/",
      JSON.stringify({
        amenities: Object.keys(checkedAmenities),
        states: Object.keys(checkedStatesAndCities),
        cities: Object.keys(checkedStatesAndCities),
      }),
      function (data, textStatus, jqXHR) {
        // Loop through the data and create an article for each place
        data.forEach(function (place) {
          let article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${
            place.max_guest != 1 ? "s" : ""
          }</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${
            place.number_rooms != 1 ? "s" : ""
          }</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
            place.number_bathrooms != 1 ? "s" : ""
          }</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `;

          // Append the article to the places section
          $("section.places").append(article);
        });
      },
      "json"
    );
  });

  // Add a click event listener to the span next to the Reviews h2
  $("#toggle_reviews").click(function () {
    // Check the current text of the span
    if ($(this).text() === "show") {
      // If the text is "show", fetch and display the reviews and change the text to "hide"
      $.get(
        "http://0.0.0.0:5001/api/v1/reviews/",
        function (data, textStatus, jqXHR) {
          // Loop through the data and create a list item for each review
          data.forEach(function (review) {
            let listItem = `<li>${review.name}</li>`;
            // Append the list item to the reviews list
            $("#reviews_list").append(listItem);
          });
          // Change the text of the span to "hide"
          $("#toggle_reviews").text("hide");
          // Show the reviews list
          $("#reviews_list").show();
        }
      );
    } else {
      // If the text is "hide", remove all review elements from the DOM and change the text back to "show"
      $("#reviews_list").empty();
      // Change the text of the span to "show"
      $("#toggle_reviews").text("show");
    }
  });
});
