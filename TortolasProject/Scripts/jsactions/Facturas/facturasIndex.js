$(document).ready(function () {

    // DataSource KENDO
    var dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "Facturas/leerTodos",
                dataType: "json",
                type: "POST"
            }
        },
        schema:
            {
                model:
                {
                    id: "idFactura"
                }
            }
    });
    // Tabla de facturas
    $("#FacturasGrid").kendoGrid({
        dataSource: dataSource,
        columns: [
            {
                field: "idFactura",
                title: "idFactura"
            },
            {
                field: "fecha",
                title: "Fecha"
            },
            {
                field: "concepto",
                title: "Concepto"
            },
            {
                field: "total",
                title: "Total"
            }
        ]
    });

    $(".k-grid-content tr").live("click", function () {
        // Obtenemos la UID de la fila creada por KENDO
        var uid = $(this).attr("data-uid");

        // Obtenemos la fila
        var fila = dataSource.getByUid(uid);

        // Llamamos a la función para ver los detalles de la factura
        leerFactura(fila.idFactura);
    });
});
function leerFactura(idFactura) {
    
    var url = "Facturas/leerFactura";
    var datos = {
     idFactura:  idFactura 
     };
    $.post(url, datos, function (data) {
        $("#FacturasGrid").hide();
        $("#FacturasContainer").html(data);
        $("#FacturasContainer").show();
    });          
}