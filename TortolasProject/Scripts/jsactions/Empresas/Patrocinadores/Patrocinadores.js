$(document).ready(function () {

    var idPatrocinador = null;
    var datasourcepat = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Patrocinadores/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idPatrocinador"
             }
        }
    });

    $("#PatrocinadoresGrid").kendoGrid //Creo el kendo Grid
    ({
        //height: 400,
        dataSource: datasourcepat,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        columns: [
            {
                field: "NombrePatrocinador",
                title: "Nombre"
            },
            {
                field: "CIFEmpresaPat",
                title: "CIF"
            },
            {
                field: "LocalizacionP",
                title: "Localización Publicidad",
                filterable: {
                    extra: false, //do not show extra filters
                    operators: { // redefine the string operators
                        string: {
                            eq: "Es igual a...",
                            neq: "No es igual a...",
                            startswith: "Empieza por...",
                            contains: "Contiene"
                        }
                    }
                }
            },
            {
                title: "Editar",
                command: { text: "Editar", className: "botonEditarFilaPatrocinador" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFilaPatrocinador" }
            }
        ]

        });

        // VENTANAS (POP-UP) //

        //Editar//

        var weditarPatrocinador = $("#VentanaEditarPatrocinador")
        .kendoWindow
        ({
            title: "Editar Patrocinador",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

        // Eliminar //

        var weliminarPatrocinador = $("#VentanaEliminarPatrocinador")
        .kendoWindow
        ({
            title: "Eliminar Patrocinador",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

        // Crear //

        var wcrearPatrocinador = $("#VentanaCrearPatrocinador")
        .kendoWindow
        ({
            title: "Crear Patrocinador",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");

        $("#PatrocinadoresNav").live("click", function () {  //Actualiza los datos al pulsar en su pestaña.
        datasourcepat.read();
    });

    
});