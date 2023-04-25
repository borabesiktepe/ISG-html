const form = document.getElementById("form-create-workplace");

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputName = document.getElementById('name').value;
    let inputDesc = document.getElementById('description').value;
    let inputUserId = document.getElementById('userId').value;
    let message = document.getElementById("message");

    fetch('http://localhost:8080/api/workplaces/add', {
        method: 'POST',
        body: JSON.stringify({
            name: inputName,
            description: inputDesc,
            userId: inputUserId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

    message.innerHTML = "Çalışma alanı oluşturuldu! Panelinizden ulaşabilirsiniz.";
});