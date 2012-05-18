<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="CursillosIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Cursillos
</asp:Content>

<asp:Content ID="CursillosIndexMain" ContentPlaceHolderID="MainContent" runat="server">

<img src="../../Content/images/cursillostitulo.png" />

<div id="Cursillostabla"></div>

<div id="FormularioCreacion"></div>

<div id ="VentanaInscripcion">
    <label>Inscipción al Cursillo </label>
    <div id="TituloCursilloInscripcion"></div>
    <label>Le recordamos que el precio por persona para este Cursillo es:</label>
    <div id="PrecioCursilloInscripcion"></div>
    <label> ¿Desea llevar acompañantes?</label><input type="text" id="AcompanantesDropdown" class="dropdown" /><br />
    
    <div id="acompaWrapper">
        <div id="NumeroAcompa"><label> Número de acompañantes: </label><input id="Acompanantes" /></div>
    </div>
    <center>
        <input type ="button" value="Aceptar" id="BotonAceptarInscripcion" class="k-button" />
        <input type ="button" value="Cancelar" id="BotonCancelarInscripcion" class="k-button" />
    </center>
</div>

<div id="VentanaEditar">
    <label for="Titulo">Titulo: </label><input type="text" id="Titulo" class="k-input" /><br />
    <label for="Lugar">Lugar: </label><input type="text" id="Lugar" class="k-input" /><br />
    <label for="Tematica">Temática: </label><input type="text" id="Tematica" class="k-input" /><br />
    <label for="ConocimientosPrevios">Conocimientos previos: </label><input type="text" id="ConocimientosPrevios" class="k-input" /><br />
    <label for="FechaRealizacion">Fecha: </label><input type="text" id="FechaRealizacion" class="k-input" /><br />
    <label for="FechaAperturaInscrip">Fecha de apertura de incripción: </label><input type="text" id="FechaAperturaInscrip" class="k-input" /><br />
    <label for="FechaLimiteInscrip">Fecha límite de inscripción: </label><input type="text" id="FechaLimiteInscrip" class="k-input" /><br />
    <label for="Plazas">Plazas libres: </label><input type="text" id="Plazas" class="k-input" /><br />
    <label for="NumAcompa">Número máximo de acompañantes por inscripción: </label><input type="text" id="NumAcompa" class="k-input" /><br />
    <label for="Precio">Precio: </label><input type="text" id="Precio" class="k-input" /><br />
    <label for="DescuentoSocios">Descuento para socios: </label><input type="text" id="DescuentoSocios" class="dropdown" /><br />
    <label for="Actividad">Actividad: </label><textarea id="editor" rows="10" cols="30" style="width:740px;height:440px"> </textarea>

    <center>
        <input type ="button" value="Aceptar" id="BotonAceptarVentanaEditar" class="k-button" />

        <input type ="button" value="Cancelar" id="BotonCancelarVentanaEditar" class="k-button" />
    </center>
</div>
 
</asp:Content>

<asp:Content ID="CursillosIndexCss" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="CursillosIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
<script type="text/x-kendo-template" id="template">
                <div class="detallesCursillosPestanas">
                    <ul>
                        <li>Detalles</li>
                        <li>Participantes</li>
                    </ul>
                    <div class="infoDetalles">
                             <ul>
                                <li><label>Título:</label>#= Titulo#</li>
                                <li><label>Lugar:</label>#= Lugar #</li>
                                <li><label>Temática:</label>#= Tematica#</li>
                                <li><label>Conocimientos previos:</label>#= ConocimientosPrevios#</li>
                                <li><label>Fecha:</label>#= FechaRealizacion #</li>
                                <li><label>Fecha de apertura de inscripción:</label>#= FechaAperturaInscripcion #</li>
                                <li><label>Fecha límite de inscripción:</label>#= FechaLimiteInscripcion #</li>
                                <li><label>Plazas libres:</label>#= Plazas #</li>
                                <li><label>Número máximo de acompañantes por inscripción :</label>#= NumAcompa #</li>
                                <li><label>Precio:</label>#= Precio #</li>
                                <li><label>Descuento para socios:</label>#= DescuentoSocios #</li>
                                <li><label>Actividad:</label>#= Actividad #</li>
                                
                            </ul>
                        
                    </div>
                    <div class="infoParticipantes">
                    </div>
                </div>
     </script> 

     <script type="text/x-kendo-template" id="templateToolbarCursillo">
                <div class="toolbar">
                    <input type ="button" id="botonCrearCursillo" class="k-button" value="Crear Cursillo"/>
                
                </div>
      </script> 
    <script type="text/javascript" src="../../Scripts/jsactions/Eventos/cursillos.js"></script>
</asp:Content>
