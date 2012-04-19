$(document).ready(function () {


    var wnd = $("#editarfila")
                        .kendoWindow({
                            title: "Editar",
                            modal: true,
                            visible: false,
                            resizable: false,
                            width: 600,
                            height: 400
                        }).data("kendoWindow");


    $(".editarfila").live("click", function () {

        var fila = $("#kendoGrid").find("tbody tr.k-state-selected");
        var filaJson = $("#kendoGrid").data("kendoGrid").dataItem(fila).toJSON();
        
        $("#nombreedit").val(filaJson.nombre);
        $("#apellidosedit").val(filaJson.apellidos);
        
        wnd.center();
        wnd.open();       
         
        
    });

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
                        field: "email",
                        title: "Email"
                    },
                    {                       
                        command: { text: "editar", className: "editarfila" },
                        
                    }
            ]
    });




});