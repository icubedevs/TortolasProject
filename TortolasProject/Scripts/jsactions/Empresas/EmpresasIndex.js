
$(document).ready(function (){
    //alert("poya");
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
                id: "CIF"
             }
        }
   });

   $("#EmpresasGrid").kendoGrid
   ({
        //height: 400,
        dataSource : datasource, 
        selectable : true,
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

   $(".botonEditarFila").live("click", function()
   {
        
        var fila = $("#EmpresasGrid").find("tbody tr.k-state-selected");
        
        var filajson = $("#EmpresasGrid").data("kendoGrid").dataItem(fila).toJSON();
        
        //alert("df");
        $("#nombreempresa").val(filajson.Nombre);
        //$("#nombreempresa").val(filajson.Nombre);
        
        weditar.center();
        
        weditar.open();
   });



    
});