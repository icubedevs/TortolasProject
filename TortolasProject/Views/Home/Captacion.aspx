<telerik:RadRibbonBar runat="server">
</telerik:RadRibbonBar>

<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>
<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div id="content" style="padding-top:100px;">
                    <font color="white">
                        <h1>¿Por que ser miembro de MTB Malaga?<h1>
                                <br><br>
                                        <h2>Aqui le mostraremos los motivos con unas gráficas</h2><br><br>
                                         <h3><font color="green">Primer motivo</font>: 
                                             &nbsp; Cada año hemos aumentado nuestro número de miembros, siempre en pendiente creciente,
                                             por lo que nuestros miembros no paran de recomendarnos. </h3>
                           
                           <br><br>
                    
                    <div id="chart1">
                        
                    </div>
                    
                    <br><br>
                            
                                        <h3><font color="green">Segundo motivo</font>: 
                                             &nbsp; Podras participar en muchos eventos oficiales y tener preferencia en los no oficiales. Siempre garantizamos que habra
                                        al menos un 30% de Eventos Oficiales</h3>
                     
                    <div id="chart2">
                        
                    </div>
                    
                            
                    </font>
</div><!-- / content -->		
</asp:Content>
