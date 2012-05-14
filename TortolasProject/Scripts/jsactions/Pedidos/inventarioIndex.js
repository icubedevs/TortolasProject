$(document).ready(function () {
    //DataSource de InventarioGrid
    var InvGridDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "Inventario/leerTodos",
                dataType: "json",
                type: "POST"
            }
        },
        schema:
                {
                    model:
                       {
                           id: "idInventario"
                       }
                }
    });

    //**************************************VISTA AÑADIR INVENTARIO*****************************************
    //Guardar añadir articulos
    $("#anadirInventarioAceptarButton").live('click', function () {
        $("#Ubicacion").val("");
        var w = $("#anadirInventarioVentana").data("kendoWindow");
        w.center();
        w.open();
    });

    //Cargar vista Index de inventario al cancelar
    $("#anadirInventarioCancelarButton").live('click', function () {
        $("#anadirInventarioGrid").hide();
        $("#inventarioGrid").show();
        $("#anadirInventarioAceptarButton").hide();
        $("#anadirInventarioCancelarButton").hide();
        $("#anadirInventarioButton").show();

        //alert("alert1");
        InvGridDataSource.read();
        //alert("alert2");
        var tabla = $("#inventarioGrid").data("kendoGrid");
        //alert("alert3");
        tabla.refresh();
    });

    //Añadir Inventario Grid

    $("#anadirInventarioGrid").kendoGrid({
        selectable: true,

        columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "imagen",
                      title: "Imagen"
                  },
                   {
                       field: "descripcion",
                       title: "Descripcion"
                   },
                  {
                      field: "precio",
                      title: "Precio"
                  },
                  {
                      field: "categoriaNombre",
                      title: "Categoria"
                  }],
        dataSource: {
            transport: {
                read: {
                    url: "Articulos/leerTodos",
                    dataType: "json",
                    type: "POST"
                }
            },
            schema:
                    {
                        model:
                           {
                               id: "idArticulo"
                           }
                    }
        }
    });

    //***************************************VENTANA UBICACION*********************************************
    $("#anadirInventarioVentana").kendoWindow({
        title: "Ubicacion",
        height: "300px",
        width: "500px",
        modal: true,
        visible: false
    });

    $("#anadirInventarioVentanaCancelar").live('click', function () {
        var w = $("#anadirInventarioVentana").data("kendoWindow");
        w.close();
    });

    $("#anadirInventarioVentanaAceptar").live('click', function () {
        var grid = $("#anadirInventarioGrid").data("kendoGrid");
        var uid = $("#anadirInventarioGrid .k-state-selected").attr("data-uid");
        var fila = grid.dataSource.getByUid(uid);

        var ubi = $("#Ubicacion").val();
        var cant = $("#Cantidad").val();

        data = {
            Articulo: fila.idArticulo,
            Ubicacion: ubi,
            Cantidad: cant
        };
        url = 'Inventario/anadirInventario';
        $.post(url, data, function (data) {
            var w = $("#anadirInventarioVentana").data("kendoWindow");
            w.close();
        });
    });

    //**********************************************INDEX**************************************************
    //Cargar vista anadir inventario
    $("#anadirInventarioButton").click(function () {
        $("#anadirInventarioGrid").show();
        $("#anadirInventarioAceptarButton").show();
        $("#anadirInventarioCancelarButton").show();
        $("#inventarioGrid").hide();
        $("#anadirInventarioButton").hide();
    });


    //Grid de inventario
    $("#inventarioGrid").kendoGrid({
        selectable: true,
        columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "imagen",
                      title: "Imagen"
                  },
                   {
                       field: "descripcion",
                       title: "Descripcion"
                   },
                  {
                      field: "precio",
                      title: "Precio"
                  },
                  {
                      field: "ubicacion",
                      title: "Ubicacion"
                  },
                  {
                      field: "cantidad",
                      title: "Cantidad"
                  },
                  {
                      field: "categoria",
                      title: "Categoria"
                  },
                  {
                      title: "Eliminar",
                      command: { text: "Eliminar", className: "botonEliminarFilaInv" }
                  }],
        dataSource: InvGridDataSource
    });

    $(".botonEliminarFilaInv").live('click', function () {

        if (confirm("¿Estas seguro de que desea eliminar el articulo del inventario?")) {
            var fila = $("#inventarioGrid").find("tbody tr.k-state-selected");
            var filajson = $("#inventarioGrid").data("kendoGrid").dataItem(fila).toJSON();

            data = {
                idInventario: filajson.idInventario
            };

            url = 'Inventario/eliminarInventario';
            $.post(url, data, function (data) {
                $("#inventarioGrid").data("kendoGrid").dataSource.read();
            });
        }

    });

    $("#anadirInventarioGrid").hide();
    $("#anadirInventarioAceptarButton").hide();
    $("#anadirInventarioCancelarButton").hide();
});