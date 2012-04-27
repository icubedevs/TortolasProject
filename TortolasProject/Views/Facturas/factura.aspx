<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="facturaTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Nueva factura
</asp:Content>

<asp:Content ID="facturaCssContent" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/factura.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="facturaScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasNueva.js") %>" type="text/javascript"></script>
</asp:Content>


<asp:Content ID="facturaMainContent" ContentPlaceHolderID="MainContent" runat="server">

<div id='facturaForm'>
    <div id='facturaHeader'>
        <div id='relacionesFacturaContainer'>
            <div id='usuariosFacturaDiv'>
                Usuario     <input id='usuariosFacturaAutocomplete' />
            </div>
            <div id='eventosFacturaDiv'>
                Evento     <input id='eventosFacturaAutocomplete' />
            </div>
            <div id='articulosFacturaDiv'>
                Artículos    <input id='articulosFacturaAutocomplete' />
            </div>
        </div>

        <div id='fechaFacturaDiv'>
            Fecha       <input id='fechaFactura' />
        </div>
        <div id='conceptoFacturaDiv'>
            Concepto    <input type='text' id='conceptoFactura' class='inputText' />   
        </div>
    </div>

    <div id='nuevaLineaButton'>Nueva línea</div>
    <div id='facturaLineasFacturaGrid'>
    </div>
    <div id='totalFacturaDiv'>
            Cuantía     <input type='text' id='totalFactura' class='inputText' />      
    </div>

    <div id='facturaBottom'>
        <div id='descartarFacturaButton'>Descartar</div>
        <div id='guardarFacturaButton'>Guardar</div>
    </div>
</div>

</asp:Content>