const tehlikeAdi = document.getElementById("tehlikeAdi");
const yerEkipman = document.getElementById("yerEkipman");
const mevcutTehlikeler = document.getElementById("mevcutTehlikeler");
const olusacakRiskler = document.getElementById("olusacakRiskler");
const mevcutOnlemler = document.getElementById("mevcutOnlemler");
const maruzKalanlar = document.getElementById("maruzKalanlar");
const siddet = document.getElementById("siddet");
const olasilik = document.getElementById("olasilik");
const risk = document.getElementById("risk");
const alinacakTedbirler = document.getElementById("alinacakTedbirler");
const sSiddet = document.getElementById("sSiddet");
const sOlasilik = document.getElementById("sOlasilik");
const sRisk = document.getElementById("sRisk");

//API İŞLEMLERİ
//RİSK DEĞERLENDİRME GET İŞLEMİ
fetch("http://localhost:8080/api/riskassesments/getall?workplaceId=1")
    .then((data) => {
        return data.json();
    })
    .then((objectData) => {
        console.log(objectData[0]);
        let tableData = "";
        objectData.map((values) => {
            tableData += `
                <tr onclick="callme(this)">
                    <td>${values.id}</td>
                    <td>${values.tehlikeAdi}</td>
                    <td>${values.yerEkipman}</td>
                    <td>${values.mevcutTehlikeler}</td>
                    <td>${values.olusacakRiskler}</td>
                    <td>${values.mevcutOnlemler}</td>
                    <td>${values.maruzKalanlar}</td>
                    <td>${values.siddet}</td>
                    <td>${values.olasilik}</td>
                    <td>${values.risk}</td>
                    <td>${values.alinacakTedbirler}</td>
                    <td>${values.sonSiddet}</td>
                    <td>${values.sonOlasilik}</td>
                    <td>${values.sonRisk}</td>
                </tr>
            `;
        })
        document.getElementById("table_body").innerHTML = tableData
    })

//TIKLANAN SATIRI INPUTLARA DİZME
function callme(e) {
    var tds = e.getElementsByTagName('td');
    tehlikeAdi.value = tds[1].innerHTML.trim();
    yerEkipman.value = tds[2].innerHTML.trim();
    mevcutTehlikeler.value = tds[3].innerHTML.trim();
    olusacakRiskler.value = tds[4].innerHTML.trim();
    mevcutOnlemler.value = tds[5].innerHTML.trim();
    maruzKalanlar.value = tds[6].innerHTML.trim();
    siddet.value = tds[7].innerHTML.trim();
    olasilik.value = tds[8].innerHTML.trim();
    risk.value = tds[9].innerHTML.trim();
    alinacakTedbirler.value = tds[10].innerHTML.trim();
    sSiddet.value = tds[11].innerHTML.trim();
    sOlasilik.value = tds[12].innerHTML.trim();
    sRisk.value = tds[13].innerHTML.trim();
}