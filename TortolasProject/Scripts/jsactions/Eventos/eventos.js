$(document).ready(function () {
    var tablaevento = $("#Eventostabla").kendoGrid({
        dataSource: {
            data: [{ Titulo: "hola", Lugar: "hola", Fecha:"lol", Plazas: "lol", }]
            
        
    },
    toolbar:kendo.template($("#templateToolbarEvento").html()),
    sortable: true,
    pageable: true,
    columns: [
                    {
                        field: "Titulo",
                        text: "Nombrecilo"
                    },
                    {
                        field: "Lugar",
                        text: "apellidos del señor"
                    },
                    {
                        field: "Fecha",
                        text: "apellidos del señor"
                    },
                    {
                        field: "Plazas",
                        text: "apellidos del señor"
                    }
        ],
    detailTemplate: kendo.template($("#template").html()),
    detailInit: inicializarDetalles

});

function inicializarDetalles() {

    $(".detallesEventosPestanas").kendoTabStrip({
        dataTextField: "text",
        dataContentField: "content",
        dataSource:
        [
            { text: "Tab 1", content: "<div class='detallesEventosTabla'></div>Tab 1 content", encoded: false },
            { text: "Tab 2", content: "Tab 2 content", encoded: false }
        ]
    });

    var datatabla = [{ name: "hola", apellidos: "cucu"}];
    $(".detallesEventosTabla").kendoGrid({
        dataSource: {
            data: datatabla
        },
        columns: [
                {
                    field: "name",
                    text: "nombrecillorl"
                },
                {
                    field: "apellidos",
                    text: "apellidos del señor"
                }
            ]
    });
}

});