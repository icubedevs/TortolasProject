<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
Prueba1
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
Prueba de texto
<asp:HyperLink id="hyperlink2" 
                  NavigateUrl="http://www.google.com"
                  Text="Pruebecita"
                  Target="_new"
                  runat="server"/>

<%: Html.ActionLink("Pruebaal", "Index", "Home")%>

</asp:Content>

<asp:Content ID="Iperiquito" ContentPlaceHolderID="ContentPruebaizquierda" runat="server">
Prueba1

</asp:Content>


