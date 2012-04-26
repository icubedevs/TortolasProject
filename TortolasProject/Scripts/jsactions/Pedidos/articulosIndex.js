$(document).ready(function () {

    //Cargar vista Añadir articulo
    $("#añadirArticuloButton").click(function () {
        $.post('Articulos/cargarVistaAñadirArticulo', function (data) {
            $("#articulosGrid").hide();
            $("#añadirArticuloDiv").html(data);
            $("#añadirArticuloDiv").show();
            $("#añadirArticuloButton").hide();
        });
    });

    //Cargar vista Index de articulos al cancelar
    $("#añadirArticuloCancelarButton").live('click', function () {
        volverIndexArticulos();
    });

    //Guardar articulo en la BD y volver al index de articulos
    $("#añadirArticuloAceptarButton").live('click', function () {
        var nombre = $("#nombreAñadirArticuloAutocomplete").val();
        var imagen = $("#imagenAñadirArticuloAutocomplete").val();
        var descripcion = $("#descripcionAñadirArticuloAutocomplete").val();
        var precio = $("#precioAñadirArticuloAutocomplete").val();
        data = {
            nombre: nombre,
            imagen: imagen,
            descripcion: descripcion,
            precio: precio
        };

        url = 'Articulos/nuevoArticulo';
        $.post(url, data, function (data) {
            $("#articulosGrid").data("kendoGrid").dataSource.read();
            volverIndexArticulos();
        });
    });

    //auxiliar para volver a index de articulo
    function volverIndexArticulos() {
        $.post('Articulos/AñadirArticulo', function (data) {
            $("#añadirArticuloForm").hide();
            $("#articulosGrid").show();
            $("#añadirArticuloButton").show();
            $("#añadirArticuloCancelarButton").hide();
        });
    }

    //numeric texbox
    $('#precioAñadirArticuloAutocomplete').kendoNumericTextBox();

    //Grid de articulos
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