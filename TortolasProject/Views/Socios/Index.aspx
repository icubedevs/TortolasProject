<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    [MTB] Administracion de Socios
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <img src="../../Content/images/tituloadminsocios.png" />

    <div id="tablaAdminSocios"></div>


</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Administracion/Socios/AdminSocios.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="../../Scripts/jsactions/Administracion/Socios/AdminSocios.js" type="text/javascript"></script>
        
    <script type="text/x-kendo-template" id="templateToolbarCuotasPendientes">
         <input type="button" class="k-button botonCambiarEstadoCuota"  value="Cambiar estado de Cuota">
    </script>

    <script type="text/x-kendo-template" id="templateToolbarAdminSocio">
         <input type="button" class="k-button" id="botonCrearSocio" value="+ Nuevo Socio">
         <input type="button" class="k-button" id="botonJuntaDirectiva" value="Ascender a Junta Directiva">
         <input type="button" class="k-button" id="botonJuntaDirectiva" value="Descender de Junta Directiva">
    </script>

    <script type="text/x-kendo-template" id="templateDetailAdminSocio">
        <div class="tabsSocios">
            <ul>
                <li>Informacion</li>
                <li>Pagos</li>
            </ul>
            <div class="infoSocio">
                <table>                                                 
                            <tr>
                            <td>
                                <img src="#= Foto #" width="180" height="150" style="float:left">
                            </td>
                            <td>
                                <li><label>Numero Socio:</label>#= NumeroSocio #</li>
                                <li><label>Nombre:</label>#= Nombre #</li>
                                <li><label>Apellidos:</label>#= Apellidos #</li>                                                                                                                                
                                <li><label>Fecha Alta:</label>#= FechaAlta #</li>
                                <li><label>Fecha Baja:</label>#= FechaBaja #</li>
                                <li><label>Fecha Expiracion:</label>#= FechaExpiracion #</li>
                                <li><label>Estado:</label>#= Estado #</li>
                            </td>
                            </tr>
                            </table>   
            </div>
            <div>
                <h3>Cuotas/Altas pagadas</h3><br>
                <div class="pagosSocio Pagados" socio="#= idSocio #">

                </div>
                
                                   
                <br>
                <h3>Cuotas/Altas pendientes<h3><br>
                <div class="pagosSocio Pendientes" socio="#= idSocio #">
                   
                </div>
            </div>
        </div>
    </script>
</asp:Content>
