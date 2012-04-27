$(document).ready(function () {

    var idMonitor = null;

    var dataSourceMonitores = new kendo.data.DataSource({
        transport: {
            type: "json",
            read: {
                url: "Monitores/obtenerTodos",
                type: "POST",
                dataType: "json"
            },
            pageSize: 10
        }
    });

    var wnd = $("#editarfila")
                        .kendoWindow({
                            title: "Editar",
                            modal: true,
                            visible: false,
                            resizable: false,
                            scrollable: false,
                            movable: false,
                            width: 500,
                            height: 300
                        }).data("kendoWindow");

    var ventanaCrear = $("#crearMonitor")
                        .kendoWindow({
                            title: "Crear",
                            modal: true,
                            visible: false,
                            resizable: false,
                            scrollable: false,
                            movable: false,
                            width: 500,
                            height: 300
                        }).data("kendoWindow");


    $("#monitoresGrid").kendoGrid({
        dataSource: dataSourceMonitores,
        pageable: true,        
        sortable: true,    
        selectable: true,               
        scrollable:false, 
        toolbar: kendo.template($("#templateToolbarMonitor").html()),
        height: 200,
        columns: [
                    {
                        field: "nombre",
                        title: "Nombre"

                    },
                    {
                        field: "dni",
                        title: "DNI"
                    },
                    {
                        field: "apellidos",
                        title: "Apellidos"
                    },
                    {
                        field: "email",
                        title: "Email"
                    },
                    {
                        field: "direccion",
                        title: "Direccion"
                    },
                    {
                        field: "telefono",
                        title: "Telefono"
                    },
                    {
                        command: { text: "editar", className: "editarfila" }
                    },
                    {
                        command: { text: "eliminar", className: "eliminarfila" }
                    }
            ]
    });

    $("#subirFoto").kendoUpload({
        async: {
            saveUrl: "Monitores/subir",
            // removeUrl: '@Url.Action("Remove", "Home")',
            autoUpload: true,            
        },
        showFileList: false,       
        localization: {
            "select":"Seleccionar"
        },
        upload: subido

    });

     $(".uploader").kendoUpload({
        async: {
            saveUrl: "Monitores/subir",
            // removeUrl: '@Url.Action("Remove", "Home")',
            autoUpload: true,            
        },
        showFileList: false,       
        localization: {
            "select":"Seleccionar"
        },
        upload: subido

    });

    function subido(e){
        
        var archivo = e.files;
        var nombreArchivo = archivo[0].name;        
        cambiarImagen(nombreArchivo);       
       
    }

    function cambiarImagen(nombre){

         $("#fotoMonitorNuevo").attr("src","/Content/images/Monitores/"+nombre);
         $("#fotoMonitor").attr("src","/Content/images/Monitores/"+nombre);
    }

    // ----------- FUNCIONES Y TRIGGERS --------------//

    // Boton de editar dentro de la tabla
    // Despliegue de ventana e inicializacion de formulario

    $(".editarfila").live("click", function () {

        var fila = $("#monitoresGrid").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#monitoresGrid").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
        idMonitor = dataSourceMonitores.getByUid(fila.attr("data-uid")).idMonitor;          // Obtenemos el idMonitor seleccionado
        foto = dataSourceMonitores.getByUid(fila.attr("data-uid")).foto;

        // Inicializamos los campos del formulario
        $("#nombreedit").val(filaJson.nombre);
        $("#apellidosedit").val(filaJson.apellidos);
        $("#dniedit").val(filaJson.dni);
        $("#direccionedit").val(filaJson.direccion);
        $("#emailedit").val(filaJson.email);
        $("#telefonoedit").val(filaJson.telefono);
       
        
        if(foto!=null){
            $("#fotoMonitor").attr("src","/Content/images/Monitores/"+foto);
        }
        else{
            $("#fotoMonitor").attr("src","/Content/images/Monitores/chucknorris.jpg");
        }

        // Centramos y abrimos la ventana
        wnd.center();
        wnd.open();

    });

    // Boton de confirmacion de edicion de campos
    $("#botonEditar").click(function () {

        var arrayEnviar = {};

        // Obtenemos los campos
        arrayEnviar["nombre"] = $("#nombreedit").val();
        arrayEnviar["apellidos"] = $("#apellidosedit").val();
        arrayEnviar["dni"] = $("#dniedit").val();
        arrayEnviar["direccion"] = $("#direccionedit").val();
        arrayEnviar["email"] = $("#emailedit").val();
        arrayEnviar["telefono"] = $("#telefonoedit").val();
        arrayEnviar["idMonitor"] = idMonitor;
        var url = $("#fotoMonitor").attr("src").split("/");
        arrayEnviar["foto"] = url[4];
        
        $.ajax(                                         // Enviamos a databasequery los datos
                {
                url: "Monitores/editar",
                type: "POST",
                data: arrayEnviar,
                success: function () {
                    dataSourceMonitores.read();
                    wnd.close();
                },
                async: false
            });
    });

    // Boton de Eliminacion de la fila
    $(".eliminarfila").live("click", function () {
        
        var fila = $("#monitoresGrid").data("kendoGrid").select();          // Cogemos la fila seleccionada
        var filaJson = $("#monitoresGrid").data("kendoGrid").dataItem(fila).toJSON();       // La pasamos a JSON
        idMonitor = dataSourceMonitores.getByUid(fila.attr("data-uid")).idMonitor;          // Obtenemos el idMonitor seleccionado

        var nombre = filaJson.nombre;
        var apellidos = filaJson.apellidos;

        if(confirm("¿Estas seguro de que desea eliminar a "+nombre+" "+apellidos+"?")){
            $.post("Monitores/eliminar",{ idMonitor:idMonitor },function(data){                
                dataSourceMonitores.read();
            });
        }   
    });

    // Boton de Nuevo Monitor - Mostrar formulario
    $("#nuevoMonitorToolbar").click(function(){
               
        // Inicializamos los campos del formulario
        $("#nombrenuevo").val("");
        $("#apellidosnuevo").val("");
        $("#dninuevo").val("");
        $("#direccionnuevo").val("");
        $("#emailnuevo").val("");
        $("#telefononuevo").val("");
        $("#fotoMonitor").attr("src","/Content/images/Monitores/chucknorris.jpg");
        ventanaCrear.center();
        ventanaCrear.open();        
           
    });

    // Boton de confirmacion de creacion
    $("#botonCrear").click(function(){
    
        var arrayEnviar = {};

        // Obtenemos los campos
        arrayEnviar["nombre"] = $("#nombrenuevo").val();
        arrayEnviar["apellidos"] = $("#apellidosnuevo").val();
        arrayEnviar["dni"] = $("#dninuevo").val();
        arrayEnviar["direccion"] = $("#direccionnuevo").val();
        arrayEnviar["email"] = $("#emailnuevo").val();
        arrayEnviar["telefono"] = $("#telefononuevo").val();        
        var url = $("#fotoMonitorNuevo").attr("src").split("/");
        arrayEnviar["foto"] = url[5];
        
        $.ajax(                                         // Enviamos a databasequery los datos
                {
                url: "Monitores/crear",
                type: "POST",
                data: arrayEnviar,
                success: function () {
                    dataSourceMonitores.read();
                    ventanaCrear.close();
                },
                async: false
            });
    });


    

    $(".cancelar").live("click", function () {
   
        wnd.close();
        ventanaCrear.close();   
    });




});