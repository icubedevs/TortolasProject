<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="EventosIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Eventos
</asp:Content>

<asp:Content ID="EventosIndexMain" ContentPlaceHolderID="MainContent" runat="server">
<div id="Eventostabla">

</div>

</asp:Content>

<asp:Content ID="EventosIndexCss" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="EventosIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
     <script type="text/x-kendo-template" id="template">
                <div class="detallesEventosPestanas">
                
                </div>
      </script> 
     <script type="text/x-kendo-template" id="templateToolbarEvento">
                <div class="toolbar">
                    <input type ="button" id="botonCrearEvento" class="k-button" value="Crear Evento"/>
                
                </div>
      </script> 
    <script src="../../Scripts/jsactions/Eventos/eventos.js"></script>
</asp:Content>


