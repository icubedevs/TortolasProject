<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
Eventos
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPruebaizquierda" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="MainContent" runat="server">
    
    <asp:Button ID="Button1" runat="server" Text="Button" />
    <div id="crudTable">
        <table ID="tbeventos" class="crud">
            <tr class="crudCabecera">
                <th>Nombre</th>
                <th>CIF</th>
                <th>Direccion</th>
                <th></th>
            </tr>

            <tr class="crudPar">
                <td>Google</td>
                <td>1</td>
                <td>Spay</td>
                <td class="crudButtons">
                    <asp:ImageButton ID="ImageButton1" ImageUrl="../../Content/icons/delete.ico" runat="server" />
                 </td>
            </tr>
            <tr class="crudImpar">
                <td>Facebook</td>
                <td>122</td>
                <td>USA</td>
                <td class="crudButtons">Editar Eliminar</td>
            </tr>
        </table>
        <asp:Button ID="ButtonNew" runat="server" Text="Poya" />
    </div>
</asp:Content>
