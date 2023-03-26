console.log("Selam. Burası Workplace Oluşturma Form Sayfası");

const form = document.getElementById("form");

form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;

    fetch('http://localhost:8080/api/workplaces/add', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            description: description,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        }).catch(error => console.error('Error:', error));
});