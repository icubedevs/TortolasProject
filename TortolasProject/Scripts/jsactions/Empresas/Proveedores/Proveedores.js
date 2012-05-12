$(document).ready(function () {

    var idProveedor = null;
    var datasourceprov = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Proveedores/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idProveedor"
             }
        }
     });

     $("#ProveedoresGrid").kendoGrid //Creo el kendo Grid
    ({
        //height: 400,
        dataSource: datasourceprov,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        columns: [
            {
                field: "NombreProveedor",
                title: "Nombre"
            },
            {
                field: "CIFEmpresaP",
                title: "CIF"
            },
            {
                field: "DireccionFisica",
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
                field: "CodigoPostal",
                title: "Código Postal"
            },
            {
                field: "Mercado",
                title: "Mercado"
            },
            {
                title: "Editar",
                command: { text: "Editar", className: "botonEditarFilaProveedor" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFilaProveedor" }
            }
        ]

        });

        var weditarProveedor = $("#VentanaEditarProveedor")
        .kendoWindow
        ({
            title: "Proveedor",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

        var weliminarProveedor = $("#VentanaEliminarProveedor")
        .kendoWindow
        ({
            title: "Proveedor",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");


        // FUNCIONES //

        //Funciones: Botones del GRID//

        //Boton Editar//

        $(".botonEditarFilaProveedor").live("click", function () {

            //alert("Editar!");

            $(".NoModificable").prop('disabled', true); //Bloquea editar los campos

            var fila = $("#ProveedoresGrid").find("tbody tr.k-state-selected");

            var filajson = $("#ProveedoresGrid").data("kendoGrid").dataItem(fila).toJSON();
            idProveedor = datasourceprov.getByUid(fila.attr("data-uid")).idProveedor;

            $("#nombreempresaproveedor").val(filajson.NombreProveedor);
            $("#dirfisica").val(filajson.DireccionFisica);
            $("#mercado").val(filajson.Mercado);
            $("#codigopostal").val(filajson.CodigoPostal);
            $("#cifproveedor").val(filajson.CIFEmpresaP);

            weditarProveedor.center();

            weditarProveedor.open();
        });

        //Boton Eliminar//

        $(".botonEliminarFilaProveedor").live("click", function () {
            //alert("Eliminar!");

            $(".CuadroTexto").prop('disabled', true); //Bloquea editar los campos

            var fila = $("#ProveedoresGrid").find("tbody tr.k-state-selected");

            var filajson = $("#ProveedoresGrid").data("kendoGrid").dataItem(fila).toJSON();
            idProveedor = datasourceprov.getByUid(fila.attr("data-uid")).idProveedor;

            $("#nombreempresaproveedoreliminar").val(filajson.NombreProveedor);
            $("#direccionproveedoreliminar").val(filajson.DireccionFisica);
            $("#mercadoproveedoreliminar").val(filajson.Mercado);
            $("#codigopostalproveedoreliminar").val(filajson.CodigoPostal);
            $("#cifproveedoreliminar").val(filajson.CIFEmpresaP);


            weliminarProveedor.center();

            weliminarProveedor.open();
        });

        // Funciones: Botones Ventana Editaje //

        //Boton Cancelar//

        $(".FuncionBotonCancelarProveedores").live("click", function () {

            $(".CuadroTexto").prop('disabled', false); //Bloquea editar los campos

            weditarProveedor.close();
            weliminarProveedor.close();
        });

        //Boton Aceptar//

        $("#BotonAceptarVentanaEditarProveedor").live("click", function () {
            var datos = {};
            //Coger datos
            datos["codigopostal"] = $("#codigopostal").val();
            datos["direccionfisupdate"] = $("#dirfisica").val();
            datos["mercado"] = $("#mercado").val();
            datos["idproveedor"] = idProveedor;
            datos["fkcodigoempresa"] = idProveedor;

            $.ajax(
            {
                url: "Proveedores/UpdateProveedor",
                type: "POST",
                data: datos,
                success: function () {
                    $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                    datasourceprov.read();
                    weditarProveedor.close();
                },
                async: false
            });
        });

        // Funciones: Botones Ventana Eliminar //

        //Boton Aceptar//

        $("#BotonAceptarVentanaEliminarProveedor").live("click", function () {

            var datos = {};
            //Coger datos

            datos["idproveedor"] = idProveedor;

            $.ajax(
        {
            url: "Proveedores/DeleteProveedor",
            type: "POST",
            data: datos,
            success: function () {
                $(".CuadroTexto").prop('disabled', false); //Devuelve poder editar los campos en la ventana editar
                datasourceprov.read();
                weliminarProveedor.close();
            },
            async: false
        });

        });


        $("#ProveedoresNav").live("click", function () {  //Actualiza los datos al pulsar en su pestaña.
            datasourceprov.read();
        });

});