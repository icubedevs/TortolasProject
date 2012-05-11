// Variables globales
var factura;            // Factura
var fecha;              // Fecha
var concepto;           // Concepto
var tipo;               // Tipo Relación
var idRelacion;         // idRelacion
var w;                  // Ventana
var estadoPagina;       // Estado {nueva,detalles,editar}
var dsUsuarios;         // dataSource Usuarios
var dsEventos;          // dataSource Eventos
var dsCursillos;        // dataSource Cursillos
var dsPedidosGlobales;  // dataSource pedidosGlobales
var dsPedidosUsuario;   // dataSource pedidosUsuario
var dsArticulos;        // dataSource Articulos
var dsEstadoFactura;    // dataSource EstadoFactura
var dataSource;         // dataSource LineasFactura
var tabla;              // tabla LineasFactura
var idFactura;          // idFactura


$(document).ready(function () {
    $("#facturaForm").hide();
    estadoPagina = $("#estadoPage").val();

    inicializar();

    if (estadoPagina == "nueva") {
        estadoNuevaFactura();
    } else if (estadoPagina == "detalles") {
        estadoDetallesFactura();
    } else if (estadoPagina == "editar") {
        estadoEditarFactura();
    }
});

function estadoNuevaFactura() {
    idRelacion = null;
    tipo = null;
    // Ocultar botón poli
    $("#poliButton").hide();
    $("#eliminarButton").hide();
    

    // DatePicker fecha
    $("#fechaFacturaInput").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    $("#relacionesExistentesDiv").hide();

    datosTablaNueva();
    tablaEditable();
    tabla.addRow();
    $("#facturaForm").show();    
}

function estadoDetallesFactura() {

    inicializarFactura();
    idRelacion = factura.idRelacion;
    tipo = factura.tipo;
    fecha = factura.Fecha;
    concepto = factura.Concepto;

    // Ocultar campos
    $("#eliminarButton").hide();
    $("#fechaFacturaContainer").hide();
    $("#relacionesButton").hide();
    $("#quitarRelacionButton").hide();
    $("#nuevaLineaButton").hide();
    $("#facturaBottom").hide();
    $("#conceptoFactura").hide();
    $("#estadoFacturaDropDownList").hide();
    $("#estadoFacturaDropDownListContainer").hide();


    // Mostrar campos
    $("#fechaFacturaLabel").show();
    $("#conceptoFacturaLabel").show();
    $("#poliButton").show();
    $("#relacionDiv").show();
    $("#estadoFacturaLabel").html(factura.NombreEstado);
    $("#estadoFacturaLabel").show();
    


    $("#facturaLineasFacturaGrid").empty();

    // DataSource KENDO
    var datosIdFactura = {
        idFactura: idFactura
    };
    dataSource = new kendo.data.DataSource({
        transport: {
            read:
            {
                url: "../leerLineasFactura",
                data: datosIdFactura,
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
                }
            ]
    });
    $("#facturaForm").show();
 }

 function estadoEditarFactura() 
 {
    // Actualizar estado
     estadoPagina = "editar";
    $("#estadoPage").val(estadoPagina);

    $("#poliButton").hide();
    $("#eliminarButton").show();

    if (factura.tipo == null) {
        $("#quitarRelacionButton").hide();
        $("#relacionesButton").show();
    }
    else {
        $("#relacionesExistentesDiv").show();
        $("#relacionDiv").html(factura.idRelacion).show();
        $("#quitarRelacionButton").show();
    }
    

    // Mostramos datePicker
    $("#fechaFacturaDiv").width(120);
    $("#fechaFacturaLabel").hide();
    $("#fechaFacturaContainer").show();
    $("#fechaFacturaInput").kendoDatePicker({        
        value: fecha,
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    // Concepto
    $("#conceptoFacturaLabel").hide();
    $("#conceptoFactura").show();
    $("#conceptoFactura").val(concepto);
    
    // Estado factura
    var listaEstados = $("#estadoFacturaDropDownList").data("kendoDropDownList");
    $("#estadoFacturaDropDownList").data("kendoDropDownList").select(function(dataItem) {
        return dataItem.idEstadoFactura == dsEstadoFactura.get(factura.FKEstado.toString()).idEstadoFactura;
    });
    $("#estadoFacturaLabel").hide();
    $("#estadoFacturaDropDownListContainer").show();



    // Líneas Factura
    $("#nuevaLineaButton").show();

    // Factura Bottom
    $("#facturaBottom").show();

    // Tabla de facturas
    datosTablaEditar();
    tablaEditable();
    $("#facturaForm").show(); 
}



function datosTablaNueva()
{
     // DataSource KENDO
    dataSource = new kendo.data.DataSource({
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
}
function datosTablaEditar() 
{
    $("#facturaLineasFacturaGrid").empty();
    // DataSource KENDO
    dataSource = new kendo.data.DataSource({
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


}
/* #######################  TABLA EDITABLE ##################################*/
function tablaEditable() {

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
                    command: { name:"edit", text: "", className: "editarLineaButton" },
                    title: " "
                }
            ],
        editable: true
    });

    tabla = $("#facturaLineasFacturaGrid").data("kendoGrid");

    tabla.refresh();
}
/* #########    INICIALIZAR FACTURA     ################################# */
function inicializarFactura()
{
     if (estadoPagina != "nueva") 
    {
        idFactura = $("#idFactura").val();

        // Obtengo la factura
        var urlFactura = "../../Facturas/leerFactura"; 
        var datosFactura = {
            idFactura: idFactura
        };

        $.ajax({
            async: false,
            type: "POST",
            url: urlFactura,
            data: datosFactura
        }).done(function (data) {
            factura = data;            
        });

    }
}

/* ############## INICIALIZAR ################################################################### */
function inicializar() {
    inicializarFactura();

    // PoliButton Editar
    $("#poliButton").text("Editar");
    $("#poliButton").click(function () {
        estadoEditarFactura();
    });

    // Botón eliminar
    $("#eliminarButton").text("Eliminar");
    $("#eliminarButton").click(function () {
        var url = "../eliminarFactura";
        var datos = {
            idFactura: idFactura
        };
        $.post(url, datos, function () 
        {
            window.location.replace("../../Facturas");
        });
    });



    // Estado factura
    dsEstadoFactura = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/estadosListado",
                dataType: "json",
                type: "POST"
            }
        },
        schema: {
                model:
                {
                    id: "idEstadoFactura"
                }
        }
    });

    $("#estadoFacturaDropDownList").kendoDropDownList({
        dataTextField: "Nombre",
        dataValueField: "idEstadoFactura",
        dataSource: dsEstadoFactura
    });

    $("#nuevaLineaButton").click(function () {
        tabla.addRow();
    });


    $("#descartarFacturaButton").click(function () {
        if (estado == "nueva") {
            window.location.replace("../../Facturas");
        } else {
            estadoDetallesFactura();
        }
    });

    $("#guardarFacturaButton").click(function () {

        var estadoF = $("#estadoFacturaCombobox").val();
        var concepto = $('#conceptoFactura').val();
        var total = $('#totalFactura').val();



        var url = "";
        if (estadoPagina == "nueva") {
            url = "nuevaFactura";

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
            var datos = {
                estado:  $("#estadoFacturaDropDownList").data("kendoDropDownList").value(),
                concepto: concepto,
                lineasFactura: kendo.stringify(lineasFactura),
                idRelacion: idRelacion,
                tipo: tipo
            };
        } else if (estadoPagina == "editar") {
            url = "../editarFactura";

            // Obtener líneas de factura
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

            var datos = {
                idFactura: idFactura,
                estado: $("#estadoFacturaDropDownList").data("kendoDropDownList").value(),
                concepto: concepto,
                lineasFactura: kendo.stringify(lineasFactura),
                idRelacion: idRelacion,
                tipo: tipo,
                fecha: $("#fechaFacturaInput").val()
            };
        }

        $.post(url, datos, function (data) {
            if (estadoPagina == "nueva") {
                window.location.replace("../Facturas");
            } else if (estadoPagina == "editar") {
                estadoDetallesFactura();
            }
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

    // Añadir relación button
    $("#windowSelectButton").click(function () {
        var tab = $("#relacionesTab").data("kendoTabStrip").select().index();
        var grid = $("#relacionesTab .k-state-active .k-grid").data("kendoGrid");
        var uid = $("#relacionesTab .k-state-active .k-state-selected").attr("data-uid");
        var fila = grid.dataSource.getByUid(uid);

        switch (tab) {
            case 0: // Usuarios                
                tipo = "usuario";
                idRelacion = fila.idUsuario;
                $("#relacionDiv").html(fila.nickname);
                break;
            case 1: // Eventos
                tipo = "evento";
                idRelacion = fila.idEvento;
                $("#relacionDiv").html(fila.Titulo);
                break;
            case 2: // Cursillos
                tipo = "cursillo";
                idRelacion = fila.idCursillo;
                $("#relacionDiv").html(fila.Titulo);
                break;
            case 3: // Pedidos globales
                tipo = "pedidoGlobal";
                idRelacion = fila.idPedidoGlobal;
                $("#relacionDiv").html(fila.idPedido);
                break;
            case 4: // Pedidos socio
                tipo = "pedidoUsuario";
                idRelacion = fila.idPedidoUsuario;
                $("#relacionDiv").html("<p>" + fila.idPedidoUsuario + "</p><p>" + fila.nickname);
                break;
            case 5: // Artículo (QUITAR)
                tipo = "articulo";
                idRelacion = fila.idArticulo;
                $("#relacionDiv").html(fila.idArticulo);
                break;
            case 6:
                tipo = "empresa";
                idRelacion =  fila.idEmpresa;
                $("#relacionDiv").html(fila.Nombre);
                break;
            case 7:
                tipo: "proveedor";
                idRelacion = fila.idProveedores;
                $("#relacionDiv").html(fila.Nombre);
                break;
            case 8:
                tipo = "contrato";
                idRelacion =  fila.idContrato;
                $("#relacionDiv").html("Contrato: " + fila.NombreEmpresa);
        }

        $("#relacionesWindow").data("kendoWindow").close();
        $("#relacionesButton").hide();
        $("#relacionesExistentesDiv").show();

    });

    $("#quitarRelacionButton").click(function () {
        tipo = null;
        idRelacion = null;
        $("#relacionesExistentesDiv").hide();
        $("#relacionesButton").show();
    });

    datosVentana();

}

/* ##############   VENTANA ########################################################################## */
function datosVentana() {
    // Window Relaciones    

    $("#relacionesButton").click(function () {
        w = $("#relacionesWindow").data("kendoWindow");
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

  

    // GRID usuarios
    dsUsuarios = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../Facturas/usuariosListado",
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
    dsEventos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/eventosListado",
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
    dsCursillos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/cursillosListado",
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
    dsPedidosGlobales = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/pedidosGlobalesListado",
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
                url: "../../../Facturas/pedidosUsuarioListado",
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
    dsArticulos = new kendo.data.DataSource({
        transport: {
            read: {
                url: "../../../Facturas/articulosListado",
                dataType: "json",
                type: "POST"
            }
        }
    });

    $("#articulosGrid").kendoGrid({
        dataSource: dsArticulos,
        columns: [
            {
                field: "Nombre",
                title: "Nombre"
            }
        ],
            selectable: true
        });

        // GRID empresas
        dsEmpresas = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "../../../Facturas/empresasListado",
                    dataType: "json",
                    type: "POST"
                }
            }
        });

        $("#empresasGrid").kendoGrid({
            dataSource: dsEmpresas,
            columns: [
            {
                field: "Nombre",
                title: "Nombre"
            },
            { field: "CIF",
                title: "CIF"
            },
            {
                field: "Localidad",
                title: "Localidad"
            },
            {
                field: "Email",
                title: "Email"
            },
            {
                field: "Telefono",
                title: "Telefono"
            }
        ],
            selectable: true
        });
}