$(document).ready(function () {
  const selectedAmen = {};

  $('input[type="checkbox"]').change(function () {
    if (this.checked) {
      selectedAmen[$(this).data("id")] = $(this).data("name");
    } else {
      delete selectedAmen[$(this).data("id")];
    }

    const amenList = Object.values(selectedAmen).join(", ");
    $("div.amenities h4").text(amenList);
  });
});
