const workplaceId = document.getElementById("workplaceId").value;

Chart.register(ChartDataLabels);

fetch('http://localhost:8080/api/riskassesments/getGenelTehlikeCount?workplaceId=' + workplaceId)
    .then(response => response.json())
    .then(data => {
        console.log("Risk Tehlike Count:", data);

        if (data.length > 0) {
            xValues = [];
            yValues = [];

            for (i = 0; i < data.length; i++) {
                xValues.push(data[i].tehlikeAdi);
                yValues.push(data[i].olaySayisi);
            }

            const ctx = document.getElementById('chart-tehlike-sayilari');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Tehlike Sayısı',
                        data: yValues
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tüm Tehlike Sayıları'
                        },
                        datalabels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            });
        }
    })

//En çok tehlike olan Yer/Ekipmanlar
fetch('http://localhost:8080/api/riskassesments/getYerEkipmanTehlikeCount?workplaceId=' + workplaceId)
    .then(response => response.json())
    .then(data => {
        console.log("Risk Yer/Ekipman Count:", data);

        if (data.length > 0) {
            xValues = [];
            yValues = [];

            for (i = 0; i < data.length; i++) {
                xValues.push(data[i].yerEkipman);
                yValues.push(data[i].olaySayisi);
            }

            const ctx = document.getElementById('chart-tehlike-sayilari-yerekipman');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Tehlike Sayısı',
                        data: yValues
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Yer/Ekipmanlara Ait Tehlike Sayıları'
                        },
                        datalabels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            });
        }
    })

//Telike Adlarına Göre Toplam Riskleri
fetch('http://localhost:8080/api/riskassesments/getTehlikeAdiRiskSum?workplaceId=' + workplaceId)
    .then(response => response.json())
    .then(data => {
        console.log("Tehlike Adı Risk Sum:", data);

        if (data.length > 0) {
            xValues = [];
            yValues = [];

            for (i = 0; i < data.length; i++) {
                xValues.push(data[i].tehlikeAdi);
                yValues.push(data[i].toplamRisk);
            }

            const ctx = document.getElementById('chart-tehlike-adi-toplamRisk');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Toplam Risk',
                        data: yValues
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tehlikelerin Sahip Olduğu Toplam Riskler'
                        },
                        datalabels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            });
        }
    })

//Telike Adlarına Göre Toplam Son Riskleri
fetch('http://localhost:8080/api/riskassesments/getTehlikeAdiSonRiskSum?workplaceId=' + workplaceId)
    .then(response => response.json())
    .then(data => {
        console.log("Tehlike Adı Son Risk Sum:", data);

        if (data.length > 0) {
            xValues = [];
            yValues = [];

            for (i = 0; i < data.length; i++) {
                xValues.push(data[i].tehlikeAdi);
                yValues.push(data[i].toplamSonRisk);
            }

            const ctx = document.getElementById('chart-tehlike-adi-toplamSonRisk');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Toplam Son Risk',
                        data: yValues
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tehlikelerin Sahip Olduğu Toplam Son Riskler'
                        },
                        datalabels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            });
        }
    })


// Yer/Ekipmanların Toplam Riskleri
fetch('http://localhost:8080/api/riskassesments/getYerEkipmanRiskSum?workplaceId=' + workplaceId)
    .then(response => response.json())
    .then(data => {
        console.log("Yer Ekipman Risk Sum:", data);

        if (data.length > 0) {
            xValues = [];
            yValues = [];

            for (i = 0; i < data.length; i++) {
                xValues.push(data[i].yerEkipman);
                yValues.push(data[i].toplamRisk);
            }

            const ctx = document.getElementById('chart-yer-ekipman-toplamRisk');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Toplam Risk',
                        data: yValues
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Yer/Ekipmanların Sahip Olduğu Toplam Riskler'
                        },
                        datalabels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            });
        }
    })

//Yer/Ekipmanların Toplam Son Riskleri
fetch('http://localhost:8080/api/riskassesments/getYerEkipmanSonRiskSum?workplaceId=' + workplaceId)
    .then(response => response.json())
    .then(data => {
        console.log("Yer/Ekipman Son Risk Sum:", data);

        if (data.length > 0) {
            xValues = [];
            yValues = [];

            for (i = 0; i < data.length; i++) {
                xValues.push(data[i].yerEkipman);
                yValues.push(data[i].toplamRisk);
            }

            const ctx = document.getElementById('chart-yer-ekipman-toplamSonRisk');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: xValues,
                    datasets: [{
                        label: 'Toplam Son Risk',
                        data: yValues
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Yer/Ekipmanların Sahip Olduğu Toplam Son Riskler'
                        },
                        datalabels: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    }
                }
            });
        }
    })