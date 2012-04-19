$(document).ready(function () {
    $("#fechaNuevaFactura").live('focus', function () {
        // $(this).datepicker().datepicker('show');
    });

    $("#descartarNuevaFacturaButton").live('click', function () {
        volverListaFacturas();
    });

    $("#guardarNuevaFacturaButton").live('click', function () {

        var estado = '9242c548-9283-4085-8e27-ebe1ff5e1307';
        var jd = '1a902aec-1a7f-4035-94fb-2540cbbc4831';

        var concepto = $('#conceptoNuevaFactura').val();
        var total = $('#totalNuevaFactura').val();

        data = {
            concepto: concepto,
            total: total,
            estado: estado,
            jd: jd
        };
        url = 'Facturas/nuevaFactura';

        $.post(url, data, function (data) {
            volverListaFacturas();
        });
    });
});

function volverListaFacturas() {
    $("#nuevaFacturaButtonNav").show();
    $("#FacturasContainer").hide();
    $("#FacturasGrid").data("kendoGrid").dataSource.read();
    $("#FacturasGrid").show();

    // Quitar listeners
    //$("#descartarNuevaFacturaButton").die("click");
    //$("#guardarNuevaFacturaButton").die("click");
}

