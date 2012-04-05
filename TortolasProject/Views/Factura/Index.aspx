<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="FacturasTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión de facturas
</asp:Content>

<asp:Content ID="FacturaMainContent" ContentPlaceHolderID="MainContent" runat="server">


    <asp:LinqDataSource ID="LinqDataSource1" runat="server">
    </asp:LinqDataSource>

</asp:Content>
