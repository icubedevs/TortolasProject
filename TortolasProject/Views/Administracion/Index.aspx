<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Index
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<h2>Index</h2>

<div id="tabAdmin">

</div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">
<script src="../../Scripts/jsactions/Administracion/Administracion.js" ></script>
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.common.min.css" />
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.default.min.css" />

</asp:Content>
