$(document).ready(function () {

    var idConvenio = null;
    var datasourcecon = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Convenios/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idConvenio"
             }
        }
    });

    $("#ConveniosGrid").kendoGrid //Creo el kendo Grid
    ({
        dataSource: datasourcecon,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        groupable: true,
        columns: [
            {
                field: "NombreEmpre",
                title: "Nombre Empresa"
            },
            {
                field: "Descripcion",
                title: "Descripción Oferta",
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
                command: { text: "Editar", className: "botonEditarFilaConvenio" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFilaConvenio" }
            }
        ]

    });

    $("#ConveniosNav").live("click", function () {  //Actualiza los datos al pulsar en su pestaña.
        datasourcecon.read();
    });

});