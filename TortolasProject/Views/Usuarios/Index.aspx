<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    [MTB] Administracion de Usuarios
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <img src="../../Content/images/titulousuarios.png" /><br /><br />
    
    <div id="tablaAdminUsuarios"></div>


    <div id="ventanaNuevoUsuario" class="ventana">
        <div class="ventanaWrapper">
            <center><img src="../../Content/images/user-new.png" /></center> <br />
            <h4>Para crear un nuevo Usuario rellene el Nickname y el Email.</h4><br />
                El resto de campos de informacion deberan ser rellenados al loguearse en la Aplicacion.
            <br /><br />
            <div id="formularioNuevoUsuario">
                <label for="nuevoNickname">Nickname : </label><input type="text" class="k-textbox nuevoUsuario" placeholder="Apodo del Usuario" id="nuevoNickname" /><br />
                <label for="nuevoEmail">Email : </label><input type="text" class="k-textbox nuevoUsuario" placeholder="Email del Usuario" id="nuevoEmail" />
                <br /><br />
                <input type="button" id="botonNuevoUsuario" class="k-button" value="Crear Usuario"/>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
    <link href="../../Content/Usuarios/Usuarios.css" rel="stylesheet" type="text/css" />
    <link href="../../Content/Administracion/Usuarios/Usuarios.css" rel="stylesheet" type="text/css" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">    
    <script src="../../Scripts/jsactions/Administracion/Usuarios/AdminUsuarios.js"></script>

    <!-- Barra de herramientas de la tabla de Administracion de Usuario -->
    <script type="text/x-kendo-template" id="templateToolbarAdminUsuario">
    <div class="toolbarAdminUsuarios">        
            <input type="button" class="k-button" id="nuevoUsuarioToolbar" value="+ Nuevo Usuario">
            <input type="button" class="k-button" id="nuevoSocioToolbar" value="Crear y Enlazar Socio">
            <input type="button" class="k-button" id="nuevoJuntaDirectivaToolbar" value="Ingresar Junta Directiva">    
    </div>
    </script>

    <!-- Kendo Template para detalles de Usuario -->
    <!-- KENDO TEMPLATE DE VISTA DE DETALLES DE LA TABLA -->
    <script type="text/x-kendo-template" id="templateDetailAdminUsuario">
                <div class="tabsUsuario">
                    <ul>
                        <li class="k-state-active">
                           Informacion
                        </li>
                        <li>
                            Socio
                        </li>
                    </ul>                    
                    <div class="tabInformacionUsuario">                                               
                        <div class='informacionUsuario'>
                        
                            <table>                                                 
                            <tr>
                            <td>
                                <img src="#= Avatar #" width="180" height="150" style="float:left">
                            </td>
                            <td>
                                <li><label>Nombre:</label>#= Nombre #</li>
                                <li><label>Apellidos:</label>#= Apellidos #</li>
                                <li><label>DNI:</label>#= DNI #</li>
                                <li><label>Email:</label>#= Email #</li>
                                <li><label>Fecha de Nacimiento:</label>#= FechaNacimiento #</li>
                                <li><label>Sexo:</label>#= Sexo #</li>
                                <li><label>Nacionalidad:</label>#= Nacionalidad#</li>
                                <li><label>Provincia:</label>#= Provincia #</li>
                                <li><label>Localidad:</label>#= Localidad #</li>                            
                                <li><label>Direccion:</label>#= Direccion #</li>
                                <li><label>Sitio Web:</label>#= SitioWeb #</li>                            
                                <li><label>Facebook:</label>#= Facebook #</li>
                                <li><label>Twitter:</label>#= Twitter #</li>
                                <li><label>Google Plus:</label>#= GooglePlus #</li>
                                <li><label>Skype:</label>#= Skype #</li>
                            
                            </td>
                            </tr>
                            </table>                          

                        </div>
                    </div>
                    <div>
                        <div class="tabSocio_#= idUsuario #">
                            <div class="esSocio">
                              <center>
                                <img src="../../Content/images/exclamacion.png" width="100"/><h2>¡Este Usuario no es Socio!</h2><br /><br />
                                Puede crear un nuevo Socio y enlazar esa ficha de Socio a este usuario. Para hacerlo pulse el boton de abajo
                                y rellene los campos oportunos.<br /><br />

                                <input type="button" class="k-button botonCrearEnlazarSocio" value="Crear Socio y enlazar">
                                </center>
                            </div>
                            <div class="noEsSocio">
                                        <div class="carnet">
                                            <div class="fotoCarnet"><img src="../../Content/images/usuarios/darthvader_1600.jpg" width="180" height="150" /></div>
                                            <div class="camposCarnet">
                                                <div class="carnetNumeroSocio">Numero de Socio : </div>
                                                <div class="carnetFechaAlta">Fecha de Alta :</div>
                                                <div class="carnetNombre">Nombre :</div>
                                                <div class="carnetApellidos">Apellidos : </div>
                                                <div class="carnetDNI">DNI : </div>
                                            </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
    </script> 
</asp:Content>
