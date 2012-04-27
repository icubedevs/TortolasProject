<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="leerFacturaCssContent" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="leerFacturaScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
<script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasDetalles.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="leerFacturaTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Factura
</asp:Content>

<asp:Content ID="leerFacturaMainContent" ContentPlaceHolderID="MainContent" runat="server">
    <input type="hidden" id="idFactura" value="<%= Model.idFactura %>" />
    <div id="editarFacturaButton">Editar</div>
    <p>idFactura:    <%= Model.idFactura %>  </p>
    <p>Fecha:        <%= Model.Fecha %>      </p>
    <p>Concepto:     <%= Model.Concepto %>   </p>
    <div id="leerFacturaLineasFacturaGrid"></div>
    <p>Total:        <%= Model.Total %>      </p>

</asp:Content>


