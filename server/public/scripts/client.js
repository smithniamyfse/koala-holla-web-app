console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Event listener that uses event delegation to add a Koala
  $("#addButton").on("click", addKoala);

  // load existing koalas on page load
  getKoalas();

  // Listener to update koala transfer status
  $("#viewKoalas").on("click", ".transfer-btn", handleTransferReady);

  // Event listener that uses event delegation
  $("#viewKoalas").on("click", ".delete-button", deleteKoala);
}); // end doc ready

// initial GET request for ALL koalas
function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    type: "GET",
    url: "/koalas",
  }).then((response) => {
    // create console log to make sure it works
    console.log("GET /koalas response:", response);
    // render koalas
    render(response);
  });
} // end getKoalas

// delete a koala with a given id
function deleteKoala() {
  // get the id of the koala to delete
  console.log("in deleteKoala: ", $(this));

  // Use DOM traversal to get the data id of the koalas table row
  const koalaId = $(this).parent().parent().data("id");

  // Send a delete request to the server
  $.ajax({
    method: "DELETE",
    url: `/koalas/${koalaId}`,
  })
    .then((response) => {
      console.log("deleted a koala");
      getKoalas();
    })
    .catch((error) => {
      console.log("Error in delete request - deleteKoala()", error);
      // Notifies the user with an alert window
      alert("Error with deleting a koala");
    });
}

function addKoala() {
  console.log("in addKoala on click");
  // get user input and put in an object
  // using a test object
  let newKoala = {
    name: $("#nameIn").val(),
    age: $("#ageIn").val(),
    gender: $("#genderIn").val(),
    ready_to_transfer: $("#readyForTransferIn").val(),
    notes: $("#notesIn").val(),
  };

  $.ajax({
    type: "POST",
    url: "/koalas",
    data: newKoala,
  })
    .then(function (response) {
      console.log("Response from server.", response);
      $("#nameIn").val(""),
        $("#ageIn").val(""),
        $("#genderIn").val(""),
        $("#readyForTransferIn").val(""),
        $("#notesIn").val("");
      getKoalas();
    })
    .catch(function (error) {
      console.log("Error in POST", error);
      alert("Unable to add koala at this time. Please try again later.");
    });
}

// function render
function render(koalas) {
  $("#viewKoalas").empty();
  // loop through the koalas
  for (let i = 0; i < koalas.length; i++) {
    if (`${koalas[i].ready_to_transfer}` == "N") {
      $("#viewKoalas").append(`
    <tr data-id=${koalas[i].id}>
    <td>${koalas[i].name}</td>
    <td>${koalas[i].age}</td>
    <td>${koalas[i].gender}</td>
    <td>${koalas[i].ready_to_transfer}</td>
    <td>${koalas[i].notes}</td>
    <td><button class="transfer-btn"> Mark Ready</button></td>
    <td><button class='delete-button'>Delete</button></td>
</tr>
    `);
    } else {
      $("#viewKoalas").append(`
  <tr data-id=${koalas[i].id}>
  <td>${koalas[i].name}</td>
  <td>${koalas[i].age}</td>
  <td>${koalas[i].gender}</td>
  <td>${koalas[i].ready_to_transfer}</td>
  <td>${koalas[i].notes}</td>
  <td>Ready to Transfer! :)</td>
  <td><button class='delete-button'>Delete</button></td>
</tr>
  `);
    }
  }
}

// PUT request to handle when the transferReady status is changed from 'n' to 'y'
function handleTransferReady() {
  console.log("in transferReady");
  console.log("This is: ", $(this));
  const koalaId = $(this).parent().parent().data("id");
  console.log("koalaId is: ", koalaId);

  $.ajax({
    method: "PUT",
    url: `/koalas/${koalaId}`,
  })
    .then((response) => {
      console.log("Koala ready for transfer! Response: ", response);
      getKoalas();
    })
    .catch((error) => {
      console.log("Error changing transfer status", error);
      alert("Transfer status NOT updated!");
      res.sendStatus(500);
    });
}
