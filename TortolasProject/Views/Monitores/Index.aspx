<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Index
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">


<h2>Index</h2>

<br />

<div id="monitoresGrid">

</div>

<div id="editarfila" class="ventanaClass">
    <div id="camposedicion" class="formulario">
        <label for="nombreedit">Nombre : </label><input type="text" id="nombreedit" atributo="Nombre" class="k-input"/><br />
        <label for="apellidosedit">Apellidos : </label><input type="text" id="apellidosedit" atributo="Apellidos" class="k-input"/><br />
        <label for="dniedit">DNI : </label><input type="text" id="dniedit" atributo="Dni" class="k-input"/><br />
        <label for="emailedit">Email : </label><input type="text" id="emailedit" atributo="Email" class="k-input"/><br />
        <label for="direccionedit">Direccion : </label><input type="text" id="direccionedit" atributo="Direccion" class="k-input"/><br />
        <label for="telefonoedit">Telefono : </label><input type="text" id="telefonoedit" atributo="Telefono" class="k-input"/><br />
      <br /><br />
    <input type="button" value="Salvar Campos" id="botonEditar" class="k-button"/>
    <input type="button" value="Cancelar" id="botonCancelar" class="k-button cancelar"/>
    
    </div>

    <div id="divFotoMonitor" class="k-container">
        <img id="fotoMonitor" src="../../Content/images/monitores/chucknorris.jpg" width="180" height="150"><br />
        <input type="file" id="subirFoto" class="uploader" name="attachments">
    </div>
    

</div>

<div id="crearMonitor" class="ventanaClass">
    <div id="camposcrear" class="formulario">
        <label for="nombrenuevo">Nombre : </label><input type="text" id="nombrenuevo" atributo="Nombre" class="k-input"/><br />
        <label for="apellidosnuevo">Apellidos : </label><input type="text" id="apellidosnuevo" atributo="Apellidos" class="k-input"/><br />
        <label for="dninuevo">DNI : </label><input type="text" id="dninuevo" atributo="Dni" class="k-input"/><br />
        <label for="emailnuevo">Email : </label><input type="text" id="emailnuevo" atributo="Email" class="k-input"/><br />
        <label for="direccionnuevo">Direccion : </label><input type="text" id="direccionnuevo" atributo="Direccion" class="k-input"/><br />
        <label for="telefononuevo">Telefono : </label><input type="text" id="telefononuevo" atributo="Telefono" class="k-input"/><br />
      <br /><br />
    <input type="button" value="Crear Nuevo Monitor" id="botonCrear" class="k-button"/>
    <input type="button" value="Cancelar" id="botonCancelar" class="k-button cancelar"/>
    
    </div>

    <div id="divNuevoFotoMonitor" class="k-container">
        <img id="fotoMonitorNuevo" src="../../Content/images/monitores/chucknorris.jpg" width="180" height="150"><br />
        <input type="file" id="subirFotoCrear" class="uploader" name="attachments">
    </div>
    

</div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">

<link href="../../Content/Administracion/Monitores/monitores.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">

<script type="text/x-kendo-template" id="templateToolbarMonitor">
<div class="toolbar">
    <input type="button" class="k-button" id="nuevoMonitorToolbar" value="+ Nuevo Monitor">
</div>
</script>

<script src="../../Scripts/jsactions/Administracion/Monitores/Monitores.js" ></script>
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.common.min.css" />
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.default.min.css" />


</asp:Content>
