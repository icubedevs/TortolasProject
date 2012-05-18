$(document).ready(function () {

    var idConvenio = null;
    var datasourcecon = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Convenios/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idConvenio"
             }
        }
    });

    $("#ConveniosGrid").kendoGrid //Creo el kendo Grid
    ({
        dataSource: datasourcecon,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        groupable: true,
        columns: [
            {
                field: "NombreEmpre",
                title: "Nombre Empresa"
            },
            {
                field: "Descripcion",
                title: "Descripción Oferta",
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
                command: { text: "Editar", className: "botonEditarFilaConvenio" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFilaConvenio" }
            }
        ]

        });

        var weditarConvenio = $("#VentanaEditarConvenio")
        .kendoWindow
        ({
            title: "Editar Convenio",
            modal: true,
            visible: false,
            resizable: false,
        }).data("kendoWindow");

        var weliminarConvenio = $("#VentanaEliminarConvenio")
        .kendoWindow
        ({
            title: "Eliminar Convenio",
            modal: true,
            visible: false,
            resizable: false,
        }).data("kendoWindow");



        var wcrearConvenio = $("#VentanaCrearConvenio")
        .kendoWindow
        ({
            title: "Crear Convenio",
            modal: true,
            visible: false,
            resizable: false,
        }).data("kendoWindow");

    // FUNCIONES //

    //Funciones: Botones del GRID//

    //Boton Editar//

    $(".botonEditarFilaConvenio").live("click", function () {


        $(".NoModificable").prop('disabled', true); //Bloquea editar los campos

        var fila = $("#ConveniosGrid").find("tbody tr.k-state-selected");

        var filajson = $("#ConveniosGrid").data("kendoGrid").dataItem(fila).toJSON();
        idConvenio = datasourcecon.getByUid(fila.attr("data-uid")).idConvenio;

        $("#nombreempresaconvenioeditar").val(filajson.NombreEmpre);
        $("#cifempresaconvenio").val(filajson.CIFEmpresaC);
        $("#descconvenioeditar").val(filajson.Descripcion);

        weditarConvenio.center();

        weditarConvenio.open();
    });

    //Boton Eliminar//

    $(".botonEliminarFilaConvenio").live("click", function () {

        $(".CuadroTexto").prop('disabled', true); //Bloquea editar los campos

        var fila = $("#ConveniosGrid").find("tbody tr.k-state-selected");

        var filajson = $("#ConveniosGrid").data("kendoGrid").dataItem(fila).toJSON();
        idConvenio = datasourcecon.getByUid(fila.attr("data-uid")).idConvenio;

        $("#nombreempresaconvenioeliminar").val(filajson.NombreEmpre);
        $("#cifempresaconvenioeliminar").val(filajson.CIFEmpresaC);
        $("#descripcionconvenioeliminar").val(filajson.Descripcion);


        weliminarConvenio.center();

        weliminarConvenio.open();
    });

    // Funciones: Botones Ventana Editaje //

    //Boton Cancelar//

    $(".FuncionBotonCancelarProveedores").live("click", function () {

        $(".CuadroTexto").prop('disabled', false); //Bloquea editar los campos
        $(".VisibilidadDatosNuevaEmpresaRemota").hide();

        weliminarConvenio.close();
        weditarConvenio.close();
        wcrearConvenio.close();
    });

    //Boton Aceptar//

    $("#BotonAceptarVentanaEditarConvenio").live("click", function () {
        var datos = {};
        //Coger datos
        datos["cifempre"] = $("#cifempresaconvenio").val();
        datos["nombreempre"] = $("#nombreempresaconvenioeditar").val();
        datos["descripcion"] = $("#descconvenioeditar").val();
        datos["idconvenio"] = idConvenio;

        $.ajax(
            {
                url: "Convenios/UpdateConvenio",
                type: "POST",
                data: datos,
                success: function () {
                    $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                    datasourcecon.read();
                    weditarConvenio.close();
                },
                async: false
            });
    });

    // Funciones: Botones Ventana Eliminar //

    //Boton Aceptar//

    $("#BotonAceptarVentanaEliminarConvenio").live("click", function () {

        var datos = {};
        //Coger datos
        
        datos["idconvenio"] = idConvenio;

        $.ajax(
            {
                url: "Convenios/DeleteConvenio",
                type: "POST",
                data: datos,
                success: function () {
                    $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                    datasourcecon.read();
                    weliminarConvenio.close();
                },
                async: false
            });

    });

    //Boton Nuevo Proveedor//

    $("#BotonNuevoConvenio").click(function () {


        wcrearConvenio.center();

        wcrearConvenio.open();

    });

    //Funciones: Botones Ventana Crear //

    //Boton Vincular//

    $("#BotonVincularEmpresaDesdeConvenio").live("click", function () {  

        $("#VentanaEmpresasRemota").data("kendoWindow").center();
        $(".VisibilidadGridEmpresasRemota").show(); //Lo muestro
        $("#VentanaEmpresasRemota").data("kendoWindow").open();
    });

    //Boton Crear Proveedor//

    $("#BotonAceptarVentanaCrearConvenio").click(function () {

        var datos = {};

        //Coger datos
        datos["nombreempresa"] = $("#nombreempresaconveniocrear").val();
        datos["cif"] = $("#cifconveniocrear").val();
        datos["descripcion"] = $("#descripcionconveniocrear").val();
        if ($("#tlfconveniocrear").val() == "") {
            datos["telefono"] = 0
        }
        else {
            datos["telefono"] = $("#tlfconveniocrear").val();
        }
        if ($("#tlfempresaremotaconveniocrear").val() == "") {
            datos["telefono2"] = 0
        }
        else {
            datos["telefono2"] = $("#tlfempresaremotaconveniocrear").val();
        }


        $.ajax(
        {
            url: "Convenios/CreateConvenio",
            type: "POST",
            data: datos,
            success: function () {
                
                var temp = $("#ConveniosGrid").data("kendoGrid").dataSource;
                
                temp.read();

                $(".VisibilidadDatosNuevaEmpresaRemota").hide();

                wcrearConvenio.close();

                
            },
            async: false
        });

    });

    $("#ConveniosNav").live("click", function () {  //Actualiza los datos al pulsar en su pestaña.
        datasourcecon.read();
    });

});