$(document).ready(function () {


    // Ventanas

    var ventanaNuevoUsuario = $("#ventanaNuevoUsuario").kendoWindow({
        title: "Nuevo Usuario",
        modal: true,
        visible: false,
        resizable: false,
        scrollable: false,
        movable: false,
        width: 550,
        height: 400
    }).data("kendoWindow").close();

    // Cargamos la tabla de Usuarios
    $("#tablaAdminUsuarios").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Usuarios/obtenerUsuarios",
                    type: "POST",
                    dataType: "json"
                },
                pageSize: 15
            }
        },
        pageable: true,
        sortable: true,
        selectable: true,
        scrollable: false,
        filterable: true,
        toolbar: kendo.template($("#templateToolbarAdminUsuario").html()),
        detailTemplate: kendo.template($("#templateDetailAdminUsuario").html()),
        detailInit: inicializarTablaAdmin,
        columns: [
                    {
                        field: "Nickname",
                        title: "Nickname",
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
                        field: "Email",
                        title: "Email",
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
                        field: "Nombre",
                        title: "Nombre",
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
                        field: "Apellidos",
                        title: "Apellidos",
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
                        field: "Direccion",
                        title: "Direccion",
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
                        field: "Telefono",
                        title: "Telefono",
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
                        title: "Herramientas",
                        command:
                        [
                        //   { text: "editar", className: "editarfila" },
                            {text: "eliminar", className: "eliminarfila" }
                        ]
                    }

            ]
    });

    function inicializarTablaAdmin(e) {

        $(".tabsUsuario").kendoTabStrip();      // Arrancamos los tabs

        // Comprobamos si es o no Socio y segun mostramos un div u otro
        var socio = null;
        $.ajax({
            url: "Usuarios/socioDeUsuario",
            type: "POST",
            data: { idUsuario: e.data.idUsuario },
            success: function (societe) {
                socio = societe;
            },
            async: false
        });

        if (socio != "No hay Socio") {     // Es un socio        
            $(".tabSocio_" + e.data.idUsuario + " .esSocio").hide();
            $(".tabSocio_" + e.data.idUsuario + " .noEsSocio").show();
            $(".tabSocio_" + e.data.idUsuario + " .fotoCarnet img").attr("src", socio.Foto);
            $(".tabSocio_" + e.data.idUsuario + " .carnetNumeroSocio").append(socio.NumeroSocio);
            $(".tabSocio_" + e.data.idUsuario + " .carnetFechaAlta").append(socio.FechaAlta);
            $(".tabSocio_" + e.data.idUsuario + " .carnetNombre").append(e.data.Nombre);
            $(".tabSocio_" + e.data.idUsuario + " .carnetApellidos").append(e.data.Apellidos);
            $(".tabSocio_" + e.data.idUsuario + " .carnetDNI").append(e.data.DNI);
        }
        // No es un socio
        else {
            $(".tabSocio_" + e.data.idUsuario + " .esSocio").show();
            $(".tabSocio_" + e.data.idUsuario + " .noEsSocio").hide();
        }

        $(".tabSocio_" + e.data.idUsuario + " .botonCrearEnlazarSocio").click(function () {
            alert("cucu");
            alert("soy el uzuario " + e.data.idUsuario);

        });
    }


    // Boton de Creacion de un nuevo USUARIO
    $("#nuevoUsuarioToolbar").click(function () {
        ventanaNuevoUsuario.open().center();
    });


    // Checkeo de los campos de la ventana de creacion de USUARIo
    $("#nuevoNickname").change(function () {
        $.ajax({
            url: "Usuarios/checkearNickname",
            type: "POST",
            data: { Nickname: $(this).val() },
            success: function (respuesta) {
                if (respuesta == "True") {       // No Hay repeticiones
                    $("#nuevoNickname").removeClass("k-invalid");
                }
                else {
                    $("#nuevoNickname").addClass("k-invalid");
                }
            },
            async: false
        });
    });

    $("#nuevoEmail").change(function () {
        $.ajax({
            url: "Usuarios/checkearEmail",
            type: "POST",
            data: { Email: $(this).val() },
            success: function (respuesta) {
                if (respuesta == "True") {       // No Hay repeticiones
                    $("#nuevoEmail").removeClass("k-invalid");
                }
                else {
                    $("#nuevoEmail").addClass("k-invalid");
                }
            },
            async: false
        });
    });


    // Boton para crear Usuario
    $("#botonNuevoUsuario").click(function () {
        alert("estoy por aqui");
        if (validadorNuevoUsuario.validate()) {
            alert("todo way");
        }
        else {
            alert("no todo tan way");
        }
    });


    // Zona para Qtips

    setTimeout(cargarQTipsAdminUsuario, 1000);

    function cargarQTipsAdminUsuario() {

        $("#nuevoUsuarioToolbar").qtip({
            content: {
                text: "Con este boton creará un <b>nuevo Usuario</b>, solo tiene que rellenar los campos del formulario. Los detalles deberan insertarse logueandose."
            },
            position: {
                my: "top left"
            }
        });

        $("#nuevoSocioToolbar").qtip({
            content: {
                text: "Con este boton creará un nuevo Socio y se lo asignará a un Socio.<br>Para ello <b>seleccione un Usuario</b> y pulse el boton.<br>El sistema le asignará el numero de Socio automaticamente y rellenara los campos automaticamente."
            },
            position: {
                my: "top left"
            }
        });

        $("#nuevoJuntaDirectivaToolbar").qtip({
            content: {
                text: "Con este boton ascendera al <b>Usuario</b> seleccionado a la <b>Junta Directiva</b>. El Usuario elegido debera ser <b>Socio</b>, sino no sera posible la operacion."
            },
            position: {
                my: "top left"
            }
        });

    }

});