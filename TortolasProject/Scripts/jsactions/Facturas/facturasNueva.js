$(document).ready(function () {
    var estado = $("#estadoPage").val();
    var relacion = {};
    if (estado.equals("nueva")) {
        estadoNuevaFactura();
    }


});

function obtenerLineas() {
    $.each($(".k-grid-content tbody tr"), function () {

    });

}

function estadoNuevaFactura() {
    // DatePicker fecha
    $("#fechaFactura").kendoDatePicker({
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
    // Window Relaciones

    $("#relacionesExistentesDiv").hide();

    $("#relacionesButton").click(function(){
        var w = $("#relacionesWindow").data("kendoWindow");
        w.center();
        w.open();
    });

    $("#relacionesWindow").kendoWindow({
        width: "600px",
        title: "Relaciones",
        visible: false,
        modal: true
    });

    // Pestañas
    $("#relacionesTab").kendoTabStrip();

    // Añadir relación button
    $("#windowSelectButton").click(function () {
        var tab = $("#relacionesTab").data("kendoTabStrip").select().index();
        var grid = $("#relacionesTab .k-state-active .k-grid").data("kendoGrid");
        var uid = $("#relacionesTab .k-state-active .k-state-selected").attr("data-uid");
        var fila = grid.dataSource.getByUid(uid);

        switch (tab) {
            case 0: // Usuarios
                relacion = {
                    tipo: "usuario",
                    idUsuario: fila.idUsuario
                };
                $("#relacionDiv").html(fila.nickname);
                break;
            case 1: // Eventos
                relacion = {
                    tipo: "evento",
                    idEvento: fila.idEvento
                };
                $("#relacionDiv").html(fila.Titulo);
                break;
            case 2: // Cursillos
                relacion = {
                    tipo: "cursillo",
                    idCursillo: fila.idCursillo
                };
                $("#relacionDiv").html(fila.Titulo);
                break;
            case 3: // Pedidos globales
                relacion = {
                    tipo: "pedidoGlobal",
                    idPedidoGlobal: fila.idPedidoGlobal
                };
                $("#relacionDiv").html(fila.idPedido);

                break;
            case 4: // Pedidos socio
                relacion = {
                    tipo: "pedidoUsuario",
                    idPedidoUsuario: fila.idPedidoUsuario
                };
                $("#relacionDiv").html("<p>" + fila.idPedidoUsuario + "</p><p>" + fila.nickname);
                break;
        }
        alert(kendo.stringify(relacion));
        $("#relacionesWindow").data("kendoWindow").close();
        $("#relacionesButton").hide();
        $("#relacionesExistentesDiv").show();

    });

    $("#quitarRelacionButton").click(function () {
        $("#relacionesExistentesDiv").hide();
        $("#relacionesButton").show();
    });

    // GRID usuarios
    var dsUsuarios = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/usuariosListado",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#usuariosFacturaGrid").kendoGrid({
        dataSource: dsUsuarios,
        columns: [
                {
                    field: "nickname",
                    title: "Usuario"
                }
            ],
        selectable: true,
        filterable: true
    });

    // GRID eventos
    var dsEventos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/eventosListado",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#eventosFacturaGrid").kendoGrid({
        dataSource: dsEventos,
        columns: [
                {
                    field: "Titulo",
                    title: "Título"
                },
                {
                    field: "Lugar",
                    title: "Lugar"
                },
                {
                    field: "FechaRealizacion",
                    title: "Fecha de realización"
                }                
            ],
        selectable: true,
        filterable: true
    });

    // GRID cursillos
    var dsCursillos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/cursillosListado",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#cursillosFacturaGrid").kendoGrid({
        dataSource: dsCursillos,
        columns: [
                {
                    field: "Titulo",
                    title: "Título"
                },
                {
                    field: "Lugar",
                    title: "Lugar"
                },
                {
                    field: "FechaRealizacion",
                    title: "Fecha de realización"
                }
            ],
        selectable: true,
        filterable: true
    });

    // GRID pedidos globales
    var dsPedidosGlobales = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/pedidosGlobalesListado",
                dataType: "json",
                type: "POST"
            }
        }

    });
    $("#pedidosGlobalesGrid").kendoGrid({
        dataSource: dsPedidosGlobales,
        columns: [
                {
                    field: "idPedidoGlobal",
                    title: "idPedidoGlobal"
                },
                {
                    field: "Total",
                    title: "Total"
                }
            ],
        selectable: true,
        filterable: true
    });

    // GRID pedidos usuario
    var dsPedidosUsuario = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/pedidosUsuarioListado",
                dataType: "json",
                type: "POST"
            }
        }

    });
    $("#pedidosUsuarioGrid").kendoGrid({
        dataSource: dsPedidosUsuario,
        columns: [
                {
                    field: "idPedidoUsuario",
                    title: "idPedidoUsuario"
                },
                {
                    field: "nickname",
                    title: "Usuario"
                }
            ],
        selectable: true,
        filterable: true
    });

    // GRID artículos
    var dsArticulos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../Facturas/articulosListado",
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

    
    /* ####################### TABLA LÍNEAS FACTURA ############################# */
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
                    command: { name: "edit", text: "", className: "editarLineaButton" },
                    title: " "
                }
            ],
        editable: "inline"
    });

    var tabla = $("#facturaLineasFacturaGrid").data("kendoGrid");
    tabla.addRow();

    $(".editarLineaButton").live('click', function () {
        $(this).val();
    });


    $("#nuevaLineaButton").click(function () {
        tabla.addRow();
    });


    $("#descartarFacturaButton").click(function () {
        //volverListaFacturas();
    });

    $("#guardarFacturaButton").click(function () {

        var estado = '9242c548-9283-4085-8e27-ebe1ff5e1307';
        var concepto = $('#conceptoFactura').val();
        var total = $('#totalFactura').val();

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


        // Obtener líneas de factura
        var lineasFacturaRaw = $("#facturaLineasFacturaGrid").data("kendoGrid").dataSource.view();
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
            lineasFactura: kendo.stringify(lineasFactura),
            relacion: kendo.stringify(relacion)
        };
        $.post(url, datos, function (data) {
            window.location.replace("../Facturas");
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
}



