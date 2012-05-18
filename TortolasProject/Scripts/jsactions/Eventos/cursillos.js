var maxacompa;
var idCursillo = null;

$(document).ready(function () {

    var datasource = new kendo.data.DataSource
    ({
        transport:
        {
            read:
            {
                url: "Cursillos/LeerTodos",
                datatype: "json",
                type: "POST"
            }
        },
        schema:
        {
            model:
            {
                id: "idCursillo"
            }
        }
    });
    var tablacursillo = $("#Cursillostabla").kendoGrid({
        dataSource: datasource,
        toolbar: kendo.template($("#templateToolbarCursillo").html()),
        sorteable: true,
        pageable: true,
        selectable: true,
        filtreable: true,
        columns: [
                    {
                        field: "Titulo",
                        text: "Titulo",
                        filterable: {
                            extra: false, //do not show extra filters
                            operators: { // redefine the string operators
                                string: {
                                    eq: "Es igual a..",
                                    neq: "No es igual a...",
                                    startswith: "Empieza por...",
                                    contains: "Contiene"
                                }
                            }
                        }
                    },
                    {
                        field: "Lugar",
                        text: "Lugar",
                        filterable: {
                            extra: false, //do not show extra filters
                            operators: { // redefine the string operators
                                string: {
                                    eq: "Es igual a..",
                                    neq: "No es igual a...",
                                    startswith: "Empieza por...",
                                    contains: "Contiene"
                                }
                            }
                        }
                    },
                    {
                        field: "Tematica",
                        text: "Tematica",
                        filterable: {
                            extra: false, //do not show extra filters
                            operators: { // redefine the string operators
                                string: {
                                    eq: "Es igual a..",
                                    neq: "No es igual a...",
                                    startswith: "Empieza por...",
                                    contains: "Contiene"
                                }
                            }
                        }
                    },
                    {
                        field: "FechaRealizacion",
                        text: "Fecha",
                        filterable: {
                            extra: false, //do not show extra filters
                            operators: { // redefine the string operators
                                string: {
                                    eq: "Es igual a..",
                                    neq: "No es igual a...",
                                    startswith: "Empieza por...",
                                    contains: "Contiene"
                                }
                            }
                        }
                    },
                    {
                        field: "Plazas",
                        text: "Plazas",
                        filterable: {
                            extra: false, //do not show extra filters
                            operators: { // redefine the string operators
                                string: {
                                    eq: "Es igual a..",
                                    neq: "No es igual a...",
                                    startswith: "Empieza por...",
                                    contains: "Contiene"
                                }
                            }
                        }
                    },
                    {
                        title: "Herramientas",
                        width: "200px",
                        command: [{ text: "Editar", className: "botonEditarFila" }, { text: "Eliminar", className: "botonEliminarFila" }, { text: "Inscribirse", className: "botonInscripcion"}]
                    }
            ],
        detailTemplate: kendo.template($("#template").html()),
        detailInit: inicializarDetalles
    });

    //............................................VENTANAS POP-UP...............................................

    var windowEditar = $("#VentanaEditar").kendoWindow
    ({
        title: "Editar",
        modal: true,
        visible: false,
        resizable: false
    }).data("kendoWindow");

    var windowInscripcion = $("#VentanaInscripcion").kendoWindow
    ({
        title: "Inscripcion",
        modal: true,
        visible: false,
        resizable: false
    }).data("kendoWindow");

    //...........................FUNCIONES............................

    $("#editor").kendoEditor();

    var valoresComboPrioridad = [{ texto: "No", valor: false }, { texto: "Si", valor: true}];

    $("#DescuentoSocios").kendoDropDownList({
        dataTextField: "texto",
        dataValueField: "valor",
        index: 0,
        dataSource: valoresComboPrioridad
    });

    $("#Acompanantes").kendoNumericTextBox({
        min: 1,
        max: maxacompa,
        step: 1,
        format: "0"
    });
    $("#Acompanantes").hide();

    $("#AcompanantesDropdown").kendoDropDownList({
        dataTextField: "texto",
        dataValueField: "valor",
        dataSource: valoresComboPrioridad,
        select: function (e) {
            var numacompa = this.dataItem(e.item.index());
            if (numacompa.valor == true) {
                $("#NumeroAcompa").show();
            }
            else {
                $("#NumeroAcompa").hide();
            }
        }
    });
    $("#NumeroAcompa").hide();
    $("#FechaRealizacion").kendoDatePicker({

        format: "dd/MM/yyyy"
    });


    $("#FechaAperturaInscrip").kendoDatePicker({

        format: "dd/MM/yyyy"
    });


    $("#FechaLimiteInscrip").kendoDatePicker({

        format: "dd/MM/yyyy"
    });

    $("#botonCrearCursillo").live("click", function () {

        $.ajax({
            url: "Cursillos/cargarVistaCrearCursillo",
            type: "POST",
            success: function (data) {
                $("#Cursillostabla").hide();
                $("#FormularioCreacion").html(data);
                $("#FormularioCreacion").show();
                $("#editor").kendoEditor();

                $("#FechaRealizacion").kendoDatePicker({

                    format: "dd/MM/yyyy"
                });
                $("#FechaAperturaInscrip").kendoDatePicker({

                    format: "dd/MM/yyyy"
                });
                $("#FechaLimiteInscrip").kendoDatePicker({

                    format: "dd/MM/yyyy"
                });

                var valoresComboPrioridad = [
                        { texto: "Si", valor: true },
                        { texto: "No", valor: false }

                    ];

                $("#DescuentoSocios").kendoDropDownList({
                    dataTextField: "texto",
                    dataValueField: "valor",
                    dataSource: valoresComboPrioridad
                });
            }

        });

    });

    $(".botonEditarFila").live("click", function () {

        var fila = $("#Cursillostabla").find("tbody tr.k-state-selected");
        var filajson = $("#Cursillostabla").data("kendoGrid").dataItem(fila).toJSON();
        idCursillo = datasource.getByUid(fila.attr("data-uid")).idCursillo;

        $("#Titulo").val(filajson.Titulo);
        $("#Lugar").val(filajson.Lugar);
        $("#Tematica").val(filajson.Tematica);
        $("#ConocimientosPrevios").val(filajson.ConocimientosPrevios);
        $("#FechaRealizacion").data("kendoDatePicker").value(filajson.FechaRealizacion);
        $("#FechaAperturaInscrip").data("kendoDatePicker").value(filajson.FechaAperturaInscripcion);
        $("#FechaLimiteInscrip").data("kendoDatePicker").value(filajson.FechaLimiteInscripcion);
        $("#Plazas").val(filajson.Plazas);
        $("#Precio").val(filajson.Precio);
        $("#NumAcompa").val(filajson.NumAcompa);

        $("#DescuentoSocios").data("kendoDropDownList").value((filajson.DescuentoSocios));
        $("#editor").data("kendoEditor").value((filajson.Actividad));

        windowEditar.center();
        windowEditar.open();
    });

    $("#BotonCancelarVentanaEditar").live("click", function () {
        windowEditar.close();
        $("#Cursillostabla").show();
    });

    $("#BotonCancelarInscripcion").live("click", function () {
        windowInscripcion.close();
        $("#Cursillostabla").show();
    });

    $("#BotonCancelarFormularioCrear").live("click", function () {
        $("#FormularioCreacion").hide();
        $("#Cursillostabla").show();
    });

    $("#BotonAceptarFormularioCrear").live("click", function () {
        var datos = {};
        datos["TituloUpdate"] = $("#Titulo").val();
        datos["LugarUpdate"] = $("#Lugar").val();
        datos["TematicaUpdate"] = $("#Tematica").val();
        datos["ConocimientosPreviosUpdate"] = $("#ConocimientosPrevios").val();
        datos["FechaRealizacionUpdate"] = $("#FechaRealizacion").val();
        datos["FechaAperturaInscripUpdate"] = $("#FechaAperturaInscrip").val();
        datos["FechaLimiteInscripUpdate"] = $("#FechaLimiteInscrip").val();
        datos["PlazasUpdate"] = $("#Plazas").val();
        datos["NumAcompaUpdate"] = $("#NumAcompa").val();
        datos["PrecioUpdate"] = $("#Precio").val();
        datos["DescuentoSociosUpdate"] = $("#DescuentoSocios").val();
        datos["ActividadUpdate"] = $("#editor").data("kendoEditor").value();

        $.ajax(
        {
            url: "Cursillos/CreateCursillo",
            type: "POST",
            data: datos,
            success: function () {
                datasource.read();
                $("#FormularioCreacion").hide();
                $("#Cursillostabla").show();
            }
        });
    });

    $("#BotonAceptarInscripcion").click(function () {
        var datos = {};

        datos["numacompa"] = 0;
        if (!$("#AcompanantesDropdown").data("kendoDropDownList").value()) {
            datos["numacompa"] = $("#Acompanantes").val();
        }
        datos["idCursillo"] = idCursillo;
        $.ajax(
        {
            url: "Cursillos/InscripcionCursillo",
            type: "POST",
            data: datos,
            success: function () {
                datasource.read();
                windowInscripcion.close();
            }
        });
    });

    $("#BotonAceptarVentanaEditar").click(function () {
        var datos = {};

        datos["TituloUpdate"] = $("#Titulo").val();
        datos["LugarUpdate"] = $("#Lugar").val();
        datos["TematicaUpdate"] = $("#Tematica").val();
        datos["ConocimientosPreviosUpdate"] = $("#ConocimientosPreviosTematica").val();
        datos["FechaRealizacionUpdate"] = $("#FechaRealizacion").val();
        datos["FechaAperturaInscripUpdate"] = $("#FechaAperturaInscrip").val();
        datos["FechaLimiteInscripUpdate"] = $("#FechaLimiteInscrip").val();
        datos["PlazasUpdate"] = $("#Plazas").val();
        datos["NumAcompaUpdate"] = $("#NumAcompa").val();
        datos["PrecioUpdate"] = $("#Precio").val();
        datos["DescuentoSociosUpdate"] = $("#DescuentoSocios").val();
        datos["ActividadUpdate"] = $("#editor").data("kendoEditor").value();
        datos["idCursillo"] = idCursillo;

        $.ajax(
        {
            url: "Cursillos/UpdateCursillo",
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

        detailRow.find(".detallesCursillosPestanas").kendoTabStrip({
            animation: {
                open: { effects: "fadeIn" }
            }
        });
    }

    $(".botonInscripcion").live("click", function () {

        var fila = $("#Cursillostabla").data("kendoGrid").select();
        var filaJson = $("#Cursillostabla").data("kendoGrid").dataItem(fila).toJSON(); // La pasamos a JSON

        var Cursillo = datasource.getByUid(fila.attr("data-uid"));
        var Titulo = Cursillo.Titulo;
        idCursillo = Cursillo.idCursillo;
        var Precio = Cursillo.Precio;
        maxacompa = Cursillo.NumAcompa;

        $("#TituloCursilloInscripcion").text(Titulo);
        $("#PrecioCursilloInscripcion").text(Precio);

        $("#acompaWrapper").empty();
        $("#acompaWrapper").html('<div id="NumeroAcompa"><label> Número de acompañantes: </label><input id="Acompanantes" /></div>');
        $("#AcompanantesDropdown").data("kendoDropDownList").select(0);

        $("#Acompanantes").kendoNumericTextBox({

            min: 1,
            max: maxacompa,
            step: 1,
            format: "0"
        });

        $("#NumeroAcompa").hide();

        windowInscripcion.center();
        windowInscripcion.open();
    });

    $(".botonEliminarFila").live("click", function () {

        var fila = $("#Cursillostabla").data("kendoGrid").select(); // Cogemos la fila seleccionada
        var filaJson = $("#Cursillostabla").data("kendoGrid").dataItem(fila).toJSON(); // La pasamos a JSON

        var idCursillo = datasource.getByUid(fila.attr("data-uid")).idCursillo;

        $.ajax({
            url: "Cursillos/eliminarCursillo",
            type: "POST",
            data: { idCursillo: idCursillo },
            success: function () {
                datasource.read();
            }
        });
    });
});