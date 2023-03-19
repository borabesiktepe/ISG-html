console.log("Selam");

const trainingList = document.querySelector("ul");
const trainingButton = document.querySelector(".training-bottom button");
const selectedItem = document.querySelector(".selected-file");
const pdfFrame = document.querySelector("iframe");

var json = [
    {
        "id": 1,
        "name": "Eğitim1.pdf",
        "userId": 1
    },
    {
        "id": 2,
        "name": "Eğitim2.pdf",
        "userId": 1
    },
    {
        "id": 1,
        "name": "Eğitim3.pdf",
        "userId": 1
    },
    {
        "id": 1,
        "name": "Eğitim4.pdf",
        "userId": 1
    }
];

json.forEach(workplace => {
    var radioButton = document.createElement('input');
    radioButton.type = 'radio';
    radioButton.name = 'file';
    radioButton.value = workplace.name;

    var trainingItem = document.createElement('li');
    trainingItem.insertAdjacentHTML("beforeend", workplace.name);
    trainingItem.appendChild(radioButton);
    trainingList.appendChild(trainingItem);
});

//IFRAME'DE PDF GÖRÜNTÜLEME
trainingButton.addEventListener("click", () => {
    var element = document.getElementsByName('file');

    for (i = 0; i < element.length; i++) {

        if (element[i].checked) {
            selectedItem.innerHTML = "Seçilen dosya: " + element[i].value;
            pdfFrame.src = `/files/${element[i].value}`;
        }
    }
})