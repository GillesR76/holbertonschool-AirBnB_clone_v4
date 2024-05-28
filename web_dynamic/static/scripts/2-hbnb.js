$(document).ready(function () {
  let checkedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      checkedAmenities[$(this).data("id")] = $(this).data("name");
    } else {
      delete checkedAmenities[$(this).data("id")];
    }

    let lst = Object.values(checkedAmenities);
    if (lst.length > 0) {
      $("div.amenities h4").text(Object.values(checkedAmenities).join(", "));
    } else {
      $("div.amenities h4").html("&nbsp;");
    }
  });

  // Make a GET request to the status API
  $.get(
    "http://0.0.0.0:5001/api/v1/status/",
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
});
