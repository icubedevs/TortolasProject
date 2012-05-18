<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="ArticulosIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Articulos
</asp:Content>

<asp:Content ID="ArticulosIndexMain" ContentPlaceHolderID="MainContent" runat="server">

    <div id="anadirArticuloButton"><input type="button" class="k-button" value="Añadir artículo" /></div>
    <div id="anadirArticuloDiv"> </div>
    <div id="editarArticuloDiv"> </div>
    <div id="articulosGrid"></div>

</asp:Content>

<asp:Content ID="ArticulosIndexCss" ContentPlaceHolderID="CssContent" runat="server">

</asp:Content>

<asp:Content ID="ArticulosIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Pedidos/articulosIndex.js") %>" type="text/javascript"></script>
</asp:Content>