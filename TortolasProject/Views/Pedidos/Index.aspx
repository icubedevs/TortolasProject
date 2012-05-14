<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="PedidosIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Pedidos
</asp:Content>

<asp:Content ID="PedidosIndexMain" ContentPlaceHolderID="MainContent" runat="server">

<div id="anadirPedidosButton"><input type="button" class="k-button" value="Añadir pedido" /></div>
<div id="anadirPedidosDiv"> </div>
<div id="PedidosGrid"></div>

</asp:Content>

<asp:Content ID="PedidosIndexCss" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="PedidosIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
</asp:Content>
