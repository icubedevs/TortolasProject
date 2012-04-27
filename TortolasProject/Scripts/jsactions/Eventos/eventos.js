$(document).ready(function () {

    var idEvento = null;
    var datasource = new kendo.data.DataSource
    ({
        transport:
        {
            read:
            {
                url: "Eventos/LeerTodos",
                datatype: "json",
                type: "POST"
            }
        },
        schema:
        {
            model:
            {
                id: "idEvento"
            }
        }
    });
    var tablaevento = $("#Eventostabla").kendoGrid({
        dataSource: datasource,
        toolbar: kendo.template($("#templateToolbarEvento").html()),
        sortable: true,
        pageable: true,
        selectable: true,
        columns: [
                    {
                        field: "Titulo",
                        text: "Titulo"
                    },
                    {
                        field: "Lugar",
                        text: "Lugar"
                    },
                    {
                        field: "FechaRealizacion",
                        text: "Fecha"
                    },
                    {
                        field: "Plazas",
                        text: "Plazas"
                    },
                    {
                        title: "Herramientas",
                        command: { text: "Editar", className: "botonEditarFila" }
                    }
        ],
        detailTemplate: kendo.template($("#template").html()),
        detailInit: inicializarDetalles
    });

    var windowEditar = $("#VentanaEditar").kendoWindow
    ({
        title: "Editar",
        modal: true,
        visible: false,
        resizable: false
    }).data("kendoWindow");



    // ..........................FUNCIONES..............................

    $("#editor").kendoEditor();
    var valoresComboPrioridad = [
                        { texto: "Si", valor: true },
                        { texto: "No", valor: false }

                    ];

    $("#PrioridadSocios").kendoDropDownList({
        dataTextField: "texto",
        dataValueField: "valor",
        dataSource: valoresComboPrioridad
    });

    $(".botonEditarFila").live("click", function () {

        var fila = $("#Eventostabla").find("tbody tr.k-state-selected");

        var filajson = $("#Eventostabla").data("kendoGrid").dataItem(fila).toJSON();
        idEvento = datasource.getByUid(fila.attr("data-uid")).idEvento;

        $("#Titulo").val(filajson.Titulo);
        $("#Lugar").val(filajson.Lugar);
        $("#FechaRealizacion").val(filajson.FechaRealizacion);
        $("#FechaAperturaInscrip").val(filajson.FechaAperturaInscripcion);
        $("#FechaLimiteInscrip").val(filajson.FechaLimiteInscripcion);
        $("#Plazas").val(filajson.Plazas);

+

        $("#PrioridadSocios").data("kendoDropDownList").value((filajson.PrioridadSocios));
        $("#editor").data("kendoEditor").value((filajson.Actividad));

        windowEditar.center();
        windowEditar.open();
    });

    $("#BotonCancelarVentanaEditar").live("click", function () {
        windowEditar.close();
    });

    $("#BotonAceptarVentanaEditar").click(function () {
        var datos = {};

        datos["TituloUpdate"] = $("#Titulo").val();
        datos["LugarUpdate"] = $("#Lugar").val();
        datos["FechaRealizacionUpdate"] = $("#FechaRealizacion").val();
        datos["FechaAperturaInscripUpdate"] = $("#FechaAperturaInscrip").val();
        datos["FechaLimiteInscripUpdate"] = $("#FechaLimiteInscrip").val();
        datos["PlazasUpdate"] = $("#Plazas").val();
        datos["PrioridadSociosUpdate"] = $("#PrioridadSocios").val();
        datos["ActividadUpdate"] = $("#editor").data("kendoEditor").value();
        datos["idEvento"] = idEvento;

        $.ajax(
        {
            url: "Eventos/UpdateEvento",
            type: "POST",
            data: datos,
            success: function () {
                datasource.read();
                windowEditar.close();
            }
        });
    });


    function inicializarDetalles(e) {

        var detailRow = e.detailRow;

        detailRow.find(".detallesEventosPestanas").kendoTabStrip({
            animation: {
                open: { effects: "fadeIn" }
            }
        });





    }

});