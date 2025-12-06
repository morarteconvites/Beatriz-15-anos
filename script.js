navigator.mediaDevices.getUserMedia({ video: { facingMode: currentFacingMode } })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Erro ao acessar a câmera:", err);
    alert("Não foi possível acessar a câmera: " + err.name);
  });
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const switchBtn = document.getElementById("switchCamera");
const takePhotoBtn = document.getElementById("takePhoto");
const downloadLink = document.getElementById("downloadLink");

let currentFacingMode = "user";

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: currentFacingMode },
      audio: false
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("Erro ao acessar a câmera:", err);
    alert("Não foi possível acessar a câmera. Verifique permissões.");
  }
}

switchBtn.onclick = () => {
  currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
  startCamera();
};

takePhotoBtn.onclick = () => {
  const ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const frameImg = document.getElementById("frame");
  ctx.drawImage(frameImg, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/png");
  downloadLink.href = dataUrl;
  downloadLink.download = "foto_com_moldura.png";
  downloadLink.style.display = "block";
  downloadLink.click();
};

startCamera();
