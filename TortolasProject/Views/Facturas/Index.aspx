<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="FacturasIndexCss" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="FacturasIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasNav.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="FacturasIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión de facturas
</asp:Content>

<asp:Content ID="FacturasIndexMain" ContentPlaceHolderID="MainContent" runat="server">
    <div id="FacturasNav">
        <ul>
            <li>Nueva factura</li>
            <li>Sólo ingresos</li>
            <li>Sólo gastos</li>
            <li>Movimientos</li>
            <li>Gráficos contables</li>
        </ul>
        <div id="FacturasFilter">Filtro ></div>
    </div>

    <input id="ButtonPulsa" type="button" value="Pulsar" title="Pulsar" />
    <div id="divPruebaAjax">AJAX</div>
</asp:Content>

