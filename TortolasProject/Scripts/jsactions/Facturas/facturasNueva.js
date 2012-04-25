$(document).ready(function () {

    // DatePicker fecha
    $("#fechaNuevaFactura").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });


    // Autocomplete usuarios
    var dsUsuarios = new kendo.data.DataSource({
        transport:{
            read: {
                url: "../Facturas/usuariosAutocomplete",
                dataType: "json",
                type: "POST"
             }
        }
    });

    $("#usuarioNuevaFacturaAutocomplete").kendoComboBox({
        suggest:true,
        dataTextField: "nickname",
        dataValueField: "idUsuario",
        dataSource: dsUsuarios
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
                        precio: { editable: true, type: "number", validation: { min: 0} },
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
                    command: { name: "edit", text: "" }, 
                    title: " "
                }
            ],
        editable: "inline"
    });

    var tabla = $("#nuevaFacturaLineasFacturaGrid").data("kendoGrid");
    tabla.addRow();

    $("#nuevaLineaButton").click(function () {
        tabla.addRow();
    });


    $("#descartarNuevaFacturaButton").click(function () {
        //volverListaFacturas();
    });

    $("#guardarNuevaFacturaButton").click(function () {

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
        url = '../Facturas/nuevaFactura';

        $.post(url, data, function (data) {
            alert("Volver atrás");
        });
    });

    $("nuevaFacturaAñadirNuevaLineaFacturaButton").click(function () {
        alert("Volver atrás");
    });
});



