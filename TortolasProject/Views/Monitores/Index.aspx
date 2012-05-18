<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    [MTB] Administracion Monitores
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<br />
<img class="titulotab" src="../../Content/images/monitores/monitores_titulo.png"  />

<br />

<!-- TABLA DE MONITORES -->
<div id="monitoresGrid">

</div>

<!-- VENTA DE EDITAR --> 
<div id="editarfila" class="ventanaClass">
    <div id="camposedicion" class="formulario">
        <label for="nombreedit">Nombre : </label><input type="text" id="nombreedit" atributo="Nombre" class="k-textbox" required/><br />        
        <label for="apellidosedit">Apellidos : </label><input type="text" id="apellidosedit" atributo="Apellidos" class="k-textbox"/><br />
        <label for="dniedit">DNI : </label><input type="text" id="dniedit" atributo="Dni" class="k-textbox" required /><br />
        <label for="emailedit">Email : </label><input type="email" id="emailedit" atributo="Email" class="k-textbox" /><br />
        <label for="direccionedit">Direccion : </label><input type="text" id="direccionedit" atributo="Direccion" class="k-textbox"/><br />
        <label for="telefonoedit">Telefono : </label><input type="text" min="9" max="11" id="telefonoedit" atributo="Telefono" class="k-textbox"/><br />
    <center>
        <input type="button" value="Salvar Campos" id="botonEditar" class="k-button"/>
        <input type="button" value="Cancelar" id="botonCancelar" class="k-button cancelar"/>
    </center>
    </div>

    <div id="divFotoMonitor" class="k-container">
        <img id="fotoMonitor" src="../../Content/images/monitores/chucknorris.jpg" width="180" height="150"><br />
        <input type="file" id="subirFoto" class="uploader" name="attachments">
    </div>
    

</div>


<!-- VENTANA DE CREAR -->
<div id="crearMonitor" class="ventanaClass">
    <div id="camposcrear" class="formulario">
        <label for="nombrenuevo">Nombre : </label><input type="text" id="nombrenuevo" name="nombre" atributo="Nombre" class="k-textbox" required/><br />
        <label for="apellidosnuevo">Apellidos : </label><input type="text"  id="apellidosnuevo" name="apellidos" atributo="Apellidos" class="k-textbox"/><br />
        <label for="dninuevo">DNI : </label><input type="text" id="dninuevo" atributo="Dni" name="dni" class="k-textbox" required /><br />
        <label for="emailnuevo">Email : </label><input type="email" id="emailnuevo" name="email" atributo="Email" class="k-textbox" /><br />
        <label for="direccionnuevo">Direccion : </label><input type="text" id="direccionnuevo" name="direccion" atributo="Direccion" class="k-textbox"/><br />
        <label for="telefononuevo">Telefono : </label><input type="text" min="9" max="11" id="telefononuevo" name="telefono" atributo="Telefono" class="k-textbox"/><br />
   <center>
        <input type="button" value="Crear Nuevo Monitor" id="botonCrear" class="k-button"/>
        <input type="button" value="Cancelar" id="botonCancelar" class="k-button cancelar"/>
   </center>
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

<!-- KENDO TEMPLATE DE LA BARRA DE HERRAMIENTAS DE LA TABLA -->
<script type="text/x-kendo-template" id="templateToolbarMonitor">
<div class="toolbar">
    <input type="button" class="k-button" id="nuevoMonitorToolbar" value="+ Nuevo Monitor">
</div>
</script>

<!-- KENDO TEMPLATE DE VISTA DE DETALLES DE LA TABLA -->
<script type="text/x-kendo-template" id="templateDetailMonitor">
                <div class="tabsMonitor">
                    <ul>
                        <li class="k-state-active">
                           Cursillos
                        </li>
                        <li>
                            Información
                        </li>
                    </ul>
                    <div>
                        <div class="cursillosDeMonitor"></div>
                    </div>
                    <div class="informacionMonitor">                                               
                        <div class='informacionMonitor'>
                        
                        <table>                                                 
                        <tr>
                        <td>
                            <img src="../../Content/images/monitores/#= foto #" width="180" height="150" align="center" style="float:right">
                        </td>
                        <td>
                            <li><label>Nombre:</label>#= nombre #</li>
                            <li><label>Apellidos:</label>#= apellidos #</li>
                            <li><label>DNI:</label>#= dni #</li>
                            <li><label>Email:</label>#= email #</li>
                            <li><label>Direccion:</label>#= direccion #</li>
                            <li><label>Telefono:</label>#= telefono #</li>
                        </td>
                        </tr>
                        </table>                          

                        </div>

                    </div>
                </div>

</script> 

<!-- KENDO TEMPLATE DETALLES CURSILLO --> 
<script type="text/x-kendo-template" id="templateDetailCursillo">
                
                    <div class="informacionCursillo">                                               
                          <ul>                                                               
                            <li><label>Titulo:</label>#= Titulo #</li>
                            <li><label>Actividad:</label>#= Actividad #</li>
                            <li><label>Tematica:</label>#= Tematica #</li>
                            <li><label>Lugar:</label>#= Lugar #</li>                            
                            <li><label>Plazas:</label>#= Plazas #</li>
                            <li><label>Fecha de Realizacion:</label>#= FechaRealizacion #</li>
                            <li><label>Fecha de apertura de Inscripcion:</label>#= FechaAperturaInscripcion #</li>
                            <li><label>Fecha limite de Inscripcion:</label>#= FechaLimiteInscripcion #</li>                            
                         </ul>                                                                       
                    </div>
</script> 


<script src="../../Scripts/jsactions/Administracion/Monitores/Monitores.js" ></script>
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.common.min.css" />
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.default.min.css" />


</asp:Content>
