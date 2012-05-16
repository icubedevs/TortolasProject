var dataSource;
var tabla;
var w;
var estado; // { Nuevo, editar, detalles}
$(document).ready(function () {

    // DataSource KENDO
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/leerMovimientos",
                dataType: "json",
                type: "POST"
            }
        },
        schema:
            {
                model:
                {
                    id: "idMovimiento",
                    fields:
                    {
                        Concepto: { editable: true },
                        Fecha: { editable: true },
                        Total: { editable: true, type: "number" },
                        ResponsableName: { editable: false },
                        Descripcion: { editable: true }
                    }
                }
            }
    });

    // Tabla de facturas
    tabla = $("#MovimientosGrid").kendoGrid({
        dataSource: dataSource,
        filterable: true,
        toolbar: [
                    { text: "Nuevo movimiento", className: "nuevoMovimiento" },
                    { text: "Ingresos", className: "ingresosButton" },
                    { text: "Gastos", className: "gastosButton" },
                    { text: "Quitar filtros", className: "limpiarButton" }
                ],
        columns: [
            {
                field: "Fecha",
                title: "Fecha"
            },
            {
                field: "ResponsableName",
                title: "Responsable"
            },
            {
                field: "Concepto",
                title: "Concepto"
            },
            {
                field: "Total",
                title: "Importe"
            }
        ]
    }).data("kendoGrid");


    $("#MovimientosVentana").kendoWindow({
        title: "Movimiento",
        width: "600px",
        visible: false,
        modal: true
    });

    w = $("#MovimientosVentana").data("kendoWindow");

    $("#fechaMovimiento").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });
    $("#totalMovimiento").kendoNumericTextBox({
        format: "c",
        decimals: 3
    });

    $(".nuevoMovimiento").click(function () {
        w.center();
        w.open();
    });

    $(".ingresosButton").click(function () {
        dataSource.filter({field: "Total", operator: "gte", value: 0});
    });

    $(".gastosButton").click(function () {
        dataSource.filter({
            field: "Total", operator: "lt", value: 0 
        });
    });

    $(".limpiarButton").click(function () {
        dataSource.filter({});
    });

    $("#MovimientosGrid").delegate(".editarMovimientoButton", "click", function (e) {
        e.preventDefault();
        var movimiento = tabla.dataItem($(this).closest("tr"));

    });

    $("#guardarMovimiento").click(function () {
        var fecha = $("#fechaMovimiento").val();
        var concepto = $("#conceptoMovimiento").val();
        var descripcion = $("#descripcionMovimiento").val();
        var total = $("#totalMovimiento").data("kendoNumericTextBox").value();
        var url = "../Facturas/nuevoMovimiento";
        var datos = {
            fecha: fecha,
            concepto: concepto,
            descripcion: descripcion,
            total: total
        };

        $.post(url, datos, function (data) {
            dataSource.read();
            tabla.refresh();
            w.close();
        });

    });

    $("#descartarMovimiento").click(function () {
        limpiarCampos();
        w.close();
    });

    /*
    $("#MovimientosGrid").delegate(".eliminarMovimientoButton", "click", function (e) {
        e.preventDefault();

        var movimiento = tabla.dataItem($(this).closest("tr"));
        var r = confirm("¿Está seguro de eliminar el movimiento? \n \n Concepto: " + movimiento.Concepto + "\n \n Importe: " + movimiento.Total);
        if (r == true) {
            var urlDelete = "../Facturas/eliminarMovimiento";
            var datos = {
                idMovimiento: movimiento.idMovimiento,
                tipo: movimiento.Tipo
            };

            $.post(urlDelete, datos, function (data) {
                dataSource.remove(movimiento);

                tabla.refresh();
            });
        }
    });
    

    $("#MovimientosGrid").delegate(".leerMovimientoButton", "click", function (e) {
        e.preventDefault();

        var movimiento = tabla.dataItem($(this).closest("tr"));

        // Llamamos a la función para ver los detalles de la factura
        leerMovimiento(movimiento.idMovimiento);
    });
    */
    $(".k-grid-content tr").live("click", function () {
        // Obtenemos la UID de la fila creada por KENDO
        var uid = $(this).attr("data-uid");

        // Obtenemos la fila
        var fila = dataSource.getByUid(uid);

        // Llamamos a la función para ver los detalles de la factura
        leerMovimiento(fila.idMovimiento);
    });
});

function leerMovimiento(idMovimiento) {

    var url = "../Facturas/leerMovimiento/" + idMovimiento;
    location.replace(url);
}
    

function limpiarCampos() {
    $("#fechaMovimiento").data("kendoDatePicker").value("");
    $("#totalMovimiento").data("kendoNumericTextBox").value("");
    $("#conceptoMovimiento").val("");
    $("#descripcionMovimiento").val("");
}