
$(document).ready(function (){

   $("#EmpresasIndexGrid").kendoGrid
   ({
        height: 400,
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
        ],
        dataSource:
        {
            transport:
            {
                read: 
                {
                    url: "",
                    datatype: "json",
                    type: "POST"
                }
            }
        }
   });      
  



    
}