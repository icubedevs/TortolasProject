<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="facturaTitleContent" ContentPlaceHolderID="TitleContent" runat="server">
    Nueva factura
</asp:Content>

<asp:Content ID="facturaCssContent" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Facturas/factura.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="facturaScriptContent" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Facturas/facturasNueva.js") %>" type="text/javascript"></script>
</asp:Content>


<asp:Content ID="facturaMainContent" ContentPlaceHolderID="MainContent" runat="server">

<div id='facturaForm'>
    <div id='facturaHeader'>
        <div id='relacionesFacturaContainer'>
            <div id='relacionesButton' class='k-button'>Añadir relación</div>
            <div id='relacionesExistentesDiv'>
                    <div id='relacionDiv'></div>
                    <div id='quitarRelacionButton' class='k-button'> X </div>
            </div>
          

            
            <!-- Ventana de relaciones  -->
            <div id='relacionesWindow'>
                <div id='relacionesTab'>
                    <ul>
                        <li class="k-state-active">Usuarios</li>
                        <li>Eventos</li>
                        <li>Cursillos</li>
                        <li>Pedidos globales</li>
                        <li>Pedidos usuario</li>
                    </ul>
                    <div id='usuariosFacturaDiv'>
                        <div id='usuariosFacturaGrid'></div>                        
                    </div>
                    <div id='eventosFacturaDiv'>
                        <div id='eventosFacturaGrid'></div>
                    </div>
                    <div id='cursillosFacturaDiv'>
                        <div id='cursillosFacturaGrid'></div>
                    </div>
                    <div id='pedidosGlobalesDiv'>
                        <div id='pedidosGlobalesGrid'></div>
                    </div>
                    <div id='pedidosUsuarioDiv'>
                        <div id='pedidosUsuarioGrid'></div>
                    </div>
                </div>  
                <div id='windowSelectButton' class='k-button'>+ Añadir</div>              
            </div>  
            <!--                        -->

        </div>

        <div id='fechaFacturaDiv'>
            Fecha       <input id='fechaFactura' />
        </div>
        <div id='conceptoFacturaDiv'>
            Concepto    <input type='text' id='conceptoFactura' class='k-input' />   
        </div>
    </div>

    <div id='nuevaLineaButton'>Nueva línea</div>
    <div id='facturaLineasFacturaGrid'>
    </div>
    <div id='totalFacturaDiv'>
            Cuantía     <input type='text' id='totalFactura' class='inputText' />      
    </div>

    <div id='facturaBottom'>
        <div id='descartarFacturaButton' class='k-button'>Descartar</div>
        <div id='guardarFacturaButton' class='k-button'>Guardar</div>
    </div>
</div>

</asp:Content>