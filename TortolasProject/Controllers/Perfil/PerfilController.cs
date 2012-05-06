using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Controllers.Perfil;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;


namespace TortolasProject.Controllers.Perfil
{
    public class PerfilController : Controller
    {
        //
        // GET: /Perfil/

        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();
        MensajesRepositorio mensajesRepo = new MensajesRepositorio();
        UsuariosRepositorio usuariosRepo = new UsuariosRepositorio();        
        

        public ActionResult Index()
        {
            return View();
        }

        // PESTAÑA : MENSAJES

        [HttpPost]
        public ActionResult leerMensajes(FormCollection data)
        {

            Guid usuario = HomeController.obtenerUserIdActual();
            String tipo = data["tipo"];

                var mensaje = from m in mensajesRepo.listarMensajes(usuario,tipo)
                              select new
                              {
                                  idMensaje = m.idMensaje,
                                  estado = m.estado,
                                  fecha = m.fecha.Value.ToShortDateString(),
                                  asunto = m.asunto,
                                  cuerpomensaje = m.cuerpomensaje,
                                  nombreDestinatario = mensajesRepo.nombreUsuario(m.FKDestinatario),
                                  nombreRemitente = mensajesRepo.nombreUsuario(m.FKRemitente),
                                  FKDestinatario = m.FKDestinatario,
                                  FKRemitente = m.FKRemitente
                                  
                              };

                return Json(mensaje);
            
        }

        [HttpPost]
        public ActionResult leerDestinatarios()
        {
          
            var usuario = from u in usuariosRepo.listarUsuarios()
                          select new
                          {
                             idUsuario = u.idUsuario,
                             Nickname = u.Nickname,
                             Apellidos = u.Apellidos,
                             Nombre = u.Nombre,
                             FechaNacimiento = u.FechaNacimiento,
                             Email = u.Email,
                             DNI = u.DNI,
                             Direccion = u.Direccion,
                             Avatar = u.Avatar
                             
                          };

            return Json(usuario);

        }

        [HttpPost]
        [ValidateInput(false)]
        public void enviarMensaje(FormCollection data)
        {

            Guid Destinatario = Guid.Parse(data["Destinatario"]);
            String Asunto = data["Asunto"];
            String CuerpoMensaje = data["CuerpoMensaje"];
            DateTime Fecha = DateTime.Parse(data["Fecha"]);
            Guid Remitente = HomeController.obtenerUserIdActual();
            Guid idMensaje = Guid.NewGuid();
            
            tbMensaje nuevo = new tbMensaje{
                                        FKDestinatario = Destinatario,
                                        asunto = Asunto,
                                        cuerpomensaje = CuerpoMensaje,
                                        fecha = Fecha,
                                        estado = "noleido",
                                        FKRemitente = Remitente,
                                        idMensaje = idMensaje
            };
            mensajesRepo.enviarMensaje(nuevo);
        }

        [HttpPost]
        public void marcarLeido(FormCollection data, String tipo)
        {
            Guid idMensaje = Guid.Parse(data["idMensaje"]);

            mensajesRepo.cambiarEstado(idMensaje,tipo);
            
        }

        [HttpPost]
        public void eliminarMensaje(FormCollection data)
        {
            Guid idMensaje = Guid.Parse(data["idMensaje"]);

            mensajesRepo.eliminarMensaje(idMensaje);
        }

    }
}
