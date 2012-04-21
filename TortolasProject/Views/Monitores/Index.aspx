<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Index
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


<h2>Index</h2>

<br />

<div id="kendoGrid">

</div>

<div id="editarfila">
    <label for="nombreedit">Nombre : </label><input type="text" id="nombreedit" class="k-input"/><br />
    <label for="apellidosedit">Apellidos : </label><input type="text" id="apellidosedit" class="k-input"/><br />
    <label for="dniedit">DNI : </label><input type="text" id="dniedit" class="k-input"/><br />
    
    <br /><br />
    <input type="button" value="Editar" id="botonEditar" class="k-button"/>
    
</div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">

<link href="../../Content/Administracion/Monitores/monitores.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">
<script src="../../Scripts/jsactions/Administracion/Monitores/Monitores.js" ></script>
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.common.min.css" />
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.default.min.css" />


</asp:Content>
