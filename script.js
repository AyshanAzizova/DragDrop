const fileInput = document.getElementById("fileInput");
const targetContainer = document.getElementById("targetContainer");

const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataURL = e.target.result;
        const img = document.createElement('img');
        img.src = dataURL;
        img.setAttribute("draggable", "true");
        img.classList.add("draggable-item");
        targetContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
};

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

const containers = document.querySelectorAll(".container");

containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    container.addEventListener("drop", (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        const dragElement = document.getElementById(data);
        if (dragElement && dragElement.classList.contains("draggable-item")) {
            container.appendChild(dragElement);
        }
    });
});

document.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("draggable-item")) {
        e.dataTransfer.setData("text", e.target.id);
    }
});

