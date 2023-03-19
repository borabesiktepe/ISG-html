console.log("Selam");

const trainingList = document.querySelector("ul");
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


const buttonAdd = document.querySelector(".add");

buttonAdd.addEventListener("click", () => {
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'file';
    radioButton.value = 'Eğitim4.pdf';

    console.log(radioButton);

    var trainingItem = document.createElement('li');
    trainingItem.insertAdjacentHTML("beforeend", "Eğitim4.pdf");
    trainingItem.appendChild(radioButton);
    trainingList.appendChild(trainingItem);
})