$(document).ready(function () {

    $("#añadirArticuloButton").click(function () {
        $.post('Articulos/cargarVistaAñadirArticulo', function (data) {
            $("#articulosGrid").hide();
            $("#añadirArticuloDiv").html(data);
            $("#añadirArticuloDiv").show();
            $("#añadirArticuloButton").hide();
        });
    });

    $("#articulosGrid").kendoGrid({

        columns: [
              {
                  field: "name",
                  title: "Nombre"
              },
              {
                  field: "image",
                  title: "Imagen"
              },
               {
                   field: "description",
                   title: "Descripcion"
               },
              {
                  field: "price",
                  title: "Precio"
              }],
        dataSource: {
            transport: {
                read: {
                    url: "Articulos/leerTodos",
                    dataType: "json",
                    type: "POST"
                }
            }
        }
    });

});