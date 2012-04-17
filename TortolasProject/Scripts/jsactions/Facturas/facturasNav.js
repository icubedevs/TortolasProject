$(document).ready(function () {

    $("#nuevaFacturaButtonNav").click(function () {
        $.post('Facturas/cargarVistaNuevaFactura', function (data) {
            $("#FacturasGrid").hide();
            $("#FacturasContainer").html(data);
            $("#FacturasContainer").show();
            $("#nuevaFacturaButtonNav").hide();

        });
    });

    $("#ingresosButtonNav").click(function () {
        //$("#FacturasContainer").html("Sólo ingresos view");
        //$("#FacturasIndexGrid").show();
        url = 'Facturas/nuevaFactura';
        datos = { name: "dani", coche: "twingo" }
        $.post(url, datos, function (data) {
            $("#FacturasGrid").fadeOut('slow', function () {
                $(this).hide();
                $("#FacturasContainer").html(data);
            });

        });
    });

    $("#gastosButtonNav").click(function () {
        $.post('Facturas/Details', function (data) {
            $("#FacturasContainer").html(data);
            $("#FacturasIndexGrid").hide();
        });
    });

    $("#movimientosButtonNav").click(function () {
        $("#FacturasContainer").html("Moviemientos view");
    });

    $("#graficosContablesButtonNav").click(function () {
        $("#FacturasContainer").html("Graficos contables view");
    });
});