<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%
    if (Request.IsAuthenticated) {
%>
<!-- CUIDADO! Al tener float:right el orden es: de arriba hacia abajo en la página sale de derecha a izquierda -->
        <div id="logOutButton">
            <%: Html.ActionLink("Cerrar sesión", "LogOff", "Account") %> 
        </div>
        <div id="messageContainer">
            No tiene mensajes
        </div>
        <div id="userNameLabel">
            <strong><%: Page.User.Identity.Name %></strong>
        </div>
<%
    }
    else {
%> 
        <div id="logInButton">
           <div class="left">
				<!-- Login Form -->
				<form class="clearfix" action="#" method="post">
					<h1>Login</h1>
					<label class="grey" for="log">Usuario:</label>
					<input class="field" type="text" name="log" id="log" value="" size="23" />
					<label class="grey" for="pwd">Contraseña:</label>
					<input class="field" type="password" name="pwd" id="pwd" size="23" />
	            	<label><input name="rememberme" id="rememberme" type="checkbox" checked="checked" value="forever" /> &nbsp;Recordar contraseña</label>
        			<div class="clear"></div>
					<input type="submit" name="submit" value="Iniciar sesión" class="bt_login" />
					<a class="lost-pwd" href="#">¿Has olvidado tu contraseña?</a>
				</form>
			</div>
			<div class="left right">			
				<!-- Register Form -->
				<form action="#" method="post">
					<h1>¿Aun no eres miembro? ¡Inscribete!</h1>				
					<label class="grey" for="signup">Usuario:</label>
					<input class="field" type="text" name="signup" id="signup" value="" size="23" />
					<label class="grey" for="email">E-mail:</label>
					<input class="field" type="text" name="email" id="email" size="23" />
					<label>La contraseña sera enviada a tu e-mail.</label>
					<input type="submit" name="submit" value="Registrarme" class="bt_register" />
				</form>
			</div>
        </div>
<%
    }
%>
