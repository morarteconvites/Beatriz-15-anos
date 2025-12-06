let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let switchBtn = document.getElementById("switchCamera");
let takePhotoBtn = document.getElementById("takePhoto");
let downloadLink = document.getElementById("downloadLink");

let currentCamera = "user"; // frontal

function startCamera() {
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: currentCamera }
    })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        alert("Erro ao acessar câmera: " + err);
    });
}

switchBtn.onclick = () => {
    currentCamera = currentCamera === "user" ? "environment" : "user";
    startCamera();
};

takePhotoBtn.onclick = () => {
    let context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let frame = document.getElementById("frame");
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);

    let imageData = canvas.toDataURL("image/png");

    downloadLink.href = imageData;
    downloadLink.click();
};

startCamera();
let usandoFrontal = false;

document.getElementById("btn-virar").onclick = () => {
    usandoFrontal = !usandoFrontal;

    navigator.mediaDevices.getUserMedia({
        video: { facingMode: usandoFrontal ? "user" : "environment" }
    }).then(stream => {
        video.srcObject = stream;
    });
};
