<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="graficosTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Gráficas contables
</asp:Content>

<asp:Content ID="graficosMainContent" ContentPlaceHolderID="MainContent" runat="server">
 <%Html.RenderPartial("facturasNav"); %>
 <div id='opcionesGraficoContainer'>
    <label for='fechaInicio'>Fecha inicial</label><input id='fechaInicio' name='fechaInicio' /><br />
    <label for='fechaFinal'>Fecha final</label><input id='fechaFinal' name='fechaFinal' /><br />

    <div id='generarGrafica' class='k-button'>Generar gráfica</div>
 </div>
 <div id="GraficosContainer">
    <div id='grafica'></div> 
 </div>
</asp:Content>

<asp:Content ID="graficosCssContent" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="graficosScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
 <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/graficosContables.js") %>" type="text/javascript"></script>
 <script src="<%: Url.Content("~/Scripts/Highcharts/highcharts.js") %>" type="text/javascript"></script>
 <script src="<%: Url.Content("~/Scripts/Highcharts/highstock.js") %>" type="text/javascript"></script>
</asp:Content>
