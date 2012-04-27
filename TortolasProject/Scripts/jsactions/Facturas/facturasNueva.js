$(document).ready(function () {
    // Cultura
    kendo.culture("es-ES");

    // DatePicker fecha
    $("#fechaNuevaFactura").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    /*
    
    function montarFecha(valor) {
    var salida = valor.getDate() + "/" + (valor.getMonth() + 1) + "/" + valor.getFullYear();
    salida = girarFecha(salida);
    return salida;
    }
    function girarFecha(fecha)
    {
    var antiguacompleta = fecha.split("-");
    salida = antiguacompleta[2] + "/" + antiguacompleta[1] + "/" + antiguacompleta[0];
    return salida;
    }
    
    */


    // Autocomplete usuarios
    var dsUsuarios = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/usuariosAutocomplete",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#usuariosNuevaFacturaAutocomplete").kendoComboBox({
        suggest: true,
        dataTextField: "nickname",
        dataValueField: "idUsuario",
        dataSource: dsUsuarios
    });

    // Autocomplete eventos
    var dsEventos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/eventosAutocomplete",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#eventosNuevaFacturaAutocomplete").kendoComboBox({
        suggest: true,
        dataTextField: "Titulo",
        dataValueField: "idEvento",
        dataSource: dsEventos
    });

    // Autocomplete artículos
    var dsArticulos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/articulosAutocomplete",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#articulosNuevaFacturaAutocomplete").kendoComboBox({
        suggest: true,
        dataTextField: "Nombre",
        dataValueField: "idArticulo",
        dataSource: dsEventos
    });


    // DataSource KENDO
    var dataSource = new kendo.data.DataSource({
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
    $("#nuevaFacturaLineasFacturaGrid").kendoGrid({
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
                    command: { name: "edit", text: "", className: "editarLineaButton" },
                    title: " "
                }
            ],
        editable: "inline"
    });

    var tabla = $("#nuevaFacturaLineasFacturaGrid").data("kendoGrid");
    tabla.addRow();

    $(".editarLineaButton").live('click', function () {
        $(this).val();
    });


    $("#nuevaLineaButton").click(function () {
        tabla.addRow();
    });


    $("#descartarNuevaFacturaButton").click(function () {
        //volverListaFacturas();
    });

    $("#guardarNuevaFacturaButton").click(function () {

        var estado = '9242c548-9283-4085-8e27-ebe1ff5e1307';
        var concepto = $('#conceptoNuevaFactura').val();
        var total = $('#totalNuevaFactura').val();

        //var lineasFactura = kendo.stringify($("#nuevaFacturaLineasFacturaGrid").data("kendoGrid").dataSource.view());
        //alert($("#nuevaFacturaLineasFacturaGrid").data("kendoGrid").dataSource.view());
        //var d = $("#nuevaFacturaLineasFacturaGrid").data("kendoGrid");
        //alert(d);

        /*
        alert(lineasFactura);
        var ds = $("#nuevaFacturaLineasFacturaGrid").data("kendoGrid").dataSource;
        //var grid = $("#nuevaFacturaLineasFacturaGrid").data("kendoGrid");
        //grid.select(grid.tbody.find("tr"));
        */
        //alert(total);
        //var lineasFactura = obtenerLineas();
        var lineasFacturaRaw = $("#nuevaFacturaLineasFacturaGrid").data("kendoGrid").dataSource.view();
        var lineasFactura = new Array();
        for (var i = 0; i < lineasFacturaRaw.length; i++) {
            lineasFactura.push({
                "concepto": lineasFacturaRaw[i].concepto,
                "unidades": lineasFacturaRaw[i].unidades,
                "precio": lineasFacturaRaw[i].precio
            });
        }
        var url = "nuevaFactura";
        var datos = {
            estado: estado,
            concepto: concepto,
            lineasFactura: kendo.stringify(lineasFactura)
        };
        $.post(url, datos, function (data) {
            history.back();
        });

    });


    // Nueva línea de factura
    $("nuevaFacturaAñadirNuevaLineaFacturaButton").click(function () {
        alert("Volver atrás");
    });

    // Al pulsar en concepto
    $(".k-grid-edit-row .k-textbox").click(function () {
        alert("click");
    });
});

function obtenerLineas() {
    $.each($(".k-grid-content tbody tr"), function () {

    });

}



