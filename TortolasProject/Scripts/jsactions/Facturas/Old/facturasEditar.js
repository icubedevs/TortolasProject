$(document).ready(function () {
    // Cultura
    kendo.culture("es-ES");
    var idFactura = $("#idFactura").val();

    // DatePicker fecha
    $("#fechaFactura").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    // Autocomplete usuarios
    var dsUsuarios = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../usuariosAutocomplete",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#usuariosFacturaAutocomplete").kendoComboBox({
        suggest: true,
        dataTextField: "nickname",
        dataValueField: "idUsuario",
        dataSource: dsUsuarios
    });

    // Autocomplete eventos
    var dsEventos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../eventosAutocomplete",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#eventosFacturaAutocomplete").kendoComboBox({
        suggest: true,
        dataTextField: "Titulo",
        dataValueField: "idEvento",
        dataSource: dsEventos
    });

    // Autocomplete artículos
    var dsArticulos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../articulosAutocomplete",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#articulosFacturaAutocomplete").kendoComboBox({
        suggest: true,
        dataTextField: "Nombre",
        dataValueField: "idArticulo",
        dataSource: dsEventos
    });

    // DataSource KENDO
    var dataSource = new kendo.data.DataSource({
        transport: {
            read:
            {
                url: "../leerLineasFactura",
                data: { idFactura: idFactura },
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
                        concepto: { editable: true },
                        unidades: { editable: true, type: "number", validation: { min: 0} },
                        precio: { editable: true, type: "number" },
                        total: { editable: false, type: "number" }
                    }
                }
            }
    });


    // Tabla de facturas
    $("#facturaLineasFacturaGrid").kendoGrid({
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
                },
                {
                    command: "destroy"
                }
            ],
        editable: true
    });

    var tabla = $("#facturaLineasFacturaGrid").data("kendoGrid");
    tabla.addRow();

    $(".eliminarLineaButton").live('click', function () {
        /*var fila = $("#tablaMensajesLeidos").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#tablaMensajesLeidos").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON

        var idMensaje = dataSourceMensajesLeidos.getByUid(fila.attr("data-uid")).idMensaje;*/
        // Incluir en array eliminados el idLineaFactura de la seleccionada.
    });


    $("#nuevaLineaButton").click(function () {
        tabla.addRow();
    });

    $("#eliminarFacturaButton").click(function () {
        var url = "../eliminarFactura";
        var datos = {
            idFactura: idFactura
        };

        $.post(url, datos, function (data) {
            location.replace("../../Facturas");
        });

    });

    $("#descartarFacturaButton").click(function () {
        location.replace('Index');
    });

    $("#guardarFacturaButton").click(function () {

        var estado = '9242c548-9283-4085-8e27-ebe1ff5e1307';
        var concepto = $('#conceptoFactura').val();
        var total = $('#totalFactura').val();
        var fecha = $('#fechaFactura').val();

        var lineasFacturaRaw = $("#facturaLineasFacturaGrid").data("kendoGrid").dataSource.view();
        var lineasFactura = new Array();
        for (var i = 0; i < lineasFacturaRaw.length; i++) {
            lineasFactura.push({
                "idLineaFactura": lineasFacturaRaw[i].idLineaFactura,
                "concepto": lineasFacturaRaw[i].concepto,
                "unidades": lineasFacturaRaw[i].unidades,
                "precio": lineasFacturaRaw[i].precio
            });
        }

        var url = "editarFactura";
        var datos = {
            estado: estado,
            concepto: concepto,
            lineasFactura: kendo.stringify(lineasFactura),
            idFactura: idFactura,
            fecha: fecha
        };
        $.post(url, datos, function (data) {
            location.replace("../../Facturas");
        });

    });


    // Nueva línea de factura
    $("facturaAñadirNuevaLineaFacturaButton").click(function () {
        alert("Volver atrás");
    });

    // Al pulsar en concepto
    $(".k-grid-edit-row .k-textbox").click(function () {
        //alert("click");
    });


});

function obtenerLineas() {
    $.each($(".k-grid-content tbody tr"), function () {

    });

}


 