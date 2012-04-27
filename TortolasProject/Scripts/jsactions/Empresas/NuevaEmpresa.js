$(document).ready(function () {
    $("#BotonConfirmarNuevaEmpresa").live("click", function () {
        var datos = {};



        //Coger datos
        datos["nombreempresa"] = $("#newnombreempresa").val();
        datos["cif"] = $("#newcif").val();
        datos["localidad"] = $("#newlocalidad").val();
        datos["direccionweb"] = $("#newdireccionweb").val();
        datos["telefonodecontacto"] = $("#newtelefonodecontacto").val();
        datos["email"] = $("#newemail-c").val();
        //datos["idempresa"] = new Guid();

        //alert(datos["nombreempresaupdate"]);

        $.ajax(
        {
            url: "Empresas/CreateEmpresa",
            type: "POST",
            data: datos,
            success: function () {
                //alert("Estoy dentro del success!");
                //alert($("#EmpresasGrid"));
                var temp = $("#EmpresasGrid").data("kendoGrid").dataSource;
                //alert("soy el temp:" + temp);
                temp.read();

                //alert("Ya he cogido e datasource!");
                $.post('Empresas/Index', function () {
                    //alert("Estoy dentro del .post!");
                    $("#EmpresasHerramientasContent").show();
                    $("#EmpresasGrid").show();
                    $("#NuevaEmpresaFormulario2").hide();
                });
                //alert("Ya he terminado!");

            },
            async: false
        });
    });
    $("#BotonCancelarNuevaEmpresa").live("click", function () {
        $.post('Empresas/Index', function () {
            $("#EmpresasHerramientasContent").show();
            $("#EmpresasGrid").show();
            $("#NuevaEmpresaFormulario2").hide();
        });
    });
});
