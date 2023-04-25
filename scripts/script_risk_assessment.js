const tehlikeAdi = document.getElementById("tehlikeAdi");
const yerEkipman = document.getElementById("yerEkipman");
const mevcutTehlikeler = document.getElementById("mevcutTehlikeler");
const olusacakRiskler = document.getElementById("olusacakRiskler");
const mevcutOnlemler = document.getElementById("mevcutOnlemler");
const maruzKalanlar = document.getElementById("maruzKalanlar");
const siddet = document.getElementById("siddet");
const olasilik = document.getElementById("olasilik");
const alinacakTedbirler = document.getElementById("alinacakTedbirler");
const sSiddet = document.getElementById("sSiddet");
const sOlasilik = document.getElementById("sOlasilik");

const workplaceId = document.getElementById("workplaceId").value;

//API İŞLEMLERİ
//RİSK DEĞERLENDİRME GET İŞLEMİ
fetch("http://localhost:8080/api/riskassesments/getall?workplaceId=90")
    .then((data) => {
        return data.json();
    })
    .then((objectData) => {
        console.log(objectData[0]);
        let tableData = "";
        let siraNo = 1;
        objectData.map((values) => {
            tableData += `
                <tr onclick="printToInputs(this)">
                    <td>${siraNo}</td>
                    <td>${values.tehlikeAdi}</td>
                    <td>${values.yerEkipman}</td>
                    <td>${values.mevcutTehlikeler}</td>
                    <td>${values.olusacakRiskler}</td>
                    <td>${values.mevcutOnlemler}</td>
                    <td>${values.maruzKalanlar}</td>
                    <td>${values.siddet}</td>
                    <td>${values.olasilik}</td>
                    <td class="colored">${values.risk}</td>
                    <td>${values.alinacakTedbirler}</td>
                    <td>${values.sonSiddet}</td>
                    <td>${values.sonOlasilik}</td>
                    <td class="colored">${values.sonRisk}</td>
                </tr>
            `;
            siraNo++;
        })
        document.getElementById("table-body").innerHTML = tableData
    })

//RİSK DEĞERLENDİRME POST İŞLEMİ
const formRisk = document.getElementById("risk-assesment");
formRisk.addEventListener('submit', function (e) {
    e.preventDefault();

    let risk = siddet.value * olasilik.value;
    let sRisk = sSiddet.value * sOlasilik.value;

    console.log("Risk:", risk, "Son Risk:", sRisk);
    console.log(tehlikeAdi.value, yerEkipman.value, mevcutTehlikeler.value, olusacakRiskler.value, mevcutOnlemler.value, maruzKalanlar.value, siddet.value, olasilik.value, risk, alinacakTedbirler.value, sSiddet.value, sOlasilik.value, sRisk, workplaceId);

    fetch('http://localhost:8080/api/riskassesments/add', {
        method: 'POST',
        body: JSON.stringify({
            tehlikeAdi: tehlikeAdi.value,
            yerEkipman: yerEkipman.value,
            mevcutTehlikeler: mevcutTehlikeler.value,
            olusacakRiskler: olusacakRiskler.value,
            mevcutOnlemler: mevcutOnlemler.value,
            maruzKalanlar: maruzKalanlar.value,
            siddet: siddet.value,
            olasilik: olasilik.value,
            risk: risk,
            alinacakTedbirler: alinacakTedbirler.value,
            sonSiddet: sSiddet.value,
            sonOlasilik: sOlasilik.value,
            sonRisk: sRisk,
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

//TIKLANAN SATIRI INPUTLARA DİZME
function printToInputs(e) {
    var tds = e.getElementsByTagName('td');
    tehlikeAdi.value = tds[1].innerHTML.trim();
    yerEkipman.value = tds[2].innerHTML.trim();
    mevcutTehlikeler.value = tds[3].innerHTML.trim();
    olusacakRiskler.value = tds[4].innerHTML.trim();
    mevcutOnlemler.value = tds[5].innerHTML.trim();
    maruzKalanlar.value = tds[6].innerHTML.trim();
    siddet.value = tds[7].innerHTML.trim();
    olasilik.value = tds[8].innerHTML.trim();
    alinacakTedbirler.value = tds[10].innerHTML.trim();
    sSiddet.value = tds[11].innerHTML.trim();
    sOlasilik.value = tds[12].innerHTML.trim();
}

//TABLO ŞİDDET/OLASILIK/RİSK KOLON RENKLENDİRME
setInterval(function colorizeCells() {
    let tableColumn = document.querySelectorAll(".colored");

    tableColumn.forEach((colored) => {
        if (colored.innerHTML > 0) {
            colored.style.backgroundColor = "#92d050";
        } if (colored.innerHTML > 6) {
            colored.style.backgroundColor = "#ffff00";
        } if (colored.innerHTML > 12) {
            colored.style.backgroundColor = "#ff0000";
        }
    });
}, 100);

//TABLOYU EXCEL KAYDETME
function exportToExcel(type, fn, dl) {
    let table = document.getElementById('risk-table');
    let wb = XLSX.utils.table_to_book(table, { sheet: "sheet1" });
    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
        XLSX.writeFile(wb, fn || ('RiskDegerlendirmeTablosu.' + (type || 'xlsx')));
}



//Risk Değerlendirme tablosunda Risk kolonuna göre filtreleme yapma
const selectElement = document.getElementById('risk-select');
const tableBody = document.getElementById('table-body');

function filterRisk(min, max) {
    for (let i = 0; i < tableBody.children.length; i++) {
        const riskElement = tableBody.children[i].children[9];
        const riskValue = parseInt(riskElement.innerText);
        if (riskValue >= min && riskValue <= max) {
            tableBody.children[i].style.display = '';
        } else {
            tableBody.children[i].style.display = 'none';
        }
    }
}

selectElement.addEventListener('change', function () {
    const selectedValue = this.value;
    switch (selectedValue) {
        case '0-6':
            filterRisk(0, 6);
            break;
        case '8-12':
            filterRisk(8, 12);
            break;
        case '15-25':
            filterRisk(15, 25);
            break;
        default:
            for (let i = 0; i < tableBody.children.length; i++) {
                tableBody.children[i].style.display = '';
            }
    }
});