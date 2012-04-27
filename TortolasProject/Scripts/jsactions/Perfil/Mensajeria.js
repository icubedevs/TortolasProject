$(document).ready(function () {


    // Inicializo los DataSource de la pagina
    var dataSourceMensajesNoLeidos = new kendo.data.DataSource({
        transport: {
            type: "json",
            read: {
                url: "Perfil/leerMensajes",
                type: "POST",
                data: { idUsuario: "97779a08-76e5-4831-b0d0-53f10b60e879", tipo: "noleido" },
                dataType: "json"
            },
            pageSize: 5
        }
    });

    var dataSourceMensajesLeidos = new kendo.data.DataSource({
        transport: {
            type: "json",
            read: {
                url: "Perfil/leerMensajes",
                type: "POST",
                data: { idUsuario: "97779a08-76e5-4831-b0d0-53f10b60e879", tipo: "leido" },
                dataType: "json"
            },
            pageSize: 5
        }
    });

    var dataSourceDestinatarios = new kendo.data.DataSource({
        transport: {
            type: "json",
            read: {
                url: "Perfil/leerDestinatarios",
                type: "POST",
                dataType: "json"
            }

        }
    });

    // Inicializo la ventana de creacion
    var ventanaCrear = $("#ventanaCrear").kendoWindow({
        title: "Crear",
        modal: true,
        visible: false,
        resizable: false,
        scrollable: false,
        movable: false,
        width: 600,
        height: 450
    }).data("kendoWindow");

    $("#campoDestinatario").kendoComboBox({
        dataSource: dataSourceDestinatarios,
        dataValueField: "idUsuario",
        dataTextField: "Nombre"
    });



    // Inicializo la tabla de mensajes no leidos
    $("#tablaMensajesNoLeidos").kendoGrid({
        dataSource: dataSourceMensajesNoLeidos,
        filterable: true,
        selectable: true,
        pageable: true,
        pageSize: 5,
        scrollable: true,
        toolbar: kendo.template($("#templateToolbarMensajeNoLeidos").html()),
        change: mostrarMensajeNoLeido,
        columns: [
                    {
                        field: "FKRemitente",
                        title: "Usuario"

                    },
                     {
                         field: "asunto",
                         title: "Asunto"
                        , width: "300"
                     },
                     {
                         field: "fecha",
                         title: "Fecha"
                     },
                     {
                         command: { text: "Eliminar", className: "eliminarFilaNoLeidos" }
                     }
        ]
    });

    // Inicializo la tabla de mensajes
    $("#tablaMensajesLeidos").kendoGrid({
        dataSource: dataSourceMensajesLeidos,
        filterable: true,
        selectable: true,
        pageable: true,
        pageSize: 5,
        scrollable: true,
        toolbar: kendo.template($("#templateToolbarMensajeLeidos").html()),
        change: mostrarMensajeLeido,
        columns: [
                    {
                        field: "FKRemitente",
                        title: "Usuario",
                        filterable: {
                            extra: false, //do not show extra filters
                            operators: { // redefine the string operators
                                string: {
                                    eq: "Es igual a..",
                                    neq: "No es igual a...",
                                    startswith: "Empieza por...",
                                    contains: "Contiene"
                                }
                            }
                        }

                    },
                     {
                         field: "asunto",
                         title: "Asunto",
                         filterable: {
                             extra: false, //do not show extra filters
                             operators: { // redefine the string operators
                                 string: {
                                     eq: "Es igual a..",
                                     neq: "No es igual a...",
                                     startswith: "Empieza por...",
                                     contains: "Contiene"
                                 }
                             }
                         }

                     },
                     {
                         field: "fecha",
                         title: "Fecha",
                         filterable: {
                             extra: false, //do not show extra filters
                             operators: { // redefine the string operators
                                 string: {
                                     eq: "Es igual a..",
                                     neq: "No es igual a...",
                                     startswith: "Empieza por...",
                                     contains: "Contiene"
                                 }
                             }
                         }
                     },
                     {
                         command: { text: "Eliminar", className: "eliminarFilaLeidos" }
                     }
        ]
    });

    // Funciones para mostrar mensaje en los textarea de abajo
    function mostrarMensajeNoLeido(e) {
        var fila = $("#tablaMensajesNoLeidos").data("kendoGrid").select();
        var filaJson = $("#tablaMensajesNoLeidos").data("kendoGrid").dataItem(fila).toJSON();

        $("#asuntoMensaje").text(filaJson.asunto);
        $("#resultadoMensaje").text(filaJson.cuerpomensaje);
    }

    function mostrarMensajeLeido(e) {
        var fila = $("#tablaMensajesLeidos").data("kendoGrid").select();
        var filaJson = $("#tablaMensajesLeidos").data("kendoGrid").dataItem(fila).toJSON();

        $("#asuntoMensaje").text(filaJson.asunto);
        $("#resultadoMensaje").text(filaJson.cuerpomensaje);
    }


    // Inicializamos los combos para elegir los pageSize (mostrar o menos mensajes)
    var valoresPageSize = [
                        { texto: "5", valor: "5" },
                        { texto: "10", valor: "10" },
                        { texto: "15", valor: "15" },
                        { texto: "20", valor: "20" }
                    ];

    // Inicializamos los dropdownlist de las tablas para el pagesize
    $(".comboPageSize").kendoDropDownList({
        dataValueField: "valor",
        dataTextField: "texto",
        dataSource: valoresPageSize
    });

    // Como son dos dropdownlist distintos, tenemos que añadirle funciones distintas
    $("#comboPageSizeNoLeido").data("kendoDropDownList").bind("change", function (e) {

        var tablaNoLeidos = $("#tablaMensajesNoLeidos").data("kendoGrid");
        tablaNoLeidos.dataSource.pageSize($("#comboPageSizeNoLeido").data("kendoDropDownList").value());
        tablaNoLeidos.refresh();

    });

    $("#comboPageSizeLeido").data("kendoDropDownList").bind("change", function (e) {
        var tablaNoLeidos = $("#tablaMensajesLeidos").data("kendoGrid");
        tablaLeidos.dataSource.pageSize($("#comboPageSizeLeido").data("kendoDropDownList").value());
        tablaLeidos.refresh();
    });

    // Opcion de crear Mensaje en la tabla

    $(".componerMensaje").click(function () {

        ventanaCrear.center();
        ventanaCrear.open();
        $("#campoCuerpoMensaje").empty();
        $("#campoCuerpoMensaje").kendoEditor();
    });

    // Boton de enviar mensaje

    $("#enviarMensaje").click(function () {
        var destinatario = $("#campoDestinatario").data("kendoComboBox").value();
        var asunto = $("#campoAsunto").val();
        var cuerpoMensaje = $("#campoCuerpoMensaje").data("kendoEditor").value();
        var fecha = hoy();

        // Esta variable hay que cambiarla
        var Remitente = "97779a08-76e5-4831-b0d0-53f10b60e879";

        $.ajax({
            url: "Perfil/enviarMensaje",
            type: "POST",
            data: { Destinatario: destinatario, Asunto: asunto, CuerpoMensaje: cuerpoMensaje, Fecha: fecha, Remitente: Remitente },
            success: function () {
                ventanaCrear.close();
            }
        });
    });

    // Funcion para mostrar la fecha de hoy
    function hoy() {
        var fechaActual = new Date();

        dia = fechaActual.getDate();
        mes = fechaActual.getMonth() + 1;
        anno = fechaActual.getYear();


        if (dia < 10) dia = "0" + dia;
        if (mes < 10) mes = "0" + mes;

        fechaHoy = dia + "/" + mes + "/" + anno;

        return fechaHoy;
    }

    // Opcion de eliminar de las tablas
   

   $(".eliminarFilaNoLeidos").live("click",function () {
        
        if (confirm("¿Estas seguro de que desea eliminar el mensaje?")) {

            var fila = $("#tablaMensajesNoLeidos").data("kendoGrid").select();          // Cogemos la fila seleccionada
            var filaJson = $("#tablaMensajesNoLeidos").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
            var idMensaje = dataSourceMensajesNoLeidos.getByUid(fila.attr("data-uid")).idMensaje;

            eliminarFila(idMensaje);
            $("#tablaMensajesNoLeidos").data("kendoGrid").dataSource.read();
            $("#tablaMensajesLeidos").data("kendoGrid").dataSource.read();
        }

    });

    $(".eliminarFilaLeidos").live("click", function () {
        
        if (confirm("¿Estas seguro de que desea eliminar el mensaje?")) {
            var fila = $("#tablaMensajesLeidos").data("kendoGrid").select();          // Cogemos la fila seleccionada
            var filaJson = $("#tablaMensajesLeidos").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
            var idMensaje = dataSourceMensajesLeidos.getByUid(fila.attr("data-uid")).idMensaje;

            eliminarFila(idMensaje);
            $("#tablaMensajesNoLeidos").data("kendoGrid").dataSource.read();
            $("#tablaMensajesLeidos").data("kendoGrid").dataSource.read();
        }
    });

    function eliminarFila(idMensaje) {

        $.ajax({
            url: "Perfil/eliminarMensaje",
            type: "POST",
            data: { idMensaje: idMensaje }
        });
    }


    // Funcion para pasar mensajes de leido a no leido y viceversa

    $("#botonMarcarLeido").click(function () {

        var fila = $("#tablaMensajesNoLeidos").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#tablaMensajesNoLeidos").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON

        var idMensaje = dataSourceMensajesNoLeidos.getByUid(fila.attr("data-uid")).idMensaje;

        $.ajax({
            url: "Perfil/marcarLeido",
            type: "POST",
            data: { idMensaje: idMensaje, tipo: "leido" }
        });


        $("#tablaMensajesNoLeidos").data("kendoGrid").dataSource.read();
        $("#tablaMensajesLeidos").data("kendoGrid").dataSource.read();
    });


    $("#botonMarcarNoLeido").click(function () {

        var fila = $("#tablaMensajesLeidos").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#tablaMensajesLeidos").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON

        var idMensaje = dataSourceMensajesLeidos.getByUid(fila.attr("data-uid")).idMensaje;

        $.ajax({
            url: "Perfil/marcarLeido",
            type: "POST",
            data: { idMensaje: idMensaje, tipo: "noleido" }
        });


        $("#tablaMensajesLeidos").data("kendoGrid").dataSource.read();
        $("#tablaMensajesNoLeidos").data("kendoGrid").dataSource.read();
    });



});


