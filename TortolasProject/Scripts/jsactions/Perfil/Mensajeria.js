$(document).ready(function () {

    // Variables para guardar los datos del mensaje actual que se 
    // esta mostrando
    var mensajeguardado = null;

    // Inicializo los DataSource de la pagina
    var dataSourceMensajesNoLeidos = new kendo.data.DataSource({
        transport: {
            type: "json",
            read: {
                url: "Perfil/leerMensajes",
                type: "POST",
                data: { tipo: "noleido" },
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
                data: { tipo: "leido" },
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

    // Inicializo la ventana de mostrar
    var ventanaCrear = $("#ventanaMostrar").kendoWindow({
        title: "Ver Mensaje",
        modal: true,
        visible: false,
        resizable: false,
        scrollable: false,
        movable: false,
        width: 600,
        height: 450
    }).data("kendoWindow");


    // Combo de seleccion de destinatario
    $("#campoDestinatario").kendoComboBox({
        dataSource: dataSourceDestinatarios,
        dataValueField: "idUsuario",
        dataTextField: "Nombre",
        suggest: true
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
        columns: [
                    {
                        field: "nombreRemitente",
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
                         title: "Asunto"
                        , width: "300",
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
        columns: [
                    {
                        field: "nombreRemitente",
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



    // MOSTRAR MENSAJE (TABLA MENSAJES NO LEIDOS) [DOBLE CLICK]
    $('.noLeidos .k-grid-content tr').live('dblclick', function () {

        var fila = $("#tablaMensajesNoLeidos").data("kendoGrid").select();
        var data = dataSourceMensajesNoLeidos.getByUid(fila.attr("data-uid"));

        mostrarMensaje(data, "noleido");
    });

    // MOSTRAR MENSAJE (TABLA MENSAJES LEIDOS) [DOBLE CLICK]
    $('.leidos .k-grid-content tr').live('dblclick', function () {

        var fila = $("#tablaMensajesLeidos").data("kendoGrid").select();
        var data = dataSourceMensajesLeidos.getByUid(fila.attr("data-uid"));

        mostrarMensaje(data, "leido");
    });


    // MOSTRAR MENSAJE (GENERAL)
    function mostrarMensaje(mensaje, tipo) {

        // Guardamos los datos del mensaje a mostrar
        mensajeguardado = mensaje;

        // Mostramos los datos
        $("#mostrarDestinatario").val(mensaje.nombreRemitente);
        $("#mostrarAsunto").val(mensaje.asunto);
        $("#mostrarCuerpoMensaje").val(mensaje.cuerpomensaje);

        // Ponemos los campos a no editable
        $(".muestra").attr("disable", true);

        // Ocultamos el boton de "Enviar" y el editor
        $("#mostrarEnviarMensaje").hide();

        $("#ventanaMostrar").data("kendoWindow").center();
        $("#ventanaMostrar").data("kendoWindow").open();

        // El editor debe montarse despues de abrirse la ventana 
        // para que coja el ancho correcto
        $("#mostrarCuerpoMensajeEditable").empty();
        $("#mostrarCuerpoMensajeEditable").kendoEditor();
        $(".editorwrapper").hide();
    }


    // Funcion para ver/editar mensaje
    $("#botonModoEnvio").toggle(
        function () {
            // Pasamos a modo edicion
            $(".muestra").removeAttr("readonly");
            $(this).val("Cancelar");
            $("#mostrarEnviarMensaje").show();
            $("#mostrarAsunto").val("");
            $("#mostrarCuerpoMensaje").hide();
            $("#mostrarCuerpoMensajeEditable").data("kendoEditor").value("<p></p>");
            $(".editorwrapper").show();
        },  // MIRA AQUI ISMI, TIENES QUE USAR OTR O TEXTAREA Y CONTROLARLO
        function () {
            // Volvemos a modo lectura
            $(".muestra").attr("readonly", true);
            $(this).val("Responder");
            $("#mostrarEnviarMensaje").hide();
            $("#mostrarAsunto").val(mensajeguardado.asunto);
            $("#mostrarCuerpoMensaje").show();
            $(".editorwrapper").hide();
        });

    // Boton para responder desde la lectura del mensaje

    $("#mostrarEnviarMensaje").click(function () {
        var destinatario = mensajeguardado.FKRemitente;
        var asunto = $("#mostrarAsunto").val();
        var cuerpoMensaje = $("#mostrarCuerpoMensajeEditable").data("kendoEditor").value();
        var fecha = hoy();

        $.ajax({
            url: "Perfil/enviarMensaje",
            type: "POST",
            data: { Destinatario: destinatario, Asunto: asunto, CuerpoMensaje: cuerpoMensaje, Fecha: fecha },
            success: function () {
                alert("Mensaje enviado correctamente");
            }
        });
    });

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


    $(".eliminarFilaNoLeidos").live("click", function () {

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


