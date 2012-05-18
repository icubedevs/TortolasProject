

$(document).ready(function () {

    // Variable donde guardamos los datos del usuario actual
    var infoUsuarioGlobal = null;

    // Inicializamos el validador
    var validadorInfoUsuario = $(".infoUsuarioActualizable").kendoValidator({
        messages: {                        
            required: "Este campo es obligatorio"             
           
        }
    }).data("kendoValidator");

    // Obtenemos los datos 

    $.ajax({
        url: "Perfil/informacionUsuario",
        type: "POST",
        success: function (infoUsuario) {

            // Inicializamos los campos especiales de Kendo
            infoUsuarioGlobal = infoUsuario;

            var fechaACachos = infoUsuario.FechaNacimiento.split("/");
            var diaNacimiento = fechaACachos[0];
            var mesNacimiento = fechaACachos[1];
            var annoNacimiento = fechaACachos[2].split(" ")[0];

            // Los meto a mano porque esto me esta dando más probelamas de los que deberia y "pazo" , asi se quea
            var i = 0;
            var k = 1900;
            var dias = [];

            for (i = 1; i <= 31; i++) {
                dias.push({ valor: i, texto: i });
            }

            var meses = [
                            { texto: "Enero", valor: "01" }, { texto: "Febrero", valor: "02" }, { texto: "Marzo", valor: "03" },
                            { texto: "Abril", valor: "04" }, { texto: "Mayo", valor: "05" }, { texto: "Junio", valor: "06" },
                            { texto: "Julio", valor: "07" }, { texto: "Agosto", valor: "08" }, { texto: "Septiembre", valor: "09" },
                            { texto: "Octubre", valor: "10" }, { texto: "Noviembre", valor: "11" }, { texto: "Diciembre", valor: "12" }
                        ];
            
            var anios = [];
            for (k = 2012; k >= 1900; k--) {
                anios.push({ valor: k, texto: k });
            }

            $("#diaPicker").width(65);
            $("#mesPicker").width(100);
            $("#annoPicker").width(80);

            $("#diaPicker").kendoDropDownList({
                dataValueField: "valor",
                dataTextField: "texto",
                dataSource: dias
            });

            $("#mesPicker").kendoDropDownList({
                dataValueField: "valor",
                dataTextField: "texto",
                dataSource: meses
            });

            $("#annoPicker").kendoDropDownList({
                dataValueField: "valor",
                dataTextField: "texto",
                dataSource: anios
            });

            $("#infoSexo").kendoDropDownList({
                dataTextField: "nombre",
                dataValueField: "valor",
                dataSource: [
                                { nombre: "Hombre", valor: "Hombre" },
                                { nombre: "Mujer", valor: "Mujer" }
                            ]
            });


            $("#infoNacionalidad").kendoDropDownList();
            $("#infoProvincia").kendoDropDownList({
                dataTextField: "texto",
                dataValueField: "valor",
                dataSource: [
                                    { texto: "Alava", valor: "Alava" }, { texto: "Albacete", valor: "Albacete" }, { texto: "Alicante", valor: "Alicante" }, { texto: "Almeria", valor: "Almeria" },
                                    { texto: "Asturias", valor: "Asturias" }, { texto: "Avila", valor: "Avila" }, { texto: "Badajoz", valor: "Barcelona" }, { texto: "Burgos", valor: "Burgos" },
                                    { texto: "Caceres", valor: "Caceres" }, { texto: "Cadiz", valor: "Cadiz" }, { texto: "Cantabria", valor: "Cantabria" }, { texto: "Castellon", valor: "Castellon" },
                                    { texto: "Ciudad Real", valor: "Ciudad Real" }, { texto: "Cordoba", valor: "Cordoba" }, { texto: "La Coruna", valor: "La Coruna" }, { texto: "Cuenca", valor: "Cuenca" },
                                    { texto: "Gerona", valor: "Gerona" }, { texto: "Granada", valor: "Granada" }, { texto: "Guadalajara", valor: "Guadalajara" }, { texto: "Guipuzcoa", valor: "Guipuzcoa" },
                                    { texto: "Huelva", valor: "Huelva" }, { texto: "Huesca", valor: "Huesca" }, { texto: "Islas Baleares", valor: "Islas Baleares" }, { texto: "Jaen", valor: "Jaen" },
                                    { texto: "Leon", valor: "Leon" }, { texto: "Lerida", valor: "Lerida" }, { texto: "Lugo", valor: "Lugo" }, { texto: "Madrid", valor: "Madrid" },
                                    { texto: "Malaga", valor: "Malaga" }, { texto: "Murcia", valor: "Murcia" }, { texto: "Navarra", valor: "Navarra" }, { texto: "Orense", valor: "Orense" },
                                    { texto: "Palencia", valor: "Palencia" }, { texto: "Las Palmas", valor: "Las Palmas" }, { texto: "Pontevedra", valor: "Pontevedra" }, { texto: "La Rioja", valor: "La Rioja" },
                                    { texto: "Salamanca", valor: "Salamanca" }, { texto: "Segovia", valor: "Segovia" }, { texto: "Sevilla", valor: "Sevilla" }, { texto: "Soria", valor: "Soria" },
                                    { texto: "Tarragona", valor: "Tarragona" }, { texto: "Santa Cruz de Tenerife", valor: "Santa Cruz de Tenerife" }, { texto: "Teruel", valor: "Teruel" }, { texto: "Toledo", valor: "Toledo" },
                                    { texto: "Valencia", valor: "Valencia" }, { texto: "Valladolid", valor: "Valladolid" }, { texto: "Vizcaya", valor: "Vizcaya" }, { texto: "Zamora", valor: "Zamora" },
                                    { texto: "Zaragoza", valor: "Zaragoza" }
                ]
            });

            setTimeout(asignarValoresUsuario(diaNacimiento, mesNacimiento, annoNacimiento), 4000);

            $("#subirAvatar").kendoUpload({
                    async: {
                        saveUrl: "Perfil/subirAvatar",
                        // removeUrl: '@Url.Action("Remove", "Home")',
                        autoUpload: true,            
                    },
                    showFileList: false,       
                    localization: {
                        "select":"Seleccionar"
                    },
                    upload: subido

                });

        }
    });

    function subido(e){
        
        var archivo = e.files;
        var nombreArchivo = archivo[0].name;        
        setTimeout(cambiarImagen(nombreArchivo),3000);       
       
    }

     function cambiarImagen(nombre){

         $("#avatar").attr("src","/Content/images/usuarios/"+nombre);
         
    }

    function asignarValoresUsuario(dia, mes, anno) {

        // Asignamos valores del usuario actuales
        $("#infoNombre").val(infoUsuarioGlobal.Nombre);
        $("#infoApellidos").val(infoUsuarioGlobal.Apellidos);
        $("#infoDireccion").val(infoUsuarioGlobal.Direccion);
        $("#infoDNI").val(infoUsuarioGlobal.DNI);
        $("#diaPicker").data("kendoDropDownList").select(function (dataItem) {
            return dataItem.texto == dia;
        });
        $("#mesPicker").data("kendoDropDownList").select(function (dataItem) {
            return dataItem.valor == mes;
        });
        $("#annoPicker").data("kendoDropDownList").select(function (dataItem) {            
            return dataItem.valor == anno;
        });
        $("#infoSexo").data("kendoDropDownList").select(function (dataItem) {
            return dataItem.text === infoUsuarioGlobal.Sexo;
        });
        $("#infoNacionalidad").data("kendoDropDownList").select(function (dataItem) {
            return dataItem.text === infoUsuarioGlobal.Nacionalidad;
        });
        $("#infoProvincia").data("kendoDropDownList").select(function (dataItem) {
            return dataItem.texto === infoUsuarioGlobal.Provincia;
        });
        $("#infoLocalidad").val(infoUsuarioGlobal.Localidad);
        $("#infoTelefono").val(infoUsuarioGlobal.Telefono);
        $("#infoSitioWeb").val(infoUsuarioGlobal.SitioWeb);
        $("#infoFacebook").val(infoUsuarioGlobal.Facebook);
        $("#infoTwitter").val(infoUsuarioGlobal.Twitter);
        $("#infoGooglePlus").val(infoUsuarioGlobal.GooglePlus);
        $("#infoSkype").val(infoUsuarioGlobal.Skype);
        $("#infoAficiones").val(infoUsuarioGlobal.Aficiones);
        $("#infoExperiencias").val(infoUsuarioGlobal.Experiencias);
        $("#infoNickname").val(infoUsuarioGlobal.Nickname);
        $("#infoEmail").val(infoUsuarioGlobal.Email);
        if(infoUsuarioGlobal.Avatar!=null)
            $("#avatar").attr("src",infoUsuarioGlobal.Avatar);
    }

    // Trigger del boton de salvar cambios
    $("#salvarCambiosInfoUsuario").click(function(){
    
    // Comprobamos que los campos esten correctos
    if(validadorInfoUsuario.validate()){
     
        var aEnviar = {};
        // Recogemos los datos a enviar para los cambios
        aEnviar["Nombre"]= $("#infoNombre").val();
        aEnviar["Apellidos"]= $("#infoApellidos").val();                       
        aEnviar["Direccion"]= $("#infoDireccion").val();                               
        aEnviar["DNI"]= $("#infoDNI").val();                              
        aEnviar["FechaNacimiento"] = $("#diaPicker").data("kendoDropDownList").value() + "/" + $("#mesPicker").data("kendoDropDownList").value() + "/" + $("#annoPicker").data("kendoDropDownList").value();        
        aEnviar["Sexo"]= $("#infoSexo").val();
        aEnviar["Nacionalidad"]= $("#infoNacionalidad").val();
        aEnviar["Provincia"]= $("#infoProvincia").val();
        aEnviar["Localidad"]= $("#infoLocalidad").val();
        aEnviar["Telefono"]= $("#infoTelefono").val();
        aEnviar["SitioWeb"]= $("#infoSitioWeb").val();
        aEnviar["Facebook"]= $("#infoFacebook").val();
        aEnviar["Twitter"]= $("#infoTwitter").val();
        aEnviar["GooglePlus"]= $("#infoGlooglePlus").val();
        aEnviar["Skype"]= $("#infoSkype").val();
        aEnviar["Aficiones"]= $("#infoAficiones").val();
        aEnviar["Experiencias"]= $("#infoExperiencias").val();
        aEnviar["Avatar"]= $("#avatar").attr("src");

        // Actualizamos los datos en la BD (llamamos a Controlador por AJAX, o todopoderoso entre las librerias ven a mi y comparte tu poder conmigo)
        $.ajax({
            url: "Perfil/actualizarInfoUsuario",
            type: "POST",
            data: aEnviar,
            success: function (infoUsuario) {
            },
            async:false
        });
       }        
       
    });

    // Lanzamos lso qTips
    setTimeout(cargarQtipsInformacion,2000);

    // Zona para los qTips
    function cargarQtipsInformacion(){
    
    $("#infoNickname").qtip({
            content: {
                text: "<b>Nickname</b> usado para loguearse y unico. <i>No puede cambiarse</i><br>Para modificaciones contactar con Administracion"           
            },
            position: {
                at: "right"
            }
        });

    $("#infoEmail").qtip({
            content: {
                text: "<b>Email</b> usado para loguearse y unico. <i>No puede cambiarse</i><br>Para modificaciones contactar con Administracion"           
            },
            position: {
                at: "right"
            }
        });

    $(".requerido").qtip({
            content: {
                text: "<b>Campo obligatorio</b>. No puede dejarse vacio"           
            },
            position: {
                at: "right"
            }
        });

    $("#infoDNI").qtip({
            content: {
                text: "Documento de Identificacion completo (incluir letra). Minimo 9 caracteres"           
            },
            position: {
                at: "right"
            }
        });

    $("#infoTelefono").qtip({
            content: {
                text: "Numero de contacto. Minimo 9 caracteres"           
            },
            position: {
                at: "right"
            }
        });

    $("#infoSitioWeb").qtip({
            content: {
                text: "Debe tener un formato de sitio web correcto"           
            },
            position: {
                at: "right"
            }
        });

    }
});