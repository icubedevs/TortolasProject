<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id='nuevaFacturaForm'>
    <div id='nuevaFacturaHeader'>
        <div id='relacionesNuevaFacturaContainer'>
            <div id='usuarioNuevaFacturaDiv'>
                Usuario     <input id='usuarioNuevaFacturaAutocomplete' />
            </div>
            <div id='socioNuevaFacturaDiv'>
                Socio       <input id='socioNuevaFacturaAutocomplete' />
            </div>
            <div id='eventoNuevaFacturaDiv'>
                Evento     <input id='eventoNuevaFacturaAutocomplete' />
            </div>
            <div id='pedidoNuevaFacturaDiv'>
                Pedido    <input id='pedidoNuevaFacturaAutocomplete' />
            </div>
        </div>

        <div id='fechaNuevaFacturaDiv'>
            Fecha       <input id='fechaNuevaFactura' />
        </div>
        <div id='conceptoNuevaFacturaDiv'>
            Concepto    <input type='text' id='conceptoNuevaFactura' class='inputText' />   
        </div>
        <div id='totalNuevaFacturaDiv'>
            Cuantía     <input type='text' id='totalNuevaFactura' class='inputText' />      
        </div>
        <div id='nuevaFacturaAñadirNuevaLineaFacturaButton'>
            + Línea factura
        </div>
    </div>
    <div id='nuevaFacturaLineasFacturaContainer'>
        
    </div>

    <div id='nuevaFacturaBottom'>
        <div id='descartarNuevaFacturaButton'>Descartar</div>
        <div id='guardarNuevaFacturaButton'>Guardar</div>
    </div>
</div>