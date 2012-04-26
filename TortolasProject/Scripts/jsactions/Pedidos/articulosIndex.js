$(document).ready(function () {

    //Cargar vista Anadir articulo
    $("#anadirArticuloButton").click(function () {
        $.post('Articulos/cargarVistaAnadirArticulo', function (data) {
            $("#articulosGrid").hide();
            $("#anadirArticuloDiv").html(data);
            $("#anadirArticuloDiv").show();
            $("#anadirArticuloButton").hide();
        });
    });

    //Cargar vista Index de articulos al cancelar
    $("#anadirArticuloCancelarButton").live('click', function () {
        volverIndexArticulos();
    });

    //Guardar articulo en la BD y volver al index de articulos
    $("#anadirArticuloAceptarButton").live('click', function () {
        var nombre = $("#nombreAnadirArticuloAutocomplete").val();
        var imagen = $("#imagenAnadirArticuloAutocomplete").val();
        var descripcion = $("#descripcionAnadirArticuloAutocomplete").val();
        var precio = $("#precioAnadirArticuloAutocomplete").val();
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
        $.post('Articulos/AnadirArticulo', function (data) {
            $("#anadirArticuloForm").hide();
            $("#articulosGrid").show();
            $("#anadirArticuloButton").show();
            $("#anadirArticuloCancelarButton").hide();
        });
    }

    //numeric texbox
    $('#precioAnadirArticuloAutocomplete').kendoNumericTextBox();

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