console.log("Selam");

const trainingButton = document.querySelector(".training-bottom button");
const selectedItem = document.querySelector(".selected-file");
const pdfFrame = document.querySelector("iframe");

trainingButton.addEventListener("click", () => {
    var ele = document.getElementsByName('file');

    for (i = 0; i < ele.length; i++) {

        if (ele[i].checked) {
            selectedItem.innerHTML = "Seçilen dosya: " + ele[i].value;
            pdfFrame.src = `/files/${ele[i].value}`;
        }
    }
})