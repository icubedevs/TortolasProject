﻿<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<dynamic>" %>

<div id="NuevaEmpresaFormulario2">
    <div id="NuevaEmpresaRellenar">
        <div id="NuevaEmpresaDatosEmpresa">
            <label for="nombreempresa">Nombre: </label><input type="text" id="nombreempresa" class="k-input" /><br />
            <label for="cif">CIF: </label><input type="text" id="cif" class="k-input" /><br />
            <label for="localidad">Localidad: </label><input type="text" id="localidad" class="k-input" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="direccionweb" class="k-input" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="telefonodecontacto" class="k-input" /><br />
            <label for="email">E-Mail: </label><input type="text" id="email-c" class="k-input" /><br />
        </div>
        <div id="NuevaEmpresaImagenEmpresa">        

            LOGOTIPO EMPRESA
        
        </div>
    </div>
    
    <div id="NuevaEmpresaHerramientasContent">
        <center>
            <input type="button" value="Confirmar" id="BotonConfirmarNuevaEmpresa" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarNuevaEmpresa" class="k-button" />
        </center>
    </div>
</div>
