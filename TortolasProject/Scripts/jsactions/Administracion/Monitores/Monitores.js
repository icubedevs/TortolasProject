
$(document).ready(function () {

    /*  var dataS = new kendo.data.DataSource({
    transport: {
    type:"json",            
    read: {
    url: "Monitores/obtenerTodos",
    type: "POST",
    dataType: "json"
    },            
    pageSize: 10
    }
    });

    /*var dataPrueba = [
    {

    }
    ];*/

    $("#kendoGrid").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Monitores/obtenerTodos",
                    type: "POST",
                    dataType: "json"
                },
                pageSize: 10
            }
        },
        pageable: true,
        sortable: true,
        selectable: true,
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
                        field:"email",
                        title:"Email"
                    }
            ]
    });

});