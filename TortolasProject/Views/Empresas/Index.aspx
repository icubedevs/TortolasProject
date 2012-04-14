<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión Empresas
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <table>
        <tr>
            <th>
            </th>
            <th>
                Nombre
            </th>
            <th>
                CIF
            </th>
            <th>
                Localidad
            </th>
            <th>
                Dirección Web
            </th>
            <th>
                Teléfono de Contacto
            </th>
            <th>
                E-mail
            </th>
        </tr>
        <% foreach (var item in Model)
           { %>
                <tr>
                    <td>
                            <%: Html.ActionLink("Edit", "Edit", new { id = item.CIF })%> |
                            <%: Html.ActionLink("Details", "Details", new { id = item.CIF })%> |
                            <%: Html.ActionLink("Delete", "Delete", new { id = item.CIF })%>
                    </td>
                    <td>
                        <%: item.Nombre%>
                    </td>
                    <td>
                        <%: item.CIF%>
                    </td>
                    <td>
                        <%: item.Localidad%>
                    </td>
                    <td>
                        <%: item.DireccionWeb%>
                    </td>
                    <td>
                        <%: item.TelefonodeContacto%>
                    </td>
                    <td>
                        <%: item.Email%>
                    </td>
                 </tr>
        <% } %>
    </table>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#buttonAjax").click(function () {

                $.ajax({
                    type: "POST",
                    url: "Empresas/Prueba",
                    data: { texto: "hola", numero: 1 }
                }).success(function (data) {
                    $("#pruebaAjax").append(data);
                });
            });
        });
    
    </script>
    <input id="buttonAjax" type="button" value="AJAX" />
    <div id="pruebaAjax"></div>

</asp:Content>
