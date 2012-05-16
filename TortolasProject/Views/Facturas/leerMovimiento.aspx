<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<TortolasProject.Models.Movimiento>" %>

<asp:Content ID="MovimientoTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Movimiento
</asp:Content>

<asp:Content ID="MovimientoMainContent" ContentPlaceHolderID="MainContent" runat="server">
    <div id='volverButton' class='k-button' onclick='history.back();'>Volver</div><br />
    <br />
    <br />
    <% if (Model.FKFactura != null)
       { 
    %>
    <div id='factura'><%: Html.ActionLink("Ver factura asociada", "leerFactura", "Facturas", new { id = Model.FKFactura.ToString() }, new { @class = "k-button" })%></div>
    </div>
    <% } %>

    <div id='fechaContainer'>
    <label id='fechaLabel'>Fecha</label><div id='fecha'><% Response.Write(Model.Fecha.ToShortDateString()); %></div>
    </div>
    <div id='facturaContainer'>
    <div id='responsableContainer'>
    <label id='ResponsableLabel'>Responsable</label><div id='responsable'><% Response.Write(Model.ResponsableName); %></div><br />    
    </div>
    <div id='conceptoContainer'>
    <label id='ConceptoLabel'>Concepto</label><div id='concepto'><% Response.Write(Model.Concepto); %></div><br />
    </div>
    <div id='descripcionContainer'>
    <label id='DescripcionLabel'>Descripción</label><div id='descripcion'><% Response.Write(Model.Descripcion); %></div><br />
    </div>
    <div id='totalContainer'>
    <label id='TotalLabel'>Importe</label><div id='total'><% Response.Write(Model.Total); %></div>
    </div>
</asp:Content>

<asp:Content ID="MovimientoCssContent" ContentPlaceHolderID="CssContent" runat="server">
</asp:Content>

<asp:Content ID="MovimientoScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
</asp:Content>
