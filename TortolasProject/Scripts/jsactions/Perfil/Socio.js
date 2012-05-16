$(document).ready(function () {

    // Ocultamos todos los divs (aun no sabemos si es socio o no)
    $("#esSocio").hide();
    $("#noEsSocio").hide();
    $("#motivoBaja").hide();
    $("#renovacionSocio").hide();
    $("#altaSocio").hide();
    $("#pagoPaypal").hide();
    $("#textoAlta").hide();

    // Nos traemos algunos datos administrativos como las cuotas y las altas
    var cuotas = null;

    $.ajax({
        url: "Perfil/cuotas",
        type: "POST",
        success: function (cuotasRespuesta) {
            cuotas = cuotasRespuesta;
        },
        async: false
    });

    // Comprobamos si el usuario logueado es Socio
    $.ajax({
        url: "Perfil/socioDeUsuario",
        type: "POST",
        success: function (socio) {
            // Sino es Socio
            if (socio.length == 0) {
                $("#noEsSocio").show();

            }
            // Si es Socio
            else {
                $("#esSocio").show();

                // IMPORTANTE : REVISAR EL CAMPO ESTADO
                // Comprobamos su estado
                // "Activo" : el socio ha pagado sus cuotas y esta activo
                // "Inactivo" : el socio existe pero esta inactivo, quiere decir que no esta de baja pero no ha pagado las cuotas
                // "Baja" :  el socio ha sido dado de baja y tendra que solicitar un nueva alta
                // "Pendiente" : el socio ha pagado la mensualidad y esta a la espera de que se le dé de alta

                // Cargamos los datos del carnet
                $("#fotoCarnet img").attr("src", socio.Foto);
                $("#carnetNumeroSocio").append("  " + socio.NumeroSocio);
                $("#carnetFechaAlta").append("  " + socio.FechaAlta + "      Fecha Expiracion : " + socio.FechaExpiracion);
                $("#carnetNombre").append("  " + socio.Nombre);
                $("#carnetApellidos").append("  " + socio.Apellidos);
                $("#carnetDNI").append("  " + socio.DNI);
                $("#estadoSubscripcion").append(socio.Estado);

                // Rellenamos las tablas con los datos de la Base de Datos
                $(".columnaMensual").text("* " + cuotas["Mensual"] + " €");
                $(".columnaTrimestral").text("* " + cuotas["Trimestral"] + " €");
                $(".columnaAnual").text("* " + cuotas["Anual"] + " €");
                $(".columnaAlta").text("* " + cuotas["Alta"] + " €");

                // Descuento en la cuotas por meses ( Si realiza un abono de X meses recibira un Y %/€ de descuento ) 
                var tipoDescuento = null;
                if (cuotas["DescuentoTipo"] == "Porcentaje")
                    tipoDescuento = "%";
                else
                    tipoDescuento = "€";

                $("#descuentoCuotas").html("** Si compra un abono de <font color='green'> " + cuotas["DescuentoMeses"] + "</font> o mas meses recibira un <font color='green'>" + cuotas["DescuentoPrecio"] + " " + tipoDescuento + " de descuento</font>");

                // Inicializamos las fechas de renovacion y expiracion al dia de hoy y el importe
                $("#fechaRenovacionNueva").text(hoy());
                $("#fechaExpiracionNueva").text(calcularFechas("sumar", 1));
                var importeInicial = calcularImporteCuotas(1);
                $("#importeNuevo").text(importeInicial);
                $("#importeIVA").text((importeInicial * 18) / 100);
                $("#importeTotal").text(importeInicial + ((importeInicial * 18) / 100));
                $("#importeAlta").text(cuotas["Alta"]);
                $("#IVAAlta").text(((cuotas["Alta"] * 18) / 100));
                $("#importeTotalAlta").text( cuotas["Alta"] +  ((cuotas["Alta"] * 18) / 100)  );

                // Combo para cuotas predeterminadas
                $("#comboCuota").kendoDropDownList({
                    dataTextField: "nombre",
                    dataValueField: "valor",
                    dataSource: {
                        data: [
                                {
                                    nombre: "Mensual", valor: 1
                                },
                                {
                                    nombre: "Trimestral", valor: 3
                                },
                                {
                                    nombre: "Anual", valor: 12
                                }
                        ]
                    },
                    change: function () {
                        cambioPreFactura(this.value());
                    }
                });

                // Numeric text box para eleccion de cuota personalizada
                $("#numberCuotaCustom").kendoNumericTextBox({
                    format: "g",
                    min: 1,
                    value: 1,
                    change: function () {
                        cambioPreFactura(this.value());
                    },
                    spin: function () {
                        cambioPreFactura(this.value());
                    }
                });
                $("#cuotasCustom").hide(); ;        // Lo ocultamos por predeterminado

                // Checkbox de eleccion por opciones predeterminadas o meses concretos
                $("#checkCustom").change(function () {
                    $(".eleccionCuotas").toggle();
                });

                // ComboBox de las formas de Pago (Paypal, cuenta bancaria, tarjeta bancaria)
                $("#formaDePago").kendoDropDownList({
                    dataTextField: "nombre",
                    dataValueFIeld: "valor",
                    dataSource: {
                        data: [
                                    {
                                        nombre: "Tarjeta de Credito", valor: "Tarjeta"
                                    },
                                    {
                                        nombre: "PayPal", valor: "PayPal"
                                    }
                        ]
                    },
                    change: cambioFormaPago
                });

                // Segun el estado en que se encuentre el socio, aparecera una vista u otra.
                if (socio.Estado == "Activo") {
                    $("#mensajeExpiracion").html("El dia de expiracion de su subscripcion de Socio en MTB es <font color='green'>" + socio.FechaExpiracion + " </font>");
                    $("#renovacionSocio").show();
                    $("#tituloRenovacion").html("<h3>Renovacion de Socio</h3>");
                }
                else if (socio.Estado == "Inactivo") {
                    $("#mensajeExpiracion").html("Su subscripcion expiro el dia <font color='red'>" + socio.FechaExpiracion + " cucu</font>.<br> Para volver a volver a estar activo debe renovar su subscripcion, para ello debe pagar la cuota mensual, trimestral o anual.");
                    $("#renovacionSocio").show();
                    $("#tituloRenovacion").html("<h3>Renovacion de Socio</h3>");
                }
                else if (socio.Estado == "Baja") {
                    $("#mensajeExpiracion").html("Usted ha sido dado de baja por no cumplir alguna de las normativas obligatorias para los socios. El dia que fue dado de alto fue : <font color='red'>" + socio.FechaBaja + "</font>");
                    $("#motivoBaja").append("  " + socio.MotivosBaja);
                    $("#motivoBaja").show();
                    $("#renovacionSocio").show();
                    $("#textoAlta").show();
                    $("#tituloRenovacion").html("<h3>Alta y Renovacion de Socio</h3>");
                    //$("#altaSocio").show();
                }
                else if (socio.Estado == "Pendiente") {
                    $("#mensajeExpiracion").html("Su solicitud de renovacion esta en tramites, pronto su estado estara activo.");
                }
            }
        },
        async: false
    });



    // Funcion comun para el combo y el number
    function cambioPreFactura(cantidad) {
        var fechaExpiracion = calcularFechas("sumar", cantidad);
        var importePuro = calcularImporteCuotas(cantidad);
        $("#fechaExpiracionNueva").text((fechaExpiracion));
        $("#importeNuevo").text(importePuro);
        $("#importeIVA").text((importePuro * 18) / 100);
        $("#importeTotal").text(importePuro + ((importePuro * 18) / 100));
    }

    // Funcion para el cambio de forma de pago
    function cambioFormaPago() {
        var opcion = $("#formaDePago").data("kendoDropDownList").value();
        $(".formasDePago").toggle();
    }

    // Funcion para calcular la fecha de expiracion por ejemplo, daremos por hecho que siempre seran meses
    function calcularFechas(operacion, cantidad) {
        // Calculamos un mes en milisegundos (Suponemos que todos los meses tienen 31 dias)
        var mes = (31 * 24 * 3600 * 1000);
        var today = new Date();
        if (operacion == "sumar")
            return fechaAString(new Date(today.getTime() + (cantidad * mes)));
        else
            return fechaAString(new Date(today.getTime() - (cantidad * mes)));
    }

    // Funcion para calcular el importe de las cuotas (sin el alta)
    function calcularImporteCuotas(cantidad) {
        var importe = null;
        // Si el numero de meses es igual o mayor al descuento se lo aplicamos
        if (cantidad >= cuotas["DescuentoMeses"]) {
            if (cuotas["DescuentoTipo"] == "Porcentaje") {    // Detectamos que tipo de descuento es
                importe = (cantidad * cuotas["Mensual"]) - ((cantidad * cuotas["DescuentoPrecio"]) / 100);
            }
            else {
                importe = (cantidad * cuotas["Mensual"]) - cuotas["DescuentoPrecio"];
            }
        }
        // Sin descuento
        else {
            importe = (cantidad * cuotas["Mensual"]);
        }

        return importe;
    }

    // Funcion para mostrar la fecha de hoy
    function hoy() {
        var fechaActual = new Date();

        dia = fechaActual.getDate();
        mes = fechaActual.getMonth() + 1;
        anno = fechaActual.getFullYear();


        if (dia < 10) dia = "0" + dia;
        if (mes < 10) mes = "0" + mes;

        fechaHoy = dia + "/" + mes + "/" + anno;

        return fechaHoy;
    }

    function fechaAString(fecha) {
        dia = fecha.getDate();
        mes = fecha.getMonth() + 1;
        anno = fecha.getFullYear();


        if (dia < 10) dia = "0" + dia;
        if (mes < 10) mes = "0" + mes;

        fechaString = dia + "/" + mes + "/" + anno;

        return fechaString;
    }



    // Zona de carga de Qtips

    setTimeout(cargarQtipsSocio, 2000);

    function cargarQtipsSocio() {
        $("#cvv2parrafo").qtip({
            content: {
                text: "<img src='../../Content/images/cvv2.png' /><br>Es un codigo de tres cifras impreso en el reverso de las tarjetas Visa o MasterCard. Este numero aparece en cursiva en la parte superior del panel de firma (ver imagen)"
            },
            position: {
                my: "bottom left"
            }
        });
    }
});