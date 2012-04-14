$(document).ready(function () {

    $("#nuevaFacturaButtonNav").click(function () {
        $.post('Facturas/Create', function (data) {
            $("#divPruebaAjax").html(data);
            $("#FacturasIndexGrid").hide();
        });
    });

    $("#ingresosButtonNav").click(function () {
        $("#divPruebaAjax").html("Sólo ingresos view");
        $("#FacturasIndexGrid").show();
    });

    $("#gastosButtonNav").click(function () {
        $.post('Facturas/Details', function (data) {
            $("#divPruebaAjax").html(data);
            $("#FacturasIndexGrid").hide();
        });
    });

    $("#movimientosButtonNav").click(function () {
        $("#divPruebaAjax").html("Moviemientos view");
    });

    $("#graficosContablesButtonNav").click(function () {
        $("#divPruebaAjax").html("Graficos contables view");
    });
});

