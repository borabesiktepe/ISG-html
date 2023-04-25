const formContact = document.getElementById("form-contact");
const address = document.getElementById("address");
const city = document.getElementById("cities");
const mail = document.getElementById("mail");
const phone = document.getElementById("phone");
const contactPerson = document.getElementById("contactperson");
const contactPersonPhone = document.getElementById("contactpersonPhone");

const workplaceId = document.getElementById("workplaceId").value;

//Şehirleri Drop Down'a Listele
fetch(`https://turkiyeapi.cyclic.app/api/v1/provinces`)
    .then(res => {
        return res.json();
    })
    .then(json => {
        json.data.forEach(cities => {
            const markupOption = `<option value=${cities.name}>${cities.name}</option>`;
            city.insertAdjacentHTML('beforeend', markupOption);
        });

        console.log("Şehirler select'e listelendi.");
    })
    .catch(error => console.log(error));

//İletişim Bilgileri (Companies Tablosundan)
//Get
const selectDefaultValue = document.getElementById("defaultValue");

fetch(`http://localhost:8080/api/companies/getall?workplaceId=${workplaceId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        address.value = data[0].address;
        selectDefaultValue.value = data[0].city;
        selectDefaultValue.innerHTML = data[0].city;
        mail.value = data[0].mail;
        phone.value = data[0].phone;
        contactPerson.value = data[0].contactPerson;
        contactPersonPhone.value = data[0].contactPersonPhone;
    })
    .catch((error) => {
        console.log(error)
    });

//Companies Tablosuna Veri Ekle/Düzelt
//Post-Put
formContact.addEventListener('submit', function (e) {
    e.preventDefault();

    console.log(address.value, mail.value, phone.value, contactPerson.value, workplaceId);

    fetch('http://localhost:8080/api/companies/add', {
        method: 'POST',
        body: JSON.stringify({
            address: address.value,
            city: city.value,
            mail: mail.value,
            phone: phone.value,
            contactPerson: contactPerson.value,
            contactPersonPhone: contactPersonPhone.value,
            workplaceId: workplaceId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
});

const updateCompanyBtn = document.getElementById("update");

updateCompanyBtn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(address.value, mail.value, phone.value, contactPerson.value, workplaceId);

    fetch('http://localhost:8080/api/companies/update/' + workplaceId, {
        method: 'PUT',
        body: JSON.stringify({
            address: address.value,
            city: city.value,
            mail: mail.value,
            phone: phone.value,
            contactPerson: contactPerson.value,
            contactPersonPhone: contactPersonPhone.value,
            workplaceId: workplaceId
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
})

//Workplace Bilgilerini Güncelle (WorkplaceName ve WorkplaceDescription)
//Put
const formUpdate = document.getElementById("form-update");
const workplaceName = document.getElementById("name");
const workplaceDesc = document.getElementById("description");

formUpdate.addEventListener('submit', function (e) {
    e.preventDefault();

    fetch('http://localhost:8080/api/workplaces/update/' + workplaceId, {
        method: 'PUT',
        body: JSON.stringify({
            name: workplaceName.value,
            description: workplaceDesc.value
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .then(window.location.reload())
        .catch(error => console.error('Error:', error));
});

//Workplace'e Ait Son Risk Değerlendirme Tarihini Getir
const lastRiskDate = document.getElementById("last-risk-date");
fetch(`http://localhost:8080/api/riskassesments/getall?workplaceId=${workplaceId}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        lastRiskDate.innerHTML = "Son Risk Değerlendirilme Tarihi: " + data[data.length - 1].degerlendirmeTarihi;
    })
    .catch((error) => {
        console.log(error)
    });