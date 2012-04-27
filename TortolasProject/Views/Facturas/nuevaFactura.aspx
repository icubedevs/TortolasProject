<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="nuevaFacturaTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Nueva factura
</asp:Content>

<asp:Content ID="nuevaFacturaCssContent" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/nuevaFactura.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="nuevaFacturaScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasNueva.js") %>" type="text/javascript"></script>
</asp:Content>


<asp:Content ID="nuevaFacturaMainContent" ContentPlaceHolderID="MainContent" runat="server">

<div id='nuevaFacturaForm'>
    <div id='nuevaFacturaHeader'>
        <div id='relacionesNuevaFacturaContainer'>
            <div id='usuariosNuevaFacturaDiv'>
                Usuario     <input id='usuariosNuevaFacturaAutocomplete' />
            </div>
            <div id='eventosNuevaFacturaDiv'>
                Evento     <input id='eventosNuevaFacturaAutocomplete' />
            </div>
            <div id='pedidosNuevaFacturaDiv'>
                Pedido    <input id='pedidosNuevaFacturaAutocomplete' />
            </div>
            <div id='articulosNuevaFacturaDiv'>
                Artículos    <input id='articulosNuevaFacturaAutocomplete' />
            </div>
        </div>

        <div id='fechaNuevaFacturaDiv'>
            Fecha       <input id='fechaNuevaFactura' />
        </div>
        <div id='conceptoNuevaFacturaDiv'>
            Concepto    <input type='text' id='conceptoNuevaFactura' class='inputText' />   
        </div>
    </div>

    <div id='nuevaLineaButton'>Nueva línea</div>
    <div id='nuevaFacturaLineasFacturaGrid'>
    </div>
    <div id='totalNuevaFacturaDiv'>
            Cuantía     <input type='text' id='totalNuevaFactura' class='inputText' />      
    </div>

    <div id='nuevaFacturaBottom'>
        <div id='descartarNuevaFacturaButton'>Descartar</div>
        <div id='guardarNuevaFacturaButton'>Guardar</div>
    </div>
</div>

</asp:Content>