<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>
<div id="FacturasNav">
        <div id="mainFacturasNav">
            <ul>                
                <li id="facturasButtonNav"><%: Html.ActionLink("Facturas", "Index", "Facturas") %></li>
                <li id="movimientosButtonNav"><%: Html.ActionLink("Movimientos", "Movimientos", "Facturas") %></li>
                <li id="graficosContablesButtonNav"><%: Html.ActionLink("Gráficos contables", "graficosContables", "Facturas") %></li>
                <li id="informesContablesButtonNav"><%: Html.ActionLink("Informes contables", "informesContables", "Facturas") %></li>
            </ul>            
        </div>
        <!-- 
        <div id="volverFacturasNav">
            <ul>
                <li id="volverFacturaButtonNav">< Volver</li>
            </ul>
        </div>
        -->
    </div>
