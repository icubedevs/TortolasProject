<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id ="FormularioCrear">
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
        <input type="button" value="Aceptar" id="BotonAceptarFormularioCrear" class="k-button" />
        <input type="button" value="Cancelar" id="BotonCancelarFormularioCrear" class="k-button" />
    </center>
</div>