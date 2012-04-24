
$(document).ready(function (){
    //alert("qwe");
   var datasource = new kendo.data.DataSource 
   ({
            transport:
            {
                read: 
                {
                    url: "Empresas/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
        },
        schema:
        {
             model:
             {
                id: "idEmpresa"
             }
        }
   });

   $("#EmpresasGrid").kendoGrid
   ({
        //height: 400,
        dataSource : datasource, 
        selectable : true,
        pageable : true,
        sortable : true,
        columns: [
            {
                field: "Nombre",
                title: "Nombre"
            },
            {
                field: "CIF",
                title: "CIF"
            },
            {
                field: "Localidad",
                title: "localidad"
            },
            {
                field: "DireccionWeb",
                title: "Direccion Web"
            },
            {
                field: "TelefonodeContacto",
                title: "Telefono de Contacto"
            },
            {
                field: "Email",
                title: "E-Mail"
            },
            {
                title: "Herramientas",
                command: { text: "Editar", className : "botonEditarFila"}
            },
        ],
   });      
  
   var weditar = $("#VentanaEditar")
        .kendoWindow
        ({
            title: "Editar",
            modal : true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");


    // FUNCIONES --------------------------------------------------------

   $(".botonEditarFila").live("click", function()
   {
        
        var fila = $("#EmpresasGrid").find("tbody tr.k-state-selected");
        
        var filajson = $("#EmpresasGrid").data("kendoGrid").dataItem(fila).toJSON();
        
        //alert("df");
        $("#nombreempresa").val(filajson.Nombre);
        $("#cif").val(filajson.CIF);
        $("#localidad").val(filajson.Localidad);
        $("#direccionweb").val(filajson.DireccionWeb);
        $("#telefonodecontacto").val(filajson.TelefonodeContacto);
        $("#email-c").val(filajson.Email);

        
        weditar.center();
        
        weditar.open();
   });
   $("#BotonCancelarVentanaEditar").live("click", function()
   {            
        weditar.close();
   });
   $("#BotonAceptarVentanaEditar").live("click", function()
   {
        weditar.close();
   });
   $("#BotonNuevaEmpresa").click(function () {
        $.post('Empresas/CargarVistaNuevaEmpresa', function(data) {
            $("#EmpresasHerramientasContent").hide();
            $("#EmpresasGrid").hide();
            $("#NuevaEmpresaFormulario").html(data);
            $("#NuevaEmpresaFormulario").show();
        });
   });

   $("#EmpresasNav").live("click", function () {
        $.post('Empresas/Index', function () {
            $("#EmpresasHerramientasContent").show();
            $("#EmpresasGrid").show();
            $("#NuevaEmpresaFormulario2").hide();
        });
    });


    
});