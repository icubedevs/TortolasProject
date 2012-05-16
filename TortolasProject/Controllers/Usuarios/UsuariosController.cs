using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;

namespace TortolasProject.Controllers.Usuarios
{
    public class UsuariosController : Controller
    {

        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();
        UsuariosRepositorio usuariosRepo = new UsuariosRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult obtenerUsuarios()
        {
            var usuarios = from u in usuariosRepo.listarUsuarios()
                           select new
                           {
                               Aficiones = u.Aficiones,
                               Apellidos = u.Apellidos,
                               Avatar = u.Avatar,
                               Direccion = u.Direccion,
                               DNI = u.DNI,
                               Email = u.Email,
                               Experiencias = u.Experiencias,
                               Facebook = u.Facebook,
                               FechaNacimiento = u.FechaNacimiento.HasValue ? u.FechaNacimiento.Value.ToShortDateString() : " ",
                               FKUser = u.FKUser,
                               idUsuario = u.idUsuario,
                               GooglePlus = u.GooglePlus,
                               Localidad = u.Localidad,
                               Nacionalidad = u.Nacionalidad,
                               Nickname = u.Nickname,
                               Nombre = u.Nombre,
                               Provincia = u.Provincia,
                               Sexo = u.Sexo,
                               SitioWeb = u.SitioWeb,
                               Skype = u.Skype,
                               Telefono = u.Telefono,
                               Twitter = u.Twitter
                           };

            return Json(usuarios);
        }


        [HttpPost]
        public JsonResult socioDeUsuario(FormCollection data)
        {
            Guid idUsuario = Guid.Parse(data["idUsuario"]);
            try
            {
                tbSocio societe = usuariosRepo.obtenerSocio(idUsuario);

                // Enviamos los datos del socio y del usuario a la vez
                var socio = new
                {
                    // Datos del socio
                    Estado = societe.Estado,
                    FKUsuario = societe.FKUsuario,
                    Foto = societe.Foto,
                    idSocio = societe.idSocio,
                    NumeroSocio = societe.NumeroSocio,
                    Observaciones = societe.Observaciones,
                    MotivosBaja = societe.MotivosBaja,
                    FechaAlta = societe.FechaAlta.ToShortDateString(),
                    FechaBaja = societe.FechaBaja.HasValue == true ? societe.FechaBaja.Value.ToShortDateString() : null,
                    FechaExpiracion = societe.FechaExpiracion.HasValue == true ? societe.FechaExpiracion.Value.ToShortDateString() : null

                };
                return Json(socio);
            }
            catch
            {
                var socio = "No hay Socio";
                return Json(socio);
            }
        }


        [HttpPost]
        public Boolean checkearNickname(FormCollection data)
        {
            String Nickname = data["Nickname"];

            int coincidencias = usuariosRepo.existeNickname(Nickname);

            if (coincidencias.Equals(0)) // No hay ninguno repetido
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        public Boolean checkearEmail(FormCollection data)
        {
            String Email = data["Email"];

            int coincidencias = usuariosRepo.existeEmail(Email);

            if (coincidencias.Equals(0)) // No hay ninguno repetido
            {
                return true;
            }
            else
            {
                return false;
            }
        }

    }
}
