<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Página principal
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%: ViewBag.Message %></h2>
    <p>
        Para obtener más información sobre ASP.NET MVC, visite el <a href="http://asp.net/mvc" title="sitio web de ASP.NET MVC">http://asp.net/mvc</a>.
    </p>
</asp:Content>
