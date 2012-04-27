<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="EventosIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Eventos
</asp:Content>

<asp:Content ID="EventosIndexMain" ContentPlaceHolderID="MainContent" runat="server">
<div id="Eventostabla">

</div>
<div id="FormularioCreacion"></div>

<div id ="VentanaEditar">
    <label for="Titulo">Titulo: </label><input type="text" id="Titulo" class="k-input" /><br />
    <label for="Lugar">Lugar: </label><input type="text" id="Lugar" class="k-input" /><br />
    <label for="FechaRealizacion">Fecha: </label><input type="text" id="FechaRealizacion" class="k-input" /><br />
    <label for="FechaAperturaInscrip">Fecha de apertura de incripción: </label><input type="text" id="FechaAperturaInscrip" class="k-input" /><br />
    <label for="FechaLimiteInscrip">Fecha límite de inscripción: </label><input type="text" id="FechaLimiteInscrip" class="k-input" /><br />
    <label for="Plazas">Plazas libres: </label><input type="text" id="Plazas" class="k-input" /><br />
    <label for="PrioridadSocios">Prioridad para socios: </label><input type="select" id="PrioridadSocios" class="dropdown" /><br />
    <label for="Actividad">Actividad: </label><textarea id="editor" rows="10" cols="30" style="width:740px;height:440px"> </textarea>

    <center>
        <input type="button" value="Aceptar" id="BotonAceptarVentanaEditar" class="k-button" />
        <input type="button" value="Cancelar" id="BotonCancelarVentanaEditar" class="k-button" />
    </center>
</div>


</asp:Content>

<asp:Content ID="EventosIndexCss" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="EventosIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
     <script type="text/x-kendo-template" id="template">
                <div class="detallesEventosPestanas">
                    <ul>
                        <li>Detalles</li>
                        <li>Participantes</li>
                    </ul>
                    <div class="infoDetalles">
                             <ul>
                                <li><label>Título:</label>#= Titulo#</li>
                                <li><label>Lugar:</label>#= Lugar #</li>
                                <li><label>Fecha:</label>#= FechaRealizacion #</li>
                                <li><label>Fecha de apertura de inscripción:</label>#= FechaAperturaInscripcion #</li>
                                <li><label>Fecha límite de inscripción:</label>#= FechaLimiteInscripcion #</li>
                                <li><label>Plazas libres:</label>#= Plazas #</li>
                                <li><label>Prioridad socios:</label>#= PrioridadSocios #</li>
                                <li><label>Actividad:</label>#= Actividad #</li>
                                
                            </ul>
                        
                    </div>
                    <div class="infoParticipantes">
                    </div>
                </div>
     </script> 

     <script type="text/x-kendo-template" id="templateToolbarEvento">
                <div class="toolbar">
                    <input type ="button" id="botonCrearEvento" class="k-button" value="Crear Evento"/>
                
                </div>
      </script> 
    <script type="text/javascript" src="../../Scripts/jsactions/Eventos/eventos.js"></script>
</asp:Content>


