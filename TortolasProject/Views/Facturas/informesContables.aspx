<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="informesTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Informes contables
</asp:Content>

<asp:Content ID="informesMainContent" ContentPlaceHolderID="MainContent" runat="server">
 <%Html.RenderPartial("facturasNav"); %>
 <div id="InformesContainer"> 


 </div>
</asp:Content>

<asp:Content ID="informesCssContent" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Facturas/facturasNav.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="informesScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
</asp:Content>
