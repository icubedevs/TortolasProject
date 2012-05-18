<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" ValidateRequest="false" %>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    [MTB-MALAGA] Perfil de Usuario
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div id="pestanasPerfil" class="k-widget">
    <ul>
        <li class="k-state-active">Informacion</li>
        <li>Socio</li>
        <li>Mensajes</li>
        <li>Estadisticas</li>
        <li>Rutas</li>
    </ul>
    <div class="pestana" id="informacion">
    
       <img class="titulotab" src="../../Content/images/info_titulo.png"  />
       <br />    

       <div id="formularioIzquierda">
            
            <br />
                
            <h3>Información Usuario</h3>         
            <hr />
                        
            <label for="infoNickname">Nickname : </label><input type="text" class="k-textbox" placeholder="Nickname" id="infoNickname" readonly/><br />
            <label for="infoEmail">Email : </label><input type="text" class="k-textbox" placeholder="Email" id="infoEmail" readonly/><br />
            <i>Esta información no es modificable, para ello contacte con el servicio tecnico</i>
            <br /><br />

            <h3>Información Personal</h3>         
            <hr />
           
            <div class="infoUsuarioActualizable">
            <label for="infoNombre">Nombre : </label><input type="text" class="k-textbox requerido" placeholder="Nombre" id="infoNombre" required/><br />
            <label for="infoApellidos">Apellidos : </label><input type="text" class="k-textbox requerido" placeholder="Apellidos" id="infoApellidos" required/><br />
            <label for="infoDireccion">Direccion : </label><input type="text" class="k-textbox" placeholder="Direccion" id="infoDireccion" size="60"/><br /></div>
            <label for="infoFechaNacimiento">Fecha de Nacimiento : </label><input type="text" placeholder="Dia" id="diaPicker" /><input type="datetime" placeholder="Mes" id="mesPicker"/><input type="datetime" placeholder="Anno" id="annoPicker"/><br />            
            <label for="infoNacionalidad">Nacionalidad : </label>
            <select class="k-textbox" placeholder="Nacionalidad" id="infoNacionalidad" >
                    <option value="afghan">Afghan</option><option value="albanian">Albanian</option><option value="algerian">Algerian</option><option value="american">American</option><option value="andorran">Andorran</option><option value="angolan">Angolan</option><option value="antiguans">Antiguans</option><option value="argentinean">Argentinean</option><option value="armenian">Armenian</option><option value="australian">Australian</option><option value="austrian">Austrian</option><option value="azerbaijani">Azerbaijani</option><option value="bahamian">Bahamian</option><option value="bahraini">Bahraini</option><option value="bangladeshi">Bangladeshi</option><option value="barbadian">Barbadian</option><option value="barbudans">Barbudans</option><option value="batswana">Batswana</option><option value="belarusian">Belarusian</option><option value="belgian">Belgian</option><option value="belizean">Belizean</option><option value="beninese">Beninese</option><option value="bhutanese">Bhutanese</option><option value="bolivian">Bolivian</option><option value="bosnian">Bosnian</option><option value="brazilian">Brazilian</option><option value="british">British</option><option value="bruneian">Bruneian</option><option value="bulgarian">Bulgarian</option><option value="burkinabe">Burkinabe</option><option value="burmese">Burmese</option><option value="burundian">Burundian</option><option value="cambodian">Cambodian</option><option value="cameroonian">Cameroonian</option><option value="canadian">Canadian</option>  <option value="cape verdean">Cape Verdean</option><option value="central african">Central African</option><option value="chadian">Chadian</option><option value="chilean">Chilean</option><option value="chinese">Chinese</option><option value="colombian">Colombian</option><option value="comoran">Comoran</option><option value="congolese">Congolese</option><option value="costa rican">Costa Rican</option><option value="croatian">Croatian</option><option value="cuban">Cuban</option><option value="cypriot">Cypriot</option><option value="czech">Czech</option><option value="danish">Danish</option><option value="djibouti">Djibouti</option><option value="dominican">Dominican</option><option value="dutch">Dutch</option>  <option value="east timorese">East Timorese</option><option value="ecuadorean">Ecuadorean</option><option value="egyptian">Egyptian</option><option value="emirian">Emirian</option><option value="equatorial guinean">Equatorial Guinean</option><option value="eritrean">Eritrean</option><option value="estonian">Estonian</option><option value="ethiopian">Ethiopian</option><option value="fijian">Fijian</option><option value="filipino">Filipino</option><option value="finnish">Finnish</option><option value="french">French</option><option value="gabonese">Gabonese</option><option value="gambian">Gambian</option><option value="georgian">Georgian</option><option value="german">German</option><option value="ghanaian">Ghanaian</option><option value="greek">Greek</option><option value="grenadian">Grenadian</option><option value="guatemalan">Guatemalan</option><option value="guinea-bissauan">Guinea-Bissauan</option><option value="guinean">Guinean</option><option value="guyanese">Guyanese</option><option value="haitian">Haitian</option><option value="herzegovinian">Herzegovinian</option><option value="honduran">Honduran</option><option value="hungarian">Hungarian</option><option value="icelander">Icelander</option><option value="indian">Indian</option><option value="indonesian">Indonesian</option
                    <option value="iranian">Iranian</option><option value="iraqi">Iraqi</option><option value="irish">Irish</option><option value="israeli">Israeli</option><option value="italian">Italian</option><option value="ivorian">Ivorian</option><option value="jamaican">Jamaican</option><option value="japanese">Japanese</option><option value="jordanian">Jordanian</option><option value="kazakhstani">Kazakhstani</option><option value="kenyan">Kenyan</option><option value="kittian and nevisian">Kittian and Nevisian</option><option value="kuwaiti">Kuwaiti</option><option value="kyrgyz">Kyrgyz</option><option value="laotian">Laotian</option><option value="latvian">Latvian</option><option value="lebanese">Lebanese</option><option value="liberian">Liberian</option><option value="libyan">Libyan</option><option value="liechtensteiner">Liechtensteiner</option><option value="lithuanian">Lithuanian</option><option value="luxembourger">Luxembourger</option><option value="macedonian">Macedonian</option><option value="malagasy">Malagasy</option><option value="malawian">Malawian</option><option value="malaysian">Malaysian</option><option value="maldivan">Maldivan</option><option value="malian">Malian</option><option value="maltese">Maltese</option><option value="marshallese">Marshallese</option><option value="mauritanian">Mauritanian</option><option value="mauritian">Mauritian</option><option value="mexican">Mexican</option><option value="micronesian">Micronesian</option><option value="moldovan">Moldovan</option><option value="monacan">Monacan</option><option value="mongolian">Mongolian</option><option value="moroccan">Moroccan</option><option value="mosotho">Mosotho</option><option value="motswana">Motswana</option><option value="mozambican">Mozambican</option><option value="namibian">Namibian</option><option value="nauruan">Nauruan</option><option value="nepalese">Nepalese</option><option value="new zealander">New Zealander</option><option value="ni-vanuatu">Ni-Vanuatu</option><option value="nicaraguan">Nicaraguan</option><option value="nigerien">Nigerien</option><option value="north korean">North Korean</option><option value="northern irish">Northern Irish</option><option value="norwegian">Norwegian</option><option value="omani">Omani</option><option value="pakistani">Pakistani</option><option value="palauan">Palauan</option><option value="panamanian">Panamanian</option><option value="papua new guinean">Papua New Guinean</option><option value="paraguayan">Paraguayan</option><option value="peruvian">Peruvian</option><option value="polish">Polish</option><option value="portuguese">Portuguese</option><option value="qatari">Qatari</option><option value="romanian">Romanian</option><option value="russian">Russian</option><option value="rwandan">Rwandan</option><option value="saint lucian">Saint Lucian</option><option value="salvadoran">Salvadoran</option><option value="samoan">Samoan</option><option value="san marinese">San Marinese</option><option value="sao tomean">Sao Tomean</option><option value="saudi">Saudi</option><option value="scottish">Scottish</option><option value="senegalese">Senegalese</option><option value="serbian">Serbian</option><option value="seychellois">Seychellois</option><option value="sierra leonean">Sierra Leonean</option><option value="singaporean">Singaporean</option><option value="slovakian">Slovakian</option><option value="slovenian">Slovenian</option><option value="solomon islander">Solomon Islander</option><option value="somali">Somali</option><option value="south african">South African</option><option value="south korean">South Korean</option><option value="spanish">Spanish</option><option value="sri lankan">Sri Lankan</option><option value="sudanese">Sudanese</option><option value="surinamer">Surinamer</option><option value="swazi">Swazi</option><option value="swedish">Swedish</option><option value="swiss">Swiss</option><option value="syrian">Syrian</option><option value="taiwanese">Taiwanese</option><option value="tajik">Tajik</option><option value="tanzanian">Tanzanian</option><option value="thai">Thai</option><option value="togolese">Togolese</option><option value="tongan">Tongan</option><option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option><option value="tunisian">Tunisian</option><option value="turkish">Turkish</option><option value="tuvaluan">Tuvaluan</option><option value="ugandan">Ugandan</option><option value="ukrainian">Ukrainian</option><option value="uruguayan">Uruguayan</option><option value="uzbekistani">Uzbekistani</option><option value="venezuelan">Venezuelan</option><option value="vietnamese">Vietnamese</option><option value="welsh">Welsh</option><option value="yemenite">Yemenite</option><option value="zambian">Zambian</option><option value="zimbabwean">Zimbabwean</option>
            </select><br />
            <div class="infoUsuarioActualizable">
            <label for="infoSexo">Sexo : </label><input type="text" class="k-textbox" placeholder="Sexo" id="infoSexo"/><br />
            <label for="infoDNI">DNI : </label><input type="text" class="k-textbox" placeholder="DNI" id="infoDNI" min="9" /><br />                        
            <label for="infoProvincia">Provincia : </label><input type="text" class="k-textbox" placeholder="Provincia" id="infoProvincia"/><br />
            <label for="infoLocalidad">Localidad : </label><input type="text" class="k-textbox" placeholder="Localidad" id="infoLocalidad"/><br />            
            <br />            
            <h3>Información de Contacto y Redes</h3>
            <hr />
            <br />
            <label for="infoTelefono">Telefono : </label><input type="text" class="k-textbox" placeholder="Numero de telefono" id="infoTelefono" min="9" /> <br />            
            <label for="infoSitioWeb">Sitio Web: </label><input type="text" class="k-textbox" placeholder="Sitio Web" id="infoSitioWeb"  name="url"/> <br />
            <label for="infoFacebook">Facebook: </label><input type="text" class="k-textbox" placeholder="Facebook" id="infoFacebook"/><br />
            <label for="infoTwitter">Twitter: </label><input type="text" class="k-textbox" placeholder="Twitter" id="infoTwitter"/><br />
            <label for="infoGooglePlus">Google Plus: </label><input type="text" class="k-textbox" placeholder="GooglePlus" id="infoGooglePlus"/><br />
            <label for="infoSkype">Skype: </label><input type="text" class="k-textbox" placeholder="Skype" id="infoSkype"/><br />
            </div>
            <br />
            <hr />
            <br />
            <h3>Más información sobre ti</h3>
            <label for="infoAficiones"></label><textarea id="infoAficiones" placeholder="¡Escribe aqui tus aficiones! Da a conocer tus gustos" cols="70" rows="20"></textarea><br />
            <label for="infoExperiencias"></label><textarea id="infoExperiencias" placeholder="¡Escribe aqui tus hazañas y aventuras con tu bici!" cols="70" rows="20"></textarea><br />
            
            <br />
                
            <h3>Avatar de Usuario</h3>         
            <hr />

            <div id="divAvatar" class="k-container">
                <img id="avatar" src="../../Content/images/usuarios/darthvader_1600.jpg" width="180" height="150"><br />
                <input type="file" id="subirAvatar" class="uploader" name="attachments">
            </div>
       </div>

       <center>   <input type="button" class="k-button" value="Salvar cambios" style="margin-left:20px;" id="salvarCambiosInfoUsuario" /></center>
    </div>

    <div class="pestana" id="socio">
        <div id="esSocio">
        <br />
            <center><img src="../../Content/images/bienvenidosocio.png"/><br /></center>
            <div id="carnet">
                <div id="fotoCarnet"><img src="../../Content/images/usuarios/darthvader_1600.jpg" width="180" height="150" /></div>
                <div id="camposCarnet">
                    <div id="carnetNumeroSocio">Numero de Socio : </div>
                    <div id="carnetFechaAlta">Fecha de Alta :</div>
                    <div id="carnetNombre">Nombre :</div>
                    <div id="carnetApellidos">Apellidos : </div>
                    <div id="carnetDNI">DNI : </div>
                    
                </div>
            </div>
            <br />
            
            <div id="infoSocio">
                <h3> Información sobre el Socio</h3>
                <hr />
                <div id="estadoSubscripcion"><b>Estado de la subscripcion :  </b></div><br />                
                <div id="tipoDescuento"><b>Tipo de Descuento : </b></div><br />
                <div id="mensajeExpiracion"></div><br /> 
                <div id="motivoBaja"><b>Motivo de baja: </b></div><br />
                
                <!-- Renovacion de Socio -->
                <div id="renovacionSocio">
                   
                    <p id="tituloRenovacion"></p>
                     <hr />
                     <br /><br />

                     <div id="totalAlta" class="cuadroCuentas">
                        <label for="importeAlta"><b>Importe :</b></label><div id="importeAlta"></div><br />
                        <label for="IVAAlta"><b>IVA :</b></label><div id="IVAAlta"></div><br />
                        <label for="importeTotalAlta"><b>Importe Total :</b></label><div id="importeTotalAlta"></div><br />                         
                    </div>

                     <div id="textoAlta">
                     Debido a que o nunca ha sido parte de MTB o ha sido de baja debe abonar la cuota de Alta. A continuacion podra ver los detalles.<br /><br />
                     <table id="tarifasAlta" border="0" width="50%" >                        
                        <thead>
                            <tr align="center">
                                <th>Tarifa de Alta de Socio</th>                               
                            </tr>
                        </thead>
                        <tr align="center">
                            <td class="columnaAlta"> </td>
                        </tr>                        
                    </table><br /><i>
                    * IVA No incluido</i><br /><br /><br /><br />
                     </div>     <!-- Este texto solo se mostrara para las altas, el resto es comun -->

                     
                    Existen tres cuotas para la renovacion de Socio: mensual, trimestral y anual. Tiene dos maneras de pago : por <u>tarjeta</u> o <u>cuenta bancaria</u> o <u>PayPal</u>.
                    Una vez que recibamos su pago, el Sistema le activara su cuenta.<br />                                        
                    
                    <div id="totalCuota" class="cuadroCuentas">
                        <label for="fechaRenovacionNueva"><b>Fecha Renovacion :</b></label><div id="fechaRenovacionNueva"></div><br />
                        <label for="fechaExpiracionNueva"><b>Fecha Expiracion :</b></label><div id="fechaExpiracionNueva"></div><br />
                        <label for="importeNuevo"><b>Importe :</b></label><div id="importeNuevo"></div><br />
                        <label for="importeIVA"><b>IVA (18%) :</b></label><div id="importeIVA"></div><br />
                        <label for="importeTotal"><b>Importe Total :</b></label><div id="importeTotal"></div><br />
                    </div>
                    <br />
                    <table id="tarifasRenovacion" border="0" width="50%" >
                        <caption><b>Tarifas de abono</b></caption>
                        <thead>
                            <tr align="center">
                                <th>Mensual</th>
                                <th>Trimestral</th>
                                <th>Anual</th>
                            </tr>
                        </thead>
                        <tr align="center">
                            <td class="columnaMensual"> </td>
                            <td class="columnaTrimestral"></td>
                            <td class="columnaAnual"><font color="red"></font></td>
                        </tr>                        
                    </table><br />
                    <i>* IVA No incluido</i><br /><br />

                    <div id="descuentoCuotas"></div><br />

                    <label for="checkCustom">Elegir mi cuota por mes </label><input type="checkbox" class="k-input" id="checkCustom"/><br /><br />
                    
                    <div id="cuotasPredeterminadas" class="eleccionCuotas">
                        Elija su cuota :                    
                        <input type="text" class="k-textbox" width="10" id="comboCuota" /> 
                    </div>
                    <div id="cuotasCustom" class="eleccionCuotas">
                        Elija el numero de meses :
                        <input type="text" class="k-textbox" width="10" id="numberCuotaCustom" /> 
                    </div>

                    <label for="formaDePago">Forma de Pago: </label><input type="text" class="k-textbox" id="formaDePago" />
                    <br /><br /><br />
                    
                    <div id="pagoTarjeta" class="formasDePago">
                        <img src="../../Content/images/pago.gif" /><br />
                        <label for="numTarjeta">Numero de Tarjeta : </label><input type="text" class="k-textbox" id="numTajerta" maxlength="4" size="3"/><input type="text" class="k-textbox" id="numTajerta1" class="numTarjeta" maxlength="4" size="3"/><input type="text" class="k-textbox" id="numTajerta2" class="numTarjeta" maxlength="4" size="3"/><br />
                        <label for="mesCaducidad">Fecha de Caducidad : </label><input type="text" class="k-textbox" id="mesCaducidad" size="5" /><input type="text" class="k-textbox" id="annoCaducidad" size="5"/><br />
                        <label for="ccv2">CCV2 : </label><input type="text" class="k-textbox" id="ccv2"  maxlength="3" size="3"/><u><a href="#" id="cvv2parrafo"><font color="blue">¿Ques es el CVV2?</font></a></u><br /><br />
                        <input type="button" class="k-button" id="botonPagoTarjeta" value="Realizar Pago" />
                    </div>

                    <div id="pagoPaypal" class="formasDePago">
                       
                        <!-- PayPal Logo --><table border="0" cellpadding="10" cellspacing="0"><tr><td align="center"></td></tr><tr><td align="center"><a href="#" onclick="javascript:window.open('https://www.paypal.com/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside','olcwhatispaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=400, height=350');"><img  src="https://www.paypal.com/en_US/i/bnr/horizontal_solution_PPeCheck.gif" border="0" alt="Gráficos de soluciones"></a></td></tr></table><!-- PayPal Logo -->
                        <br />
                        <img src="https://www.paypal.com/es_XC/i/btn/btn_xpressCheckout.gif"  style="margin-right:7px;">
                    </div>
                </div>
                 
                <!-- Alta de Socio 
                 <div id="altaSocio">
                 <h3>Alta de Socio</h3>
                     <hr />
                     <br />
                     <div id="totalCuotaAlta" class="totalCuota">
                        <label for="fechaRenovacionNuevaAlta"><b>Fecha Renovacion :</b></label><div id="fechaRenovacionNuevaAlta"></div><br />
                        <label for="fechaExpiracionNuevaAlta"><b>Fecha Expiracion :</b></label><div id="fechaExpiracionNuevaAlta"></div><br />
                        <label for="importeNuevoAlta"><b>Importe :</b></label><div id="importeNuevoAlta"></div><br />
                        <label for="importeIVAAlta"><b>IVA :</b></label><div id="importeIVAAlta"></div><br />
                        <label for="importeTotalAlta"><b>Importe Total :</b></label><div id="importeTotalAlta"></div><br />
                    </div>
                    <br />
                    Su estado actual es de Baja, por lo que puede haber ocurrido que usted ha sido dado de baja o nunca ha pertenecido a la MTB. Para darse de alta deberá pagar la cuota de Alta y al menos un mes de abono.<br />
                    <br />
                    Tiene dos maneras de pago : por <u>tarjeta</u> o <u>cuenta bancaria</u> o <u>PayPal</u>.
                    Una vez que recibamos su pago, el Sistema le activara su cuenta.<br />
                    <table id="tarifasRenovacionAlta" border="0" width="50%" >
                        <caption><b>Tarifas de abono</b></caption>
                        <thead>
                            <tr align="center">
                                <th>Mensual</th>
                                <th>Trimestral</th>
                                <th>Anual</th>
                            </tr>
                        </thead>
                        <tr align="center">
                            <td>10 € * </td>
                            <td>30 € *</td>
                            <td><font color="red">109 € *</font></td>
                        </tr>                        
                    </table><br />
                    <i>* IVA No incluido</i><br /><br />
                </div> -->
              </div> 
        </div>
        <div id="noEsSocio">
            <center></center><img src="../../Content/images/nosocio.png"/>
            <br />
            <b><h3>¿ A que esperas?</h3></b> Si aun no sabes porque deberias unirte a nuestro club, en este <a href="#">enlace</a> te damos las razones.<br />
            Si pertences a nuestro club podrás obtener una plaza fija en nuestros eventos .. disfrutar de nuestros descuentos de Socios .. ¡y cuanto más tiempo estes, mayor seran éstos! <br />
            
            ¿Tienes algunda duda? Envianos un <a href="mailto:">correo</a> y estaremos encantandos de solucionar tus dudas. También puedes contactar con nosotros a través con otros medios, 
            para más información <a href="#">aqui</a>.<br />
            
            <img src="../../Content/images/broken-bike.jpg" width="400" height="300" />
            </center>
        </div>
    
    </div>
    <div class="pestana" id="mensajes">
        <img class="titulotab" src="../../Content/images/emailBIG_titulo.png"  />
        <br /><br />        


        <h3>Mensajes No Leidos</h3>
        <div id="tablaMensajesNoLeidos" class="noLeidos"></div><br /><br />
        <h3>Mensajes Leidos</h3>
        <div id="tablaMensajesLeidos" class="leidos"></div><br /><br />        
    </div>
    <div class="pestana" id="estadisticas"></div>
    <div class="pestana" id="rutas"></div>
</div>

<div id="ventanaCrear" class="ventana">
    <div id="formularioCrear" class="ventana">
        <label for="campoDestinatario"> Destinatario</label><input type="text" class="k-textbox" id="campoDestinatario" /><br /><br />
        <label for="campoAsunto"> Asunto</label<><input type="text" class="k-textbox" id="campoAsunto" size="70" required/><br /><br />
        <textarea id="campoCuerpoMensaje" class="editor" rows="10" cols="60"></textarea><br /><br />
       <center><input type="button" id="enviarMensaje" class="k-button" value="Enviar Mensaje" /></center> 
    </div>
</div>

<div id="ventanaMostrar" class="ventana">
    <div id="formularioResponder" class="ventana">
        <label for="mostrarDestinatario"> Destinatario</label><input type="text" class="k-textbox muestra" id="mostrarDestinatario" />
        <input type="button" class="k-button" id="botonModoEnvio" value="Responder" modoEnvio="Muestra" />
        <br /><br />
        <label for="mostrarAsunto"> Asunto</label<><input type="text" class="k-textbox muestra" id="mostrarAsunto" size="70" required/><br /><br />
        <textarea id="mostrarCuerpoMensaje" class="muestra" rows="10" cols="60"></textarea>
        <div class="editorwrapper">
            <textarea id="mostrarCuerpoMensajeEditable" class="muestra" rows="10" cols="60"></textarea><br /><br />        
        </div>
       <center><input type="button" id="mostrarEnviarMensaje" class="k-button" value="Enviar Mensaje" /></center> 
    </div>
