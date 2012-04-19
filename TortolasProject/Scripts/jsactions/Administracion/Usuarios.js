

$(document).ready(function () {

    $("#kendoTabla").kendoGrid({
        sortable:true,
        pageable:true,
        dataSource:new kendo.data.DataSource({
            
        }),
        columns:[
                    {
                        title:"Nombre",

                    }
        
        ],
    });

});