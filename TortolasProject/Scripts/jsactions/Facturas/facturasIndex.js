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
        height: 400,
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
            },
            {
               command: "Detalles"
            }
        ],
        dataSource:
        {
            transport: {
                read: {
                    url: "Facturas/leerTodos",
                    dataType: "json",
                    type: "POST"
                }      
            }
        }
    });


});

$(".k-grid-content tr").live('click', function () {
    alert("Has pulsado en una fila);
});