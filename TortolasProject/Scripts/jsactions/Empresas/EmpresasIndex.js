
$(document).ready(function () {
    var idEmpresa = null;
    var datasource = new kendo.data.DataSource
    ({
        transport:
            {
                read:
                {
                    url: "Empresas/LeerTodos",
                    datatype: "json",
                    type: "POST"
                }
            },
        schema:
        {
            model:
             {
                 id: "idEmpresa"
             }
        }
    });

    $("#EmpresasGrid").kendoGrid
    ({
        //height: 400,
        dataSource: datasource,
        selectable: true,
        pageable: true,
        sortable: true,
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
            {
                field: "DireccionWeb",
                title: "Direccion Web"
            },
            {
                field: "TelefonodeContacto",
                title: "Telefono de Contacto"
            },
            {
                field: "Email",
                title: "E-Mail"
            },
            {
                title: "Herramientas",
                command: { text: "Editar", className: "botonEditarFila" }
            }
        ]

    });

    var weditar = $("#VentanaEditar")
        .kendoWindow
        ({
            title: "Editar",
            modal: true,
            visible: false,
            resizable: false,
            width: 600,
            height: 400
        }).data("kendoWindow");


    // FUNCIONES --------------------------------------------------------

    $(".botonEditarFila").live("click", function () {

        var fila = $("#EmpresasGrid").find("tbody tr.k-state-selected");

        var filajson = $("#EmpresasGrid").data("kendoGrid").dataItem(fila).toJSON();
        idEmpresa = datasource.getByUid(fila.attr("data-uid")).idEmpresa;

        $("#nombreempresa").val(filajson.Nombre);
        $("#cif").val(filajson.CIF);
        $("#localidad").val(filajson.Localidad);
        $("#direccionweb").val(filajson.DireccionWeb);
        $("#telefonodecontacto").val(filajson.TelefonodeContacto);
        $("#email-c").val(filajson.Email);


        weditar.center();

        weditar.open();
    });
    $("#BotonCancelarVentanaEditar").live("click", function () {
        weditar.close();
    });
    $("#BotonAceptarVentanaEditar").live("click", function () {
        var datos = {};
        //Coger datos
        datos["nombreempresaupdate"] = $("#nombreempresa").val();
        datos["cifupdate"] = $("#cif").val();
        datos["localidadupdate"] = $("#localidad").val();
        datos["direccionweb"] = $("#direccionweb").val();
        datos["telefonodecontactoupdate"] = $("#telefonodecontacto").val();
        datos["emailupdate"] = $("#email-c").val();
        datos["idempresa"] = idEmpresa;

        //alert(datos["nombreempresaupdate"]);

        $.ajax(
        {
            url: "Empresas/UpdateEmpresa",
            type: "POST",
            data: datos,
            success: function () {
                datasource.read();
                weditar.close();
            },
            async: false
        });
    });


    $("#BotonNuevaEmpresa").click(function () {
        $.post('Empresas/CargarVistaNuevaEmpresa', function (data) {
            $("#EmpresasHerramientasContent").hide();
            $("#EmpresasGrid").hide();
            $("#NuevaEmpresaFormulario").html(data);
            $("#NuevaEmpresaFormulario").show();
        });
    });

    $("#EmpresasNav").live("click", function () {
        $.post('Empresas/Index', function () {
            $("#EmpresasHerramientasContent").show();
            $("#EmpresasGrid").show();
            $("#NuevaEmpresaFormulario2").hide();
        });
    });



});