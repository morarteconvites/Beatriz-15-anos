const video = document.getElementById("camera");
const canvas = document.getElementById("canvas");
const btnFoto = document.getElementById("btn-capturar");
const btnSalvar = document.getElementById("btn-salvar");
const frame = document.getElementById("frame");

navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    video.srcObject = stream;
});

btnFoto.onclick = () => {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

    btnSalvar.href = canvas.toDataURL("image/png");
    btnSalvar.style.display = "block";
};
