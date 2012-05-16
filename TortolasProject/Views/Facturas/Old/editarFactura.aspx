<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="facturaTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Editar factura
</asp:Content>

<asp:Content ID="facturaCssContent" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/factura.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="facturaScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasEditar.js") %>" type="text/javascript"></script>
</asp:Content>


<asp:Content ID="facturaMainContent" ContentPlaceHolderID="MainContent" runat="server">
<input type="hidden" id="idFactura" value="<%= Model.idFactura %>" />
<div id='facturaForm'>
    <div id='facturaHeader'>
        <div id='eliminarFacturaButton' class='k-button'>Eliminar Factura</div>
        <div id='relacionesFacturaContainer'>
            <div id='usuariosFacturaDiv'>
                Usuario     <input id='usuariosFacturaAutocomplete'/>
            </div>
            <div id='eventosFacturaDiv'>
                Evento     <input id='eventosFacturaAutocomplete' />
            </div>
            <div id='articulosFacturaDiv'>
                Artículos    <input id='articulosFacturaAutocomplete' />
            </div>
        </div>

        <div id='fechaFacturaDiv'>
            Fecha       <input id='fechaFactura' value='<%= Model.Fecha %>' />
        </div>
        <div id='conceptoFacturaDiv'>
            Concepto    <input type='text' id='conceptoFactura' class='inputText' value='<%= Model.Concepto %>' />   
        </div>
    </div>

    <div id='nuevaLineaButton' class='k-button'>Nueva línea</div>
    <div id='facturaLineasFacturaGrid'>
    </div>
    <div id='totalFacturaDiv'>
            Cuantía     <input type='text' id='totalFactura' class='inputText' value='<%= Model.Total %>' />      
    </div>

    <div id='facturaBottom'>
        <div id='descartarFacturaButton' class='k-button'>Descartar</div>
        <div id='guardarFacturaButton' class='k-button'>Guardar</div>
    </div>
</div>

</asp:Content>