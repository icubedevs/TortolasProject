$(document).ready(function () {
    // Cultura
    kendo.culture("es-ES");

    var idFactura = {
        idFactura: $("#idFactura").val()
    };
    
    $("#editarFacturaButton").click(function () {
        document.location.replace('../editarFactura/' + $("#idFactura").val());
    });
    // DataSource KENDO
    var dataSource = new kendo.data.DataSource({
        transport: {
            read:
            {
                url: "../leerLineasFactura",
                data: idFactura,
                dataType: "json",
                type: "POST"
            }
        },
        schema:
            {
                model:
                {
                    id: "idLineaFactura",
                    fields: {
                        concepto: {},
                        unidades: { type: "number" },
                        precio: { type: "number" },
                        total: { type: "number" }
                    }
                }
            }
    });


    // Tabla de facturas
    $("#leerFacturaLineasFacturaGrid").kendoGrid({
        dataSource: dataSource,
        columns: [
                {
                    field: "concepto",
                    title: "Concepto"

                },
                {
                    title: "Unidades",
                    field: "unidades"
                },
                {
                    title: "Precio",
                    field: "precio"
                },
                {
                    title: "Total",
                    field: "total"
                }
            ]
    });
});



