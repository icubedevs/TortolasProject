<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión de facturas
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <table>
            <tr>
                <th></th>
                <th>
                    GUID
                </th>
                <th>
                    Estado
                </th>
            </tr>

        <% foreach (var item in Model) { %>
    
            <tr>
                <td>
                    <%: Html.ActionLink("Edit", "Edit", new { id=item.idEstadoFactura }) %> |
                    <%: Html.ActionLink("Details", "Details", new { id=item.idEstadoFactura })%> |
                    <%: Html.ActionLink("Delete", "Delete", new { id=item.idEstadoFactura })%>
                </td>
                <td>
                    <%: item.idEstadoFactura %>
                </td>
                <td>
                    <%: item.Nombre %>
                </td>
            </tr>
    
        <% } %>

        </table>

        <p>
            <%: Html.ActionLink("Create New", "Create") %>
        </p>
</asp:Content>
