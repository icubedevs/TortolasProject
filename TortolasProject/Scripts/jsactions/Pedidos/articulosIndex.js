$(document).ready(function () {

    alert("pene"),

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
         },
         groupable: true,
         scrollable: true,
         sortable: true,
         pageable: true
     });

     alert ("pene2"),
});