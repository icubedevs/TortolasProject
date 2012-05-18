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
    <%Html.RenderPartial("facturasNav"); %>    

    <div id="FacturasContainer"></div>

    <div id="FacturasGrid">
        
    </div>
</asp:Content>

