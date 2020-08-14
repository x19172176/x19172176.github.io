var elementAdditionPosition = "beforeend";

function getTasks() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Add the json stuff
      let container = document.getElementById("container");
      let responses = JSON.parse(this.responseText);

      for (var i = 0; i < responses.length; i++) {
        container.insertAdjacentHTML(
          elementAdditionPosition,
          createResponse(responses[i])
        );
      }
    }
  };
  xhttp.open("GET", "https://cloudappservices-api.herokuapp.com/todos", true);
  xhttp.send();
}

window.sendForm = function (event) {
  event.preventDefault();
  var xhttp = new this.XMLHttpRequest();
  xhttp.open("POST", "https://cloudappservices-api.herokuapp.com/todos", true);
  xhttp.onload = function (event) {
    let container = document.getElementById("container");
    let response = JSON.parse(event.target.response);

    container.insertAdjacentHTML(
      elementAdditionPosition,
      createResponse(response)
    );
  };
  var formData = new this.FormData(document.getElementById("todo_form"));
  xhttp.send(formData);
  document.getElementById("task_input").value = "";
};

function createResponse(response) {
  return (
    `<div class="task" id="${response.id}" onclick="deleteResponse('${response.id}')">` +
    "[" +
    response.id +
    "]: " +
    response.task +
    "<br />" +
    "</div>"
  );
}
function deleteResponse(response_id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `https://cloudappservices-api.herokuapp.com/todos/${response_id}`, true);
  xhttp.onload = function () {
    let target = document.getElementById(response_id);
    target.parentNode.removeChild(target);
  };
  xhttp.send(null);
}

getTasks();

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: 53.3498, lng: - 6.2603};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

var correctCaptcha = function(response) {
        alert(response);
    };

document.getElementById("my_captcha_form").addEventListener("submit",function(evt)
  {
  
  var response = grecaptcha.getResponse();
  if(response.length == 0) 
  { 
    //reCaptcha not verified
    alert("please verify you are humann!"); 
    evt.preventDefault();
    return false;
  }
  //captcha verified
  //do the rest of your validations here
  
});
