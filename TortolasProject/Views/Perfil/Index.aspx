<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    [MTB-MALAGA] Perfil de Usuario
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div id="pestanasPerfil" class="k-widget">
    <ul>
        <li class="k-state-active">Informacion</li>
        <li>Socio</li>
        <li>Mensajes</li>
        <li>Estadisticas</li>
        <li>Rutas</li>
    </ul>
    <div class="pestana" id="informacion"></div>
    <div class="pestana" id="socio"></div>
    <div class="pestana" id="mensajes">
        <img class="titulotab" src="../../Content/images/emailBIG_titulo.png"  />
        <br /><br />
        <h3>Mensajes No Leidos</h3>
        <div id="tablaMensajesNoLeidos"></div><br /><br />
        <h3>Mensajes Leidos</h3>
        <div id="tablaMensajesLeidos"></div><br /><br />
        <textarea id="asuntoMensaje" class="areaTexto" readonly rows="1" cols="95" Placeholder="Asunto"></textarea>
        <textarea id="resultadoMensaje" class="areaTexto" readonly rows="6" cols="95" Placeholder="Cuerpo del mensaje"></textarea>
    </div>
    <div class="pestana" id="estadisticas"></div>
    <div class="pestana" id="rutas"></div>
</div>

<div id="ventanaCrear" class="ventana">
    <div class="ventana">
        <label for="campoDestinatario"> Destinatario</label><input type="text" class="k-textbox" id="campoDestinatario" /><br /><br />
        <label for="campoAsunto"> Asunto</label<><input type="text" class="k-textbox" id="campoAsunto" size="70"/><br /><br />
        <textarea id="campoCuerpoMensaje" rows="10" cols="60"></textarea><br />
       <center><input type="button" id="enviarMensaje" class="k-button" value="Enviar Mensaje" /></center> 
    </div>
</div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Perfil/Perfil.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">

<script type="text/x-kendo-template" id="templateToolbarMensajeNoLeidos">
    <div class="toolbarIzq">
        <input type="button" class="k-button componerMensaje" value="+ Componer Mensaje">
        <input type="button" class="k-button" value="Marcar Leido" id="botonMarcarLeido">
    </div>
    <div class="toolbarDer">
        Mensajes por Pagina
        <input type="text" class="k-textbox comboPageSize" id="comboPageSizeNoLeido">
    </div>
</script>

<script type="text/x-kendo-template" id="templateToolbarMensajeLeidos">
    <div class="toolbarIzq">
        <input type="button" class="k-button componerMensaje" value="+ Componer Mensaje">
        <input type="button" class="k-button" value="Marcar No Leido" id="botonMarcarNoLeido">
    </div>
    <div class="toolbarDer">
        Mensajes por Pagina
        <input type="text" class="k-textbox comboPageSize" id="comboPageSizeLeido">
    </div>
</script>  

<script src="../../Scripts/jsactions/Perfil/Perfil.js" ></script>
<script src="../../Scripts/jsactions/Perfil/Mensajeria.js" ></script>

<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.common.min.css" />
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.default.min.css" />

</asp:Content>
