$(document).ready(function () {
    var idAsociacion = null;
    var datasourceasoc = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Asociaciones/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idAsociacion"
             }
        }
    });
    
    $("#AsociacionesGrid").kendoGrid //Creo el kendo Grid
    ({
        //height: 400,
        dataSource: datasourceasoc,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        columns: [
            {
                field: "NombreAsociacion",
                title: "Nombre"
            },
            {
                field: "Direccion",
                title: "Direccion",
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
                field: "Tematica",
                title: "Tematica"
            },
            {
                title: "Editar",
                command: { text: "Editar", className: "botonEditarFilaAsociacion" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFilaAsociacion" }
            }
        ]

        });

        $("#AsociacionesNav").live("click", function () {  //Actualiza los datos al pulsar en su pestaña.
            $.post('Asociaciones/LeerTodos', function () { 
                
            });
        });

        var weditarAsociacion = $("#VentanaEditarAsociacion")
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

        $(".botonEditarFilaAsociacion").live("click", function () {

            //alert("Editar!");

            var fila = $("#AsociacionesGrid").find("tbody tr.k-state-selected");

            var filajson = $("#AsociacionesGrid").data("kendoGrid").dataItem(fila).toJSON();
            idAsociacion = datasourceasoc.getByUid(fila.attr("data-uid")).idAsociacion;

            $("#nombreempresaasociacion").val(filajson.NombreAsociacion);
            $("#direccion").val(filajson.Direccion);
            $("#tematica").val(filajson.Tematica);

            weditarAsociacion.center();

            weditarAsociacion.open();
        });

        //Boton Eliminar//

        $(".botonEliminarFilaAsociacion").live("click", function () {
            //alert("Eliminar!");

            $(".CuadroTexto").prop('disabled', true); //Bloquea editar los campos
            $(".VisibilidadBotonAceptarEditar").hide(); //Oculta el boton de aceptar de la ventana editar
            $(".VisibilidadBotonAceptarEliminar").show(); //Muestra el boton correspondiente para aceptar en la ventana eliminar
            
            var fila = $("#AsociacionesGrid").find("tbody tr.k-state-selected");

            var filajson = $("#AsociacionesGrid").data("kendoGrid").dataItem(fila).toJSON();
            idAsociacion = datasourceasoc.getByUid(fila.attr("data-uid")).idAsociacion;
            
            $("#nombreempresaasociacion").val(filajson.NombreAsociacion);
            $("#direccion").val(filajson.Direccion);
            $("#tematica").val(filajson.Tematica);

            
            weditarAsociacion.center();

            weditarAsociacion.open();
        });

        // Funciones: Botones Ventana Editaje //

        //Boton Cancelar//
        $("#BotonCancelarVentanaEditarAsociacion").live("click", function () {

            $(".VisibilidadBotonAceptarEditar").show(); //Muestra el boton de aceptar de la ventana editar
            $(".VisibilidadBotonAceptarEliminar").hide(); //Oculta el boton correspondiente para aceptar en la ventana eliminar

            weditarAsociacion.close();
        });

        //Boton Aceptar//

        $("#BotonAceptarVentanaEditarAsociacion").live("click", function () {
            var datos = {};
            //Coger datos
            datos["nombreasociacion"] = $("#nombreempresaasociacion").val();
            datos["direccionupdate"] = $("#direccion").val();
            datos["tematicaupdate"] = $("#tematica").val();
            datos["idempresa"] = idAsociacion;

            $.ajax(
            {
                url: "Asociaciones/UpdateAsociacion",
                type: "POST",
                data: datos,
                success: function () {
                    $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                    datasourceasoc.read();
                    weditarAsociacion.close();
                 },
            async: false
            });
    });

    // Funciones: Botones Ventana Eliminar //

    //Boton Aceptar//

    $("#BotonAceptarVentanaEliminarAsociacion").live("click", function () {

        var datos = {};
        //Coger datos
        
        datos["idasociacion"] = idAsociacion;

        $.ajax(
        {
            url: "Asociaciones/DeleteAsociacion",
            type: "POST",
            data: datos,
            success: function () {
                alert("Estoy dentro del success!");
                $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                $(".VisibilidadBotonAceptarEditar").show(); //Oculta el boton de aceptar de la ventana editar
                $(".VisibilidadBotonAceptarEliminar").hide(); //Muestra el boton correspondiente para aceptar en la ventana eliminar
                datasourceasoc.read();
                weditarAsociacion.close();
                alert("Ya he terminado!?");
            },
            async: false
        });

    });
});