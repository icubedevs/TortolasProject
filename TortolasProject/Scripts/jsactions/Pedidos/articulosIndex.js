$(document).ready(function () {

    var idArticulo = null;

    //VISTA AÑADIR ARTICULO

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

    //numeric texbox
    $('#precioAnadirArticuloAutocomplete').kendoNumericTextBox();

    //auxiliar para volver a index de articulo
    function volverIndexArticulos() {
        $("#anadirArticuloForm").hide();
        $("#articulosGrid").show();
        $("#anadirArticuloButton").show();
        $("#anadirArticuloCancelarButton").hide();
    }

    //VISTA EDITAR ARTICULO

    //Guardar edicion en la BD y volver al index de articulos
    $("#editarArticuloAceptarButton").live('click', function () {
        var nombre = $("#nombreEditarArticuloAutocomplete").val();
        var imagen = $("#imagenEditarArticuloAutocomplete").val();
        var descripcion = $("#descripcionEditarArticuloAutocomplete").val();
        var precio = $("#precioEditarArticuloAutocomplete").val();
        data = {
            nombre: nombre,
            imagen: imagen,
            descripcion: descripcion,
            precio: precio,
            idarticulo: idArticulo
        };
        url = 'Articulos/editarArticulo';
        $.post(url, data, function (data) {
            $("#articulosGrid").data("kendoGrid").dataSource.read();
            volverIndexArticulos2();
        });
    });

    //Cargar vista Index de articulos al cancelar
    $("#editarArticuloCancelarButton").live('click', function () {
        volverIndexArticulos2();
    });

    //auxiliar para volver a index de articulo
    function volverIndexArticulos2() {
        $("#editarArticuloForm").hide();
        $("#articulosGrid").show();
        $("#anadirArticuloButton").show();
        $("#editarArticuloCancelarButton").hide();
    }

    //numeric texbox
    $('#precioEditarArticuloAutocomplete').kendoNumericTextBox();

    //VISTA INDEX
    //Cargar vista Anadir articulo
    $("#anadirArticuloButton").click(function () {
        $.post('Articulos/cargarVistaAnadirArticulo', function (data) {
            $("#articulosGrid").hide();
            $("#anadirArticuloDiv").html(data);
            $("#anadirArticuloDiv").show();
            $("#anadirArticuloButton").hide();
        });
    });

    //Cargar vista Editar articulo
    $(".botonEditarFila").live('click', function () {
        var fila = $("#articulosGrid").find("tbody tr.k-state-selected");
        var filajson = $("#articulosGrid").data("kendoGrid").dataItem(fila).toJSON();
        var dataSourceArticulosGrid = $("#articulosGrid").data("kendoGrid").dataSource;
        idArticulo = dataSourceArticulosGrid.getByUid(fila.attr("data-uid")).idArticulo;

        $.post('Articulos/cargarVistaEditarArticulo', function (data) {
            $("#articulosGrid").hide();
            $("#editarArticuloDiv").html(data);
            $("#editarArticuloDiv").show();
            $("#anadirArticuloButton").hide();

            $("#nombreEditarArticuloAutocomplete").val(filajson.nombre);
            $("#imagenEditarArticuloAutocomplete").val(filajson.imagen);
            $("#descripcionEditarArticuloAutocomplete").val(filajson.descripcion);
            $("#precioEditarArticuloAutocomplete").val(filajson.precio);
        });
    });

    //Eliminar fila
    $(".botonEliminarFila").live('click', function () {

        if (confirm("¿Estas seguro de que desea eliminar la fila?")) {
            var fila = $("#articulosGrid").find("tbody tr.k-state-selected");
            var filajson = $("#articulosGrid").data("kendoGrid").dataItem(fila).toJSON();

            data = {
                nombre: filajson.nombre,
                imagen: filajson.imagen,
                descripcion: filajson.descripcion,
                precio: filajson.precio,
                idarticulo: filajson.idArticulo
            };

            url = 'Articulos/eliminarArticulo';
            $.post(url, data, function (data) {
                $("#articulosGrid").data("kendoGrid").dataSource.read();
            });
        }

    });

    //Grid de articulos
    $("#articulosGrid").kendoGrid({
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
                  title: "Editar",
                  command: { text: "Editar", className: "botonEditarFila" }
              },
              {
                  title: "Eliminar",
                  command: { text: "Eliminar", className: "botonEliminarFila" }
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
});