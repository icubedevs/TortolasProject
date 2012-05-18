$(document).ready(function () {


    // Ventanas

    var ventanaNuevoUsuario = $("#ventanaNuevoUsuario").kendoWindow({
        title: "Nuevo Usuario",
        modal: true,
        visible: false,
        resizable: false,
        //scrollable: false,
        movable: false
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
                            {text: "eliminar", className: "eliminarUsuario" }
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
            $(".tabSocio_" + e.data.idUsuario + " .esSocio").show();
            $(".tabSocio_" + e.data.idUsuario + " .noEsSocio").hide();
            $(".tabSocio_" + e.data.idUsuario + " .fotoCarnet img").attr("src", socio.Foto);
            $(".tabSocio_" + e.data.idUsuario + " .carnetNumeroSocio").append(socio.NumeroSocio);
            $(".tabSocio_" + e.data.idUsuario + " .carnetFechaAlta").append(socio.FechaAlta);
            $(".tabSocio_" + e.data.idUsuario + " .carnetNombre").append(e.data.Nombre);
            $(".tabSocio_" + e.data.idUsuario + " .carnetApellidos").append(e.data.Apellidos);
            $(".tabSocio_" + e.data.idUsuario + " .carnetDNI").append(e.data.DNI);
        }
        // No es un socio
        else {
            $(".tabSocio_" + e.data.idUsuario + " .esSocio").hide();
            $(".tabSocio_" + e.data.idUsuario + " .noEsSocio").show();
        }

        $(".tabSocio_" + e.data.idUsuario + " .botonCrearEnlazarSocio").click(function () {
            enlazarUsuario(e.data.idUsuario);
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
                    if ($("#nuevoNickname").val() == "")
                        $("#nuevoNickname").addClass("k-invalid");
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
                    if ($("#nuevoEmail").val() == "")
                        $("#nuevoEmail").addClass("k-invalid");
                }
                else {
                    $("#nuevoEmail").addClass("k-invalid");
                }
            },
            async: false
        });
    });


    // Funcion para el check de password Random
    $("#checkPasswordRandom").change(function () {
        var password = $("#nuevoPassword").val();
        if (password == "") {       // Que no este vacio
            $("#nuevoPassword").val(Math.random().toString(36).substring(7));
            $("#nuevoPassword").attr("disabled", true);
        }
        else {
            $("#nuevoPassword").val("");
            $("#nuevoPassword").attr("disabled", false);
        }

    });


    // Boton para crear Usuario
    $("#botonNuevoUsuario").click(function () {


        if ($(".k-invalid").size() == 0) {
            var nickname = $("#nuevoNickname").val();
            var email = $("#nuevoEmail").val();
            var password = $("#nuevoPassword").val();

            if (nickname == "" || email == "" || password == "") {
                alert("Uno o varios campos estan vacios.");
            }
            else {
                $.ajax({
                    url: "Home/Registro",
                    type: "POST",
                    data: { UserName: nickname, Email: email, Password: password, ConfirmPassword: password },
                    success: function () {
                        $("#tablaAdminUsuarios").data("kendoGrid").dataSource.read();
                        ventanaNuevoUsuario.close();
                    },
                    async: false
                });
            }
        }
        else {
            alert("Uno o varios campos ya existen en la Base de Datos, elija otro.");
        }
    });


    // Funcion de eliminar
    $(".eliminarUsuario").live("click", function () {

        var fila = $("#tablaAdminUsuarios").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#tablaAdminUsuarios").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
        idUsuario = $("#tablaAdminUsuarios").data("kendoGrid").dataSource.getByUid(fila.attr("data-uid")).idUsuario;

        var socio = null;

        $.ajax({
            url: "Usuarios/socioDeUsuario",
            type: "POST",
            data: { idUsuario: idUsuario },
            success: function (societe) {
                socio = societe;
            },
            async: false
        });

        if (socio != "No hay Socio") {
            alert("Este usuario es un Socio, por lo que no puede ser eliminado.");
        }
        else {
            if (confirm("¿Estas seguro de que desea eliminar este usuario?")) {
                $.ajax({
                    url: "Usuarios/eliminarUsuario",
                    type: "POST",
                    data: { idUsuario: idUsuario },
                    success: function () {
                        $("#tablaAdminUsuarios").data("kendoGrid").dataSource.read();
                    },
                    async: false
                });
            }
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

        $(".nuevoUsuario").qtip({
            content: {
                text: "Este campo no es <font color='red'><b>modificable</b></font>.<br> No puede estar repetido en la Base de Datos."
            },
            position: {
                my: "top left"
            }
        });

    }


    // Funciones descartadas (MIGRAR A SOCIOS)


    // Boton para crear un Socio y enlazarselo al Usuario
    $("#nuevoSocioToolbar").click(function () {

        var fila = $("#tablaAdminUsuarios").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#tablaAdminUsuarios").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
        idUsuario = $("#tablaAdminUsuarios").data("kendoGrid").dataSource.getByUid(fila.attr("data-uid")).idUsuario;          // Obtenemos el idMonitor seleccionado
        enlazarUsuario(idUsuario);
    });

    function enlazarUsuario(idUsuario) {
        $.ajax({
            url: "Usuarios/nuevoSocio",
            type: "POST",
            data: { idUsuario: idUsuario },
            success: function () {
                $("#tablaAdminUsuarios").data("kendoGrid").dataSource.read();
            },
            async: false
        });
    };


});