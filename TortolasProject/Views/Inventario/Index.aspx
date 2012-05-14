<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="InventarioIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Inventario
</asp:Content>

<asp:Content ID="InventarioIndexMain" ContentPlaceHolderID="MainContent" runat="server">

<div id="anadirInventarioButton"><input type="button" class="k-button" value="Añadir artículo al inventario" /></div>
<div id="anadirInventarioDiv"> </div>
<div id="inventarioGrid"></div>

 <div id="anadirInventarioGrid"> </div>
 <div id="anadirInventarioAceptarButton"><input type="button" class="k-button" value="Aceptar" /></div>
 <div id="anadirInventarioCancelarButton"><input type="button" class="k-button" value="Cancelar" /></div>

 <div id="anadirInventarioVentana"> 
    Ubicacion <input type="text" id="Ubicacion"/>
    Cantidad <input type="text" id="Cantidad"/>  
    <div id="anadirInventarioVentanaAceptar"><input type="button" class="k-button" value="Aceptar" /></div>
    <div id="anadirInventarioVentanaCancelar"><input type="button" class="k-button" value="Cancelar" /></div>
 </div>
</asp:Content>

<asp:Content ID="InventarioIndexCss" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="InventarioIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Pedidos/inventarioIndex.js") %>" type="text/javascript"></script>
</asp:Content>
