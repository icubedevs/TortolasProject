

$(document).ready(function () {

    $("#VentanaEmpresasRemota") //Creo la ventana como variable global para que pueda ser usado por todos
        .kendoWindow
        ({
            title: "Seleccione una Empresa",
            modal: false,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

    $('#EmpresasGridRemoto .k-grid-content tr').live('dblclick', function () {

        var fila = $("#EmpresasGridRemoto").find("tbody tr.k-state-selected");

        var filajson = $("#EmpresasGridRemoto").data("kendoGrid").dataItem(fila).toJSON();
        idEmpresa = datasource.getByUid(fila.attr("data-uid")).idEmpresa;

        $(".localidadremota").val(filajson.Localidad);
        $(".dirwebremota").val(filajson.DireccionWeb);
        $(".telefonoremoto2").val(filajson.TelefonodeContacto);
        $(".emailremoto").val(filajson.Email);
        $(".nombreempresaasociacion").val(filajson.Nombre);
        $(".cifremoto").val(filajson.CIF);


        $(".VisibilidadDatosNuevaEmpresaRemota").show(); //Muestro los datos de la empresa asociada
        $(".VisibilidadTelefonodeContacto").hide(); //Oculto el telefono

        $("#VentanaEmpresasRemota").data("kendoWindow").close();
        $(".VisibilidadGridEmpresasRemota").hide(); //Lo oculto

    });


    $(".VisibilidadGridEmpresasRemota").hide(); //Inicio oculta la ventana para vincular empresas
    $(".VisibilidadBotonAceptarEliminar").hide(); //Oculta el boton de aceptar para la ventana de editaje/eliminacion
    $(".VisibilidadDatosNuevaEmpresaRemota").hide(); //Oculta el boton de aceptar de la ventana editar

    var idEmpresa = null;
    var datasource = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Empresas/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idEmpresa"
             }
        }
    });

    $("#EmpresasNavegador").kendoTabStrip(); //Creo el kendo para pestañas

    $("#EmpresasGrid").kendoGrid //Creo el kendo Grid
    ({
        //height: 400,
        dataSource: datasource,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        columns: [
            {
                field: "Nombre",
                title: "Nombre",
                filterable: {
                    extra: false, //do not show extra filters
                    operators: { // redefine the string operators
                        string: {
                            eq: "Es igual a...",
                            neq: "No es igual a...",
                            startswith: "Empieza por...",
                            contains: "Contiene"
                        }
                    }
                }

            },
            {
                field: "CIF",
                title: "CIF"
            },
            {
                field: "Localidad",
                title: "localidad"
            },
            {
                field: "DireccionWeb",
                title: "Direccion Web"
            },
            {
                field: "TelefonodeContacto",
                title: "Telefono de Contacto"
            },
            {
                field: "Email",
                title: "E-Mail"
            },
            {
                title: "Editar",
                command: { text: "Editar", className: "botonEditarFila" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFila" }
            }
        ]

    });

    $("#EmpresasGridRemoto").kendoGrid //Creo el kendo Grid
    ({
        //height: 400,
        dataSource: datasource,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        columns: [
            {
                field: "Nombre",
                title: "Nombre",
                filterable: {
                    extra: false, //do not show extra filters
                    operators: { // redefine the string operators
                        string: {
                            eq: "Es igual a...",
                            neq: "No es igual a...",
                            startswith: "Empieza por...",
                            contains: "Contiene"
                        }
                    }
                }

            },
            {
                field: "CIF",
                title: "CIF"
            },
            {
                field: "Localidad",
                title: "localidad"
            },
            {
                field: "DireccionWeb",
                title: "Direccion Web"
            },
            {
                field: "TelefonodeContacto",
                title: "Telefono de Contacto"
            },
            {
                field: "Email",
                title: "E-Mail"
            }
        ]

    });

    var weditar = $("#VentanaEditar")
        .kendoWindow
        ({
            title: "Editar",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");




    // FUNCIONES //

    //Funciones: Botones del GRID//

    //Boton Editar//


    $(".botonEditarFila").live("click", function () {

        //alert("Editar!");
        $(".VisibilidadBotonAceptarEditar").show();

        var fila = $("#EmpresasGrid").find("tbody tr.k-state-selected");

        var filajson = $("#EmpresasGrid").data("kendoGrid").dataItem(fila).toJSON();
        idEmpresa = datasource.getByUid(fila.attr("data-uid")).idEmpresa;

        $("#nombreempresa").val(filajson.Nombre);
        $("#cif").val(filajson.CIF);
        $("#localidad").val(filajson.Localidad);
        $("#direccionweb").val(filajson.DireccionWeb);
        $("#telefonodecontacto").val(filajson.TelefonodeContacto);
        $("#email-c").val(filajson.Email);


        weditar.center();

        weditar.open();
    });

    //Boton Eliminar//

    $(".botonEliminarFila").live("click", function () {
        //alert("Eliminar!");

        $(".CuadroTexto").prop('disabled', true); //Bloquea editar los campos
        $(".VisibilidadBotonAceptarEditar").hide(); //Oculta el boton de aceptar de la ventana editar
        $(".VisibilidadBotonAceptarEliminar").show(); //Muestra el boton correspondiente para aceptar en la ventana eliminar

        var fila = $("#EmpresasGrid").find("tbody tr.k-state-selected");

        var filajson = $("#EmpresasGrid").data("kendoGrid").dataItem(fila).toJSON();
        idEmpresa = datasource.getByUid(fila.attr("data-uid")).idEmpresa;

        $("#nombreempresa").val(filajson.Nombre);
        $("#cif").val(filajson.CIF);
        $("#localidad").val(filajson.Localidad);
        $("#direccionweb").val(filajson.DireccionWeb);
        $("#telefonodecontacto").val(filajson.TelefonodeContacto);
        $("#email-c").val(filajson.Email);


        weditar.center();

        weditar.open();
    });


    //Boton Nueva Empresa//

    $("#BotonNuevaEmpresa").click(function () {
        //alert("Crear!");
        $("#EmpresasNavegador").hide();
        $.post('Empresas/CargarVistaNuevaEmpresa', function (data) {
            $("#EmpresasHerramientasContent").hide();
            $("#EmpresasGrid").hide();
            $("#NuevaEmpresaFormulario").html(data);
            $("#NuevaEmpresaFormulario").show();
        });

    });

    // Funciones: Botones Ventana Editaje //

    //Boton Cancelar//
    $("#BotonCancelarVentanaEditar").live("click", function () {
        $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
        $(".VisibilidadBotonAceptarEditar").show(); //Muestra el boton de aceptar de la ventana editar
        $(".VisibilidadBotonAceptarEliminar").hide(); //Oculta el boton correspondiente para aceptar en la ventana eliminar

        weditar.close();
    });

    //Boton Aceptar//

    $("#BotonAceptarVentanaEditar").live("click", function () {
        var datos = {};
        //Coger datos
        datos["nombreempresaupdate"] = $("#nombreempresa").val();
        datos["cifupdate"] = $("#cif").val();
        datos["localidadupdate"] = $("#localidad").val();
        datos["direccionwebupdate"] = $("#direccionweb").val();
        datos["telefonodecontactoupdate"] = $("#telefonodecontacto").val();
        datos["emailupdate"] = $("#email-c").val();
        datos["idempresa"] = idEmpresa;

        //alert(datos["nombreempresaupdate"]);

        $.ajax(
        {
            url: "Empresas/UpdateEmpresa",
            type: "POST",
            data: datos,
            success: function () {
                $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                datasource.read();
                weditar.close();
            },
            async: false
        });
    });

    // Funciones: Botones Ventana Eliminar //

    //Boton Aceptar//

    $("#BotonAceptarVentanaEliminar").live("click", function () {

        var datos = {};
        //Coger datos
        datos["nombreempresaupdate"] = $("#nombreempresa").val();
        datos["cifupdate"] = $("#cif").val();
        datos["localidadupdate"] = $("#localidad").val();
        datos["direccionwebupdate"] = $("#direccionweb").val();
        datos["telefonodecontactoupdate"] = $("#telefonodecontacto").val();
        datos["emailupdate"] = $("#email-c").val();
        datos["idempresa"] = idEmpresa;

        $.ajax(
        {
            url: "Empresas/DeleteEmpresa",
            type: "POST",
            data: datos,
            success: function () {
                //alert("Estoy dentro del success!");
                $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                $(".VisibilidadBotonAceptarEditar").show(); //Oculta el boton de aceptar de la ventana editar
                $(".VisibilidadBotonAceptarEliminar").hide(); //Muestra el boton correspondiente para aceptar en la ventana eliminar
                datasource.read();
                weditar.close();
                //alert("Ya he terminado!?");
            },
            async: false
        });

    });

    //Funciones: Enlaces Navegador

    $("#EmpresasNav").live("click", function () {
        $("#NuevaEmpresaFormulario2").hide();
        datasource.read();
    });



});