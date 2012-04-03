<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Light.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Página principal
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: ViewBag.Message %></h2>
    <p>
        Prueba migue <a href="http://asp.net/mvc" title="sitio web de ASP.NET MVC">http://asp.net/mvc</a>.
    </p>
</asp:Content>
