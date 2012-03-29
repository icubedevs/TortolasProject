<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%
    if (Request.IsAuthenticated) {
%>
<!-- CUIDADO! Al tener float:right el orden es: de arriba hacia abajo en la página sale de derecha a izquierda -->
        <div id="logOutButton">
            <%: Html.ActionLink("Cerrar sesión", "LogOff", "Account") %> 
        </div>
        <div id="messageContainer">
            No tiene mensajes
        </div>
        <div id="userNameLabel">
            <strong><%: Page.User.Identity.Name %></strong>
        </div>
<%
    }
    else {
%> 
        <div id="logInButton">
            <%: Html.ActionLink("Iniciar sesión", "LogOn", "Account") %>
        </div>
<%
    }
%>
