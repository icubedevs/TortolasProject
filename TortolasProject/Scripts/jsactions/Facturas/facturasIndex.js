$(document).ready(function () {

    // Boton de prueba de AJAX
    $("#ButtonPulsa").live('click', pruebaAjax);
    function pruebaAjax() {
        $.post('Facturas/leerTodos', function (data) {
            $.each(data, function (key, val) {

                $("#divPruebaAjax").append("<p>" + key + " -> " + val);
            });
        });
    }
    $("#FacturasGrid").kendoGrid({
        columns: [
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
            },
            {
               command: "Detalles"
            }
        ],
        dataSource:
        {
            transport: {
                read: {
                    url: "Facturas/leerTodos",
                    dataType: "json",
                    type: "POST"
                }      
            }
        }
    });


});

$(".k-grid-content tr").live('click', function () {
    var tabla = $("FacturasGrid").data("kendoGrid");
    tabla.select().each(function () {
        var datos = tabla.dataItem($(this));
        alert(datos);
    });


});

