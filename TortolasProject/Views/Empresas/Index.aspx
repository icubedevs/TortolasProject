<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="EmpresasIndexCss" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Empresas/EmpresasNav.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Empresas/EmpresasNew.css" rel="stylesheet" type="text/css" /> 
</asp:Content>

<asp:Content ID="EmpresasIndexScript" ContentPlaceHolderID="ScriptContent" runat="server">
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Empresas/EmpresasNav.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Empresas/EmpresasIndex.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Empresas/NuevaEmpresa.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Asociaciones/Asociaciones.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Proveedores/Proveedores.js") %>" type="text/javascript"></script>
    <script src="<%: Url.Content("~/Scripts/jsactions/Empresas/Patrocinadores/Patrocinadores.js") %>" type="text/javascript"></script>
</asp:Content>

<asp:Content ID="EmpresasIndexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Gestión de Empresas
</asp:Content>

<asp:Content ID="EmpresasIndexMain" ContentPlaceHolderID="MainContent" runat="server">
     <div id="EmpresasNavegador" class="k-widget">
        <ul>
            <li id="EmpresasNav" class="k-state-active">
                Empresas
            </li>
            <li id="AsociacionesNav">
                Asociaciones
            </li>
            <li id="ProveedoresNav">
                Proveedores
            </li>
            <li id="PatrocinadoresNav">
                Patrocinadores
            </li>  
        </ul> 
        <div class="pestana" id="empresas">
            <img src="../../Content/images/empresas.png"  /> <!--Fuente: Calibri, size: 24-->
            <div id="EmpresasGrid">
            
            </div>
            <br />
            <div id="EmpresasHerramientasContent">
                <input type="button" value="Nueva Empresa" id="BotonNuevaEmpresa" class="k-button" />
            </div>
        </div>
        <div class="pestana" id="asociaciones">
            <img src="../../Content/images/asociaciones.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="AsociacionesGrid">
            
            </div>
            <br />
            <div id="AsociacionesHerramientasContent">
                <input type="button" value="Nueva Asociación" id="BotonNuevaAsociacion" class="k-button" />
            </div>
        </div>
        <div class="pestana" id="proveedores">
            <img src="../../Content/images/proveedores.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="ProveedoresGrid">
            
            </div>
            <br />
            <div id="ProveedorHerramientasContent">
                <input type="button" value="Nueva Proveedor" id="BotonNuevoProveedor" class="k-button" />
            </div>
        </div> 
        <div class="pestana" id="patrocinadores">
            <img src="../../Content/images/patrocinador.jpg"  /> <!--Fuente: Calibri, size: 24-->
            <div id="PatrocinadoresGrid">
            
            </div>
            <br />
            <div id="PatrocinadorHerramientasContent">
                <input type="button" value="Nueva Patrocinador" id="BotonNuevoPatrocinador" class="k-button" />
            </div>
        </div> 
          
    </div> 
    <br />

    <div id="VentanaEditar">
        <b><h5>Datos Proveedor</h5></b>
        <br />
        <label for="nombreempresa">Nombre: </label><input type="text" id="nombreempresa" class="k-input CuadroTexto" /><br />
        <label for="cif">CIF: </label><input type="text" id="cif" class="k-input CuadroTexto" /><br />
        <label for="localidad">Localidad: </label><input type="text" id="localidad" class="k-input CuadroTexto" /><br />
        <label for="direccionweb">Dirección Web: </label><input type="text" id="direccionweb" class="k-input CuadroTexto" /><br />
        <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="telefonodecontacto" class="k-input CuadroTexto" /><br />
        <label for="email">E-Mail: </label><input type="text" id="email-c" class="k-input CuadroTexto" /><br />
        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditar" class="k-button VisibilidadBotonAceptarEditar" />
            <input type="button" value="Confirmar" id="BotonAceptarVentanaEliminar" class="k-button VisibilidadBotonAceptarEliminar" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditar" class="k-button" />           
        </center>
    </div>

    <div id="VentanaEditarAsociacion">
        <b><h5>Datos Asociacion</h5></b>
        <br />
        <label for="nombreempresaasociacion">Nombre: </label><input type="text" id="nombreempresaasociacion" class="k-input CuadroTexto NoModificable nombreempresaasociacion" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifremoto" class="k-input CuadroTexto NoModificable cifremoto" /> <input type="button" value="Vincular Empresa" id="BotonVincularEmpresaDesdeAsociacion" class="k-button VisibilidadBotonVincularEmpresa " /><br />
        <label for="direccion">Dirección: </label><input type="text" id="direccion" class="k-input CuadroTexto" /><br />
        <label for="tematica">Temática: </label><input type="text" id="tematica" class="k-input CuadroTexto" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="telefonoremoto" class="k-input CuadroTexto VisibilidadTelefonodeContacto NoModificable" /><br />
        <hr />

        <div id="DatosNuevaEmpresaRemota" class="VisibilidadDatosNuevaEmpresaRemota">
            <b><h5>Datos Empresa Asociada</h5></b>
            <br />
            <label for="localidad">Localidad: </label><input type="text" id="localidadremota" class="k-input CuadroTexto localidadremota" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="dirwebremota" class="k-input CuadroTexto dirwebremota" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="telefonoremoto2" class="k-input CuadroTexto telefonoremoto2" /><br />
            <label for="email">E-Mail: </label><input type="text" id="emailremoto" class="k-input CuadroTexto emailremoto" /><br />
        </div>

        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarAsociacion" class="k-button VisibilidadBotonAceptarEditar" />
            <input type="button" value="Confirmar" id="BotonAceptarVentanaEliminarAsociacion" class="k-button VisibilidadBotonAceptarEliminar" />
            <input type="button" value="Crear" id="BotonAceptarVentanaCrearAsociacion" class="k-button VisibilidadBotonAceptarCrear" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarAsociacion" class="k-button" />           
        </center>

        
    </div>

    <div id="VentanaEditarProveedor">
        <b><h5>Datos Proveedor</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombreempresaproveedor" class="k-input CuadroTexto NoModificable" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifproveedor" class="k-input CuadroTexto NoModificable" /><br />
        <label for="direccion">Dirección Física: </label><input type="text" id="dirfisica" class="k-input CuadroTexto" /><br />
        <label for="mercado">Mercado: </label><input type="text" id="mercado" class="k-input CuadroTexto" /><br />
        <label for="codigopostal">Código Postal: </label><input type="text" id="codigopostal" class="k-input CuadroTexto VisibilidadTelefonodeContacto" /><br />
        <br />
        <hr />
        <br />


        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarProveedor" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarProveedor" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaEliminarProveedor">
        <b><h5>Datos Proveedor</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombreempresaproveedoreliminar" class="k-input CuadroTexto NoModificable" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifproveedoreliminar" class="k-input CuadroTexto NoModificable" /><br />
        <label for="direccion">Dirección Física: </label><input type="text" id="direccionproveedoreliminar" class="k-input CuadroTexto" /><br />
        <label for="mercado">Mercado: </label><input type="text" id="mercadoproveedoreliminar" class="k-input CuadroTexto" /><br />
        <label for="codigopostal">Código Postal: </label><input type="text" id="codigopostalproveedoreliminar" class="k-input CuadroTexto VisibilidadTelefonodeContacto" /><br />
        <br />
        <hr />
        <br />


        <center>
            <input type="button" value="Eliminar" id="BotonAceptarVentanaEliminarProveedor" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEliminarProveedor" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaCrearProveedor">
        <b><h5>Datos Proveedor</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nuevoproveedornombre" class="k-input CuadroTexto NoModificable nombreempresaasociacion" /><br />
        <label for="cif">CIF: </label><input type="text" id="nuevoproveedorcif" class="k-input CuadroTexto NoModificable cifremoto" /> <input type="button" value="Vincular Empresa" id="BotonVincularEmpresaDesdeProveedor" class="k-button" /><br />
        <label for="direccion">Dirección Física: </label><input type="text" id="nuevoproveedordir" class="k-input CuadroTexto" /><br />
        <label for="mercado">Mercado: </label><input type="text" id="nuevoproveedormercado" class="k-input CuadroTexto" /><br />
        <label for="codigopostal">Código Postal: </label><input type="text" id="nuevoproveedorcpostal" class="k-input CuadroTexto" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="nuevoproveedortlf" class="k-input CuadroTexto VisibilidadTelefonodeContacto NoModificable" /><br />
        <br />
        <hr />
        <br />
        
        <div id="DatosNuevaEmpresaRemota2" class="VisibilidadDatosNuevaEmpresaRemota">
            <b><h5>Datos Empresa Asociada</h5></b>
            <br />
            <label for="localidad">Localidad: </label><input type="text" id="nuevoproveedorlocalidad" class="k-input CuadroTexto localidadremota" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="nuevoproveedorweb" class="k-input CuadroTexto dirwebremota" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="telefonoempresa" class="k-input CuadroTexto telefonoremoto2" /><br />
            <label for="email">E-Mail: </label><input type="text" id="nuevoproveedoremail" class="k-input CuadroTexto emailremoto" /><br />
        </div>

        <center>
            <input type="button" value="Crear" id="BotonAceptarVentanaCrearProveedor" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaCrearProveedor" class="k-button FuncionBotonCancelarProveedores" />          
        </center>
    </div>

    <div id="VentanaEditarPatrocinador">
        <b><h5>Datos Patrocinador</h5></b>
        <br />
        <label for="nombreempresapatrocinadoreditar">Nombre: </label><input type="text" id="nombreempresapatrocinadoreditar" class="k-input CuadroTexto NoModificable" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifpatrocinadoreditar" class="k-input CuadroTexto NoModificable" /><br />
        <label for="localizacion">Localización Publicidad: </label><input type="text" id="locpatrocinadoreditar" class="k-input CuadroTexto" /><br />
        <br />
        <hr />
        <br />
        <center>
            <input type="button" value="Aceptar" id="BotonAceptarVentanaEditarpatrocinador" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEditarpatrocinador" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaEliminarPatrocinador">
        <b><h5>Datos Patrocinador</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombrepatrocinadoreliminar" class="k-input CuadroTexto NoModificable" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifpatrocinadoreliinar" class="k-input CuadroTexto NoModificable" /><br />
        <label for="localizacion">Localización Publicidad: </label><input type="text" id="lopatrocinadoreliminar" class="k-input CuadroTexto" /><br />
        <br />
        <hr />
        <br />


        <center>
            <input type="button" value="Eliminar" id="BotonAceptarVentanaEliminarPatrocinador" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaEliminarPatrocinador" class="k-button FuncionBotonCancelarProveedores" />    
        </center>
    </div>

    <div id="VentanaCrearPatrocinador">
        <b><h5>Datos Patrocinador</h5></b>
        <br />
        <label for="nombreempresaproveedor">Nombre: </label><input type="text" id="nombrepatrocinadornuevo" class="k-input CuadroTexto NoModificable nombreempresaasociacion" /><br />
        <label for="cif">CIF: </label><input type="text" id="cifpatrocinadornuevo" class="k-input CuadroTexto NoModificable cifremoto" /> <input type="button" value="Vincular Empresa" id="BotonVincularEmpresaDesdePatrocinador" class="k-button" /><br />
        <label for="loc">Localización Publicidad: </label><input type="text" id="locpatrocinadornuevo" class="k-input CuadroTexto" /><br />
        <label for="telefono" class="VisibilidadTelefonodeContacto">Teléfono de Contacto: </label><input type="text" id="tlfpatrocinadornuevo" class="k-input CuadroTexto VisibilidadTelefonodeContacto NoModificable" /><br />
        <br />
        <hr />
        <br />
        
        <div id="DatosNuevaEmpresaRemota3" class="VisibilidadDatosNuevaEmpresaRemota">
            <b><h5>Datos Empresa Asociada</h5></b>
            <br />
            <label for="localidad">Localidad: </label><input type="text" id="patrocinadorlocalidadremoto" class="k-input CuadroTexto localidadremota" /><br />
            <label for="direccionweb">Dirección Web: </label><input type="text" id="patrocinadorwebremoto" class="k-input CuadroTexto dirwebremota" /><br />
            <label for="telefonodecontacto">Teléfono de Contacto: </label><input type="text" id="patrocinadortflremoto" class="k-input CuadroTexto telefonoremoto2" /><br />
            <label for="email">E-Mail: </label><input type="text" id="patrocinadoremailremoto" class="k-input CuadroTexto emailremoto" /><br />
        </div>

        <center>
            <input type="button" value="Crear" id="BotonAceptarVentanaCrearPatrocinador" class="k-button" />
            <input type="button" value="Cancelar" id="BotonCancelarVentanaCrearPatrocinador" class="k-button FuncionBotonCancelarProveedores" />          
        </center>
    </div>
    
    <div id="NuevaEmpresaFormulario" >
    
    </div>

    <div id="VentanaEmpresasRemota">
        <div id="EmpresasGridRemoto" class="VisibilidadGridEmpresasRemota">
    
        </div>
    </div>
    
</asp:Content>