<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="FacturasIndexCss" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
    <link href="../../Content/Facturas/facturasIndex.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="FacturasIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasNav.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasIndex.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="FacturasIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión de facturas
</asp:Content>

<asp:Content ID="FacturasIndexMain" ContentPlaceHolderID="MainContent" runat="server">
    <div id="FacturasNav">
        <div id="mainFacturasNav">
            <ul>
                <li id="nuevaFacturaButtonNav"><%: Html.ActionLink("Nueva Factura", "nuevaFactura", "Facturas") %></li>
                <li id="ingresosButtonNav">Ingresos</li>
                <li id="gastosButtonNav">Gastos</li>
                <li id="movimientosButtonNav">Movimientos</li>
                <li id="graficosContablesButtonNav">Gráficos contables</li>
            </ul>
            <div id="FacturasFilter">Filtro ></div>
        </div>
        <div id="volverFacturasNav">
            <ul>
                <li id="volverFacturaButtonNav">< Volver</li>
            </ul>
        </div>
    </div>

    <div id="FacturasContainer"></div>

    <div id="FacturasGrid">
        
    </div>
</asp:Content>

