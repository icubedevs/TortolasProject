<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="PedidosIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Pedidos
</asp:Content>

<asp:Content ID="PedidosIndexMain" ContentPlaceHolderID="MainContent" runat="server">

<div id="anadirPedidoButton"><input type="button" class="k-button" value="Añadir pedido" /></div>
<div id="pedidosGrid"></div>

<script type="text/x-kendo-template" id="templateDetailPedidos">
    <div class="tabsPedidos">
        <ul>
            <li class="k-state-active">
            Pedidos
            </li>
            <li>
            Detalles
            </li>
        <ul>
        <div>
            <div class="lineasPedido">Halaaa que pecha de pedidos de usuarios</div>
        </div>
        <div class="detallesPedido">                                               
            Io que pedio mas reshulon
        </div>
    </div>
</script> 

<div id="anadirPedidoVentana"> 
    Nombre <input type="text" id="nombre"/> <br /> 
    Descuento <input type="text" id="descuento"/> <br />
    Fecha limite <input id="fechaPedido" />
    <div id="anadirPedidoVentanaAceptar"><input type="button" class="k-button" value="Aceptar" /></div>
    <div id="anadirPedidoVentanaCancelar"><input type="button" class="k-button" value="Cancelar" /></div>
 </div>

</asp:Content>

<asp:Content ID="PedidosIndexCss" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="PedidosIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
 <script src="<%: Url.Content("~/Scripts/jsactions/Pedidos/pedidosIndex.js") %>" type="text/javascript"></script>
</asp:Content>
