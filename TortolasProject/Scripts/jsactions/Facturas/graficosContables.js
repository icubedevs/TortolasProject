var grafica;
var options;
var dataSource;
var datos;
$(document).ready(function () {
    inicializar();



});
function inicializar() {
    $("#fechaInicio").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });
    $("#fechaFinal").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    $("#generarGrafica").click(function () {
        var inicial = $("#fechaInicio").val();
        var final = $("#fechaFinal").val();
        $.post("../Facturas/todosIngresosGastos", null, function (data) {
            datos = data;
            balance2();
        });
        
    });

}
function grafica1(){
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/periodoIngresosGastos",
                dataType: "json",
                type: "POST"
            }
        }
    });

    setTimeout(function () { crearGrafica(); }, 400);
}
function crearGrafica(){
    $("#grafica").kendoChart({
        theme: $(document).data("kendoSkin") || "default",
        dataSource: dataSource,
        title: {
            text: "Contabilidad"
        },
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "line"
        },
        series:
        [{
            field: "Gastos",
            name: "Gastos"
        }, {
            field: "Ingresos",
            name: "Ingresos"
        }],
        categoryAxis: {
            field: "Mes",
            labels: {
                rotation: -90
            }
        },
        valueAxis: {
            labels: {
                format: "{0:N0}"
            }
        },
        tooltip: {
            visible: true,
            format: "{0:N0}"
        }
    });
}

function balance(){
    options = {
        chart:
        {
            renderTo: 'grafica'
        },
        title:
        {
            text: 'Balance anual'
        },
        subtitle:
        {
            text: 'Ejercicio 2011'
        },
        xAxis:
        {
            type: 'datetime',
            tickInterval: 30 * 7 * 24 * 3600 * 1000, // one week
            tickWidth: 0,
            gridLineWidth: 1,
            labels:
            {
                align: 'left',
                x: 3,
                y: -3
            }
        },
        yAxis:
        [{ // left y axis
            title:
            {
                text: null
            },
            labels:
            {
                align: 'left',
                x: 3,
                y: 16,
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0);
                }
            },
            showFirstLabel: false
        },
        { // right y axis
            linkedTo: 0,
            gridLineWidth: 0,
            opposite: true,
            title:
            {
                text: null
            },
            labels:
            {
                align: 'right',
                x: -3,
                y: 16,
                formatter: function () {
                    return Highcharts.numberFormat(this.value, 0);
                }
            },
            showFirstLabel: false
        }],
        legend:
        {
            align: 'left',
            verticalAlign: 'top',
            y: 20,
            floating: true,
            borderWidth: 0
        },
        tooltip:
        {
            shared: true,
            crosshairs: true
        },
        plotOptions:
        {
            series:
            {
                cursor: 'pointer',
                point:
                {
                    events:
                    {
                        click: function () {
                            hs.htmlExpand(null, {
                                pageOrigin: {
                                    x: this.pageX,
                                    y: this.pageY
                                },
                                headingText: this.series.name,
                                maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                                        this.y + ' visits',
                                width: 200
                            });
                        }
                    }
                },
                marker:
                {
                    lineWidth: 1
                }
            }
        },
        series:
        [{
            name: 'Ingresos',
            lineWidth: 4,
            marker:
            {
                radius: 4
            }
        },
        {
            name: 'Gastos'
        }]
    };
    
    options.series[0].data = datos.Ingresos;
    options.series[1].data = datos.Gastos;
    grafica = new Highcharts.Chart(options);
}
function balance2() {
    grafica = new Highcharts.StockChart({
        chart: {
            renderTo: 'grafica'
        },
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'Balance'
        },
        series:
            [{
                name: 'Gastos',
                data: datos,
                tooltip: {
                    valueDecimals: 2
                }
            }]
    });

}
