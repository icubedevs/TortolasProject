$(document).ready(function () {
    $("#BotonConfirmarNuevaEmpresa").live("click", function () {
        weditar.close();
    });
    $("#BotonCancelarNuevaEmpresa").live("click", function () {
        $.post('Empresas/Index', function () {
            $("#EmpresasHerramientasContent").show();
            $("#EmpresasGrid").show();
            $("#NuevaEmpresaFormulario2").hide();
        });
    });
});
