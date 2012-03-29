<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%
    if (Request.IsAuthenticated) {
%>
        ¡Hola <strong><%: Page.User.Identity.Name %></strong>!
        [ <%: Html.ActionLink("Cerrar sesión", "LogOff", "Account") %> ]
<%
    }
    else {
%> 
        [ <%: Html.ActionLink("Iniciar sesión", "LogOn", "Account") %> ]
<%
    }
%>
