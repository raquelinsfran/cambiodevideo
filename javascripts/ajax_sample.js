let number = 0;
let data = []; // Variable para almacenar los datos recuperados de ajax.json
const button = document.getElementById('btn');
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoContainer = document.getElementById("videoContainer"); // Cambio de ID para el contenedor
const videoArea = document.getElementById("videoIframe");

function getData() {
  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == 200) {
      data = request.response; // Almacenar los datos en la variable 'data'
      showVideoData(number); // Mostrar los datos iniciales
    }
  };
  request.open("GET", "ajax.json");
  request.responseType = "json";
  request.send(null);
}

function showVideoData(index) {
  titleArea.innerHTML = data[index].title;
  contentArea.innerHTML = data[index].content;
  videoArea.src = data[index].url;
}

function changeVideo(event) {
  event.preventDefault(); // Evita el comportamiento por defecto del botón

  if (data.length === 0) {
    getData();
  } else {
    number = (number + 1) % data.length;
    showVideoData(number);
    videoContainer.style.display = "block"; // Muestra el contenedor del video
    videoArea.src = ""; // Borra la URL del video para evitar reproducción automática
    videoArea.src = data[number].url; // Cambia la URL del video
  }
}

window.onload = function () {
  getData();
  button.addEventListener('click', changeVideo);
};
