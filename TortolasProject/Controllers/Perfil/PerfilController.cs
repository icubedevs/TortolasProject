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

        public ActionResult leerMensajes(FormCollection data)
        {
            Guid usuario = Guid.Parse(data["idUsuario"]);
            String tipo = data["tipo"];

                var mensaje = from m in mensajesRepo.listarMensajes(usuario,tipo)
                              select new
                              {
                                  idMensaje = m.idMensaje,
                                  estado = m.estado,
                                  fecha = m.fecha.Value.ToShortDateString(),
                                  asunto = m.asunto,
                                  cuerpomensaje = m.cuerpomensaje,
                                  FKDestinatario = mensajesRepo.nombreUsuario(m.FKDestinatario),
                                  FKRemitente = mensajesRepo.nombreUsuario(m.FKDestinatario)
                              };

                return Json(mensaje);
            
        }

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

        public void enviarMensaje(FormCollection data)
        {

            Guid Destinatario = Guid.Parse(data["Destinatario"]);
            String Asunto = data["Asunto"];
            String CuerpoMensaje = data["CuerpoMensaje"];
            DateTime Fecha = DateTime.Parse(data["Fecha"]);
            Guid Remitente = Guid.Parse(data["Remitente"]);
            Guid idMensaje = Guid.NewGuid();
            
            tbMensaje nuevo = new tbMensaje{
                                        FKDestinatario = Destinatario,
                                        asunto = Asunto,
                                        cuerpomensaje = CuerpoMensaje,
                                        fecha = Fecha,
                                        FKRemitente = Remitente,
                                        idMensaje = idMensaje
            };
            mensajesRepo.enviarMensaje(nuevo);
        }

        public void marcarLeido(FormCollection data, String tipo)
        {
            Guid idMensaje = Guid.Parse(data["idMensaje"]);

            mensajesRepo.cambiarEstado(idMensaje,tipo);
            
        }

        public void eliminarMensaje(FormCollection data)
        {
            Guid idMensaje = Guid.Parse(data["idMensaje"]);

            mensajesRepo.eliminarMensaje(idMensaje);
        }

    }
}
