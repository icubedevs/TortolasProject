$(document).ready(function () {

    var idPatrocinador = null;
    var datasourcepat = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Patrocinadores/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idPatrocinador"
             }
        }
    });

    $("#PatrocinadoresGrid").kendoGrid //Creo el kendo Grid
    ({
        //height: 400,
        dataSource: datasourcepat,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        columns: [
            {
                field: "NombrePatrocinador",
                title: "Nombre"
            },
            {
                field: "CIFEmpresaPat",
                title: "CIF"
            },
            {
                field: "LocalizacionP",
                title: "Localización Publicidad",
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
                title: "Editar",
                command: { text: "Editar", className: "botonEditarFilaPatrocinador" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFilaPatrocinador" }
            }
        ]

    });

    // VENTANAS (POP-UP) //

    //Editar//

    var weditarPatrocinador = $("#VentanaEditarPatrocinador")
        .kendoWindow
        ({
            title: "Editar Patrocinador",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

    // Eliminar //

    var weliminarPatrocinador = $("#VentanaEliminarPatrocinador")
        .kendoWindow
        ({
            title: "Eliminar Patrocinador",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

    // Crear //

    var wcrearPatrocinador = $("#VentanaCrearPatrocinador")
        .kendoWindow
        ({
            title: "Crear Patrocinador",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

    $("#PatrocinadoresNav").live("click", function () {  //Actualiza los datos al pulsar en su pestaña.
        datasourcepat.read();
    });

    // FUNCIONES //

    //Funciones: Botones del GRID//

    //Boton Editar//

    $(".botonEditarFilaPatrocinador").live("click", function () {


        $(".NoModificable").prop('disabled', true); //Bloquea editar los campos

        var fila = $("#PatrocinadoresGrid").find("tbody tr.k-state-selected");

        var filajson = $("#PatrocinadoresGrid").data("kendoGrid").dataItem(fila).toJSON();
        idPatrocinador = datasourcepat.getByUid(fila.attr("data-uid")).idPatrocinador;

        $("#nombreempresapatrocinadoreditar").val(filajson.NombrePatrocinador);
        $("#locpatrocinadoreditar").val(filajson.LocalizacionP);
        $("#cifpatrocinadoreditar").val(filajson.CIFEmpresaPat);

        weditarPatrocinador.center();

        weditarPatrocinador.open();
    });

    //Boton Eliminar//

    $(".botonEliminarFilaPatrocinador").live("click", function () {

        $(".CuadroTexto").prop('disabled', true); //Bloquea editar los campos

        var fila = $("#PatrocinadoresGrid").find("tbody tr.k-state-selected");

        var filajson = $("#PatrocinadoresGrid").data("kendoGrid").dataItem(fila).toJSON();
        idPatrocinador = datasourcepat.getByUid(fila.attr("data-uid")).idPatrocinador;

        $("#nombrepatrocinadoreliminar").val(filajson.NombrePatrocinador);
        $("#lopatrocinadoreliminar").val(filajson.LocalizacionP);
        $("#cifpatrocinadoreliinar").val(filajson.CIFEmpresaPat);


        weliminarPatrocinador.center();

        weliminarPatrocinador.open();
    });

    // Funciones: Botones Ventana Editaje //

    //Boton Cancelar//

    $(".FuncionBotonCancelarProveedores").live("click", function () {

        $(".CuadroTexto").prop('disabled', false); //Bloquea editar los campos
        $(".VisibilidadDatosNuevaEmpresaRemota").hide();

        weditarPatrocinador.close();
        weliminarPatrocinador.close();
        wcrearPatrocinador.close();
    });

    //Boton Aceptar//

    $("#BotonAceptarVentanaEditarpatrocinador").live("click", function () {
        var datos = {};
        //Coger datos

        datos["locupdate"] = $("#locpatrocinadoreditar").val();
        datos["idpatrocinador"] = idPatrocinador;
        datos["cifpatrocinadoreditar"] = $("#cifpatrocinadoreditar").val();
        datos["FKCodigoEmpresa"] = idPatrocinador;

        $.ajax(
            {
                url: "Patrocinadores/UpdatePatrocinador",
                type: "POST",
                data: datos,
                success: function () {
                    $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                    datasourcepat.read();
                    weditarPatrocinador.close();
                },
                async: false
            });
    });

    // Funciones: Botones Ventana Eliminar //

    //Boton Aceptar//

    $("#BotonAceptarVentanaEliminarPatrocinador").live("click", function () {

        var datos = {};
        //Coger datos

        datos["idpatrocinador"] = idPatrocinador;

        $.ajax(
            {
                url: "Patrocinadores/DeletePatrocinador",
                type: "POST",
                data: datos,
                success: function () {
                    $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                    datasourcepat.read();
                    weliminarPatrocinador.close();
                },
                async: false
            });

    });

    //Boton Nuevo Patrocinador//

    $("#BotonNuevoPatrocinador").click(function () {

        $(".VisibilidadTelefonodeContacto").show();

        wcrearPatrocinador.center();

        wcrearPatrocinador.open();

    });

    //Funciones: Botones Ventana Crear //

    //Boton Vincular//

    $("#BotonVincularEmpresaDesdePatrocinador").live("click", function () {

        $("#VentanaEmpresasRemota").data("kendoWindow").center();
        $(".VisibilidadGridEmpresasRemota").show(); //Lo muestro
        $("#VentanaEmpresasRemota").data("kendoWindow").open();
    });

    //Boton Crear Patrocinador//

    $("#BotonAceptarVentanaCrearPatrocinador").click(function () {

        var datos = {};

        //Coger datos
        datos["nombreempresa"] = $("#nombrepatrocinadornuevo").val();
        datos["cif"] = $("#cifpatrocinadornuevo").val();
        datos["localizacion"] = $("#locpatrocinadornuevo").val();
        if ($("#tlfpatrocinadornuevo").val() == "") {
            datos["telefono"] = 0
        }
        else {
            datos["telefono"] = $("#tlfpatrocinadornuevo").val();
        }
        if ($("#patrocinadortflremoto").val() == "") {
            datos["telefono2"] = 0
        }
        else {
            datos["telefono2"] = $("#patrocinadortflremoto").val();
        }

        $.ajax(
        {
            url: "Patrocinadores/CreatePatrocinador",
            type: "POST",
            data: datos,
            success: function () {

                $(".VisibilidadDatosNuevaEmpresaRemota").hide();

                var temp = $("#PatrocinadoresGrid").data("kendoGrid").dataSource;

                temp.read();

                wcrearPatrocinador.close();


            },
            async: false
        });

    });

});