// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $.ajax("/burgers", {
    type: "GET"
  }).then(function (data) {
    var devouredElem = $("#devouredBurgers");
    var nodevouredElem = $("notDevouredBurgers");

    var burgers = data.burgers
    var len = burgers.length

    for (var i = 0; i < len; i++) {
      var new_elem =
        "<li>" +
        burgers[i].id +
        ". " + burgers[i].name +
        "<button class='change-devour' data-id='" +
        burgers[i].id +
        "' data-newdevour='" +
        !burgers[i].devoured +
        "'>";

      if (burgers[i].devoured) {
        new_elem += "DEVOUR TIME!";
      } else {
        new_elem += "WAKE UP!";
      }

      new_elem += "</button>";

      new_elem +=
        "<button class='delete-burger' data-id='" +
        burgers[i].id +
        "'>DELETE!</button></li>";

      if (burgers[i].devoured) {
        devouredElem.append(new_elem);
      } else {
        nodevouredElem.append(new_elem);
      }
    }
  });


  $(document).on("click", ".change-devoured", function (event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newsleep");

    var newDevouredState = {
      devoured: newDevour
    };

    // Send the PUT request.
    $.ajax("/api/burger/" + id, {
      type: "PUT",
      dataType: "json",
      data: JSON.stringify(newDevouredState),
      contentType: "application/json"
    }).then(
      function () {
        console.log("changed devoured to", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      name: $("#burg").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      dataType: "json",
      data: JSON.stringify(newBurger),
      contentType: "application/json"
    }).then(
      function () {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $(document).on("click", ".delete-burger", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});

