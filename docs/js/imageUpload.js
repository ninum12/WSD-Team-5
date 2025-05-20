const MAX_IMAGES = 5;
const uploadArea = document.getElementById("uploadArea");
const addButton = document.getElementById("addButton");
const fileInput = document.getElementById("fileInput");

let imageCount = 0;

addButton.addEventListener("click", () => {
  if (imageCount < MAX_IMAGES) {
    fileInput.click();
  }
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file || imageCount >= MAX_IMAGES) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const imageBox = document.createElement("div");
    imageBox.className = "image-box";

    const img = document.createElement("img");
    img.src = e.target.result;
    img.className = "preview";

    const delIcon = document.createElement("img");
    delIcon.src = "./img/icon/del-img.svg";
    delIcon.className = "remove-icon";

    delIcon.addEventListener("click", () => {
      uploadArea.removeChild(imageBox);
      imageCount--;
      if (imageCount < MAX_IMAGES) {
        addButton.style.display = "flex";
      }
    });

    imageBox.appendChild(delIcon);
    imageBox.appendChild(img);
    uploadArea.insertBefore(imageBox, addButton);

    imageCount++;
    if (imageCount >= MAX_IMAGES) {
      addButton.style.display = "none";
    }
  };
  reader.readAsDataURL(file);
  fileInput.value = "";
});
