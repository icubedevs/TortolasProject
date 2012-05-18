$(document).ready(function () {

    var idContrato = null;
    var datasourcecont = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Contratos/LeerTodos",
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

     $("#descripcionlegalcontratoeditar").kendoEditor();

     $("#ContratosGrid").kendoGrid //Creo el kendo Grid
    ({
        dataSource: datasourcecont,
        selectable: true,
        pageable: true,
        sortable: true,
        filterable: true,
        groupable: true,
        columns: [
            {
                field: "NombreEmpresa",
                title: "Nombre Empresa"
            },
            {
                field: "CIFEmpresa",
                title: "CIF Empresa",
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
                field: "FechaCreacion",
                title: "Fecha Creación"
            },
            {
                field: "FechaCaducidad",
                title: "Fecha Expiración"
            },
            {
                title: "Editar",
                command: { text: "Editar", className: "botonEditarFilaContrato" }
            },
            {
                title: "Eliminar",
                command: { text: "Eliminar", className: "botonEliminarFilaContrato" }
            }
        ]

        });

        //POP-UPs//

        //Editar//

        var weditarContrato = $("#VentanaEditarContrato")
        .kendoWindow
        ({
            title: "Editar Contrato",
            modal: true,
            visible: false,
            resizable: false,
        }).data("kendoWindow");

        // FUNCIONES //

    //Funciones: Botones del GRID//

    //Boton Editar//

    $(".botonEditarFilaContrato").live("click", function () {


        $(".NoModificable").prop('disabled', true); //Bloquea editar los campos

        var fila = $("#ContratosGrid").find("tbody tr.k-state-selected");

        var filajson = $("#ContratosGrid").data("kendoGrid").dataItem(fila).toJSON();
        idContrato = datasourcecont.getByUid(fila.attr("data-uid")).idContrato;

        $("#nombreempresaconvenioeditar").val(filajson.NombreEmpre);
        $("#cifempresaconvenio").val(filajson.CIFEmpresaC);
        $("#descconvenioeditar").val(filajson.Descripcion);

        weditarContrato.center();

        weditarContrato.open();
    });

});