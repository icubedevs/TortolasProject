$(document).ready(function () {
    $("#ButtonPulsa").click(function () {
        $.ajax({
            type: "POST",
            url: "Facturas/Prueba",
            data: { nombre: "dani", coche: "Twingo" }
        }).success(function (data) {          
            $("#divPruebaAjax").append("<p>"+data+"</p>");
        });
    });
});