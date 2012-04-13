$(document).ready(function () {

    // Boton de prueba de AJAX
    $("#ButtonPulsa").live('click', pruebaAjax);
    function pruebaAjax() {
        $.post('Facturas/leerTodos', function (data) {
            $.each(data, function (key, val) {

                $("#divPruebaAjax").append("<p>" + key + " -> " + val);
            });
        });
    }
    $("#FacturasIndexGrid").kendoGrid({
        height: 200,
        columns: [
            {
                field: "idUsuario",
                title: "idUsuario"
            },
            {
                field: "Nickname",
                title: "Nickname"
            },
            {
                field: "Email",
                title: "Email"
            },
            {
                field: "DNI",
                title: "DNI"
            }
        ],
        dataSource:
        {
            transport: {
                read: {
                    url: "Facturas/leerPrueba",
                    dataType: "json",
                    type: "POST"
                }
            }
        }
    });


});