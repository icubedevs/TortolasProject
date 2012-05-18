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
        sortable: true,
        pageable: true,
        toolbar: [
            { text: "Nueva factura", className: "nuevaFacturaButton" },
            { text: "Ingresos", className: "ingresosButton" },
            { text: "Gastos", className: "gastosButton" },
            { text: "Sólo pendientes", className: "pendientesButton" },
            { text: "Quitar filtros", className: "limpiarButton" }
        ],
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
                field: "estadoNombre",
                title: "Estado factura"
            }
        ]
    });

    $(".nuevaFacturaButton").click(function () {
        location.replace("../Facturas/nuevaFactura");
    });

    $(".ingresosButton").click(function () {
        dataSource.filter({ field: "total", operator: "gte", value: 0 });
    });

    $(".gastosButton").click(function () {
        dataSource.filter({field: "total", operator: "lt", value: 0});
    });

    $(".pendientesButton").click(function () {
        dataSource.filter({ field: "estadoNombre", operator: "eq", value: "Pendientes" });
    });

    $(".limpiarButton").click(function () {
        dataSource.filter({});
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

    var url = "../Facturas/leerFactura/" + idFactura;
    location.replace(url);
}
    