</div>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="CssContent" runat="server">
<link href="../../Content/Perfil/Perfil.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.common.min.css" />
<link rel="stylesheet" type="text/css" href="../../Scripts/pngfix/styles/kendo.default.min.css" />
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ScriptContent" runat="server">

<script type="text/x-kendo-template" id="templateToolbarMensajeNoLeidos">
    <div class="toolbarIzq">
        <input type="button" class="k-button componerMensaje" value="+ Componer Mensaje">
        <input type="button" class="k-button marcar" value="Marcar Leido" id="botonMarcarLeido">
    </div>
    <div class="toolbarDer">
        Mensajes por Pagina
        <input type="text" class="k-textbox comboPageSize" id="comboPageSizeNoLeido">
    </div>
</script>

<script type="text/x-kendo-template" id="templateToolbarMensajeLeidos">
    <div class="toolbarIzq">
        <input type="button" class="k-button componerMensaje" value="+ Componer Mensaje">
        <input type="button" class="k-button marcar" value="Marcar No Leido" id="botonMarcarNoLeido">
    </div>
    <div class="toolbarDer">
        Mensajes por Pagina
        <input type="text" class="k-textbox comboPageSize" id="comboPageSizeLeido">
    </div>
</script>  

<script src="../../Scripts/jsactions/Perfil/Perfil.js" ></script>
<script src="../../Scripts/jsactions/Perfil/Mensajeria.js" ></script>
<script src="../../Scripts/jsactions/Perfil/Informacion.js" ></script>
<script src="../../Scripts/jsactions/Perfil/Socio.js" ></script>
</asp:Content>
