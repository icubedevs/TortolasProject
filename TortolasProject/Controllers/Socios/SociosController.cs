using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;

namespace TortolasProject.Controllers.Socios
{
    public class SociosController : Controller
    {
        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();
        UsuariosRepositorio usuariosRepo = new UsuariosRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult obtenerSocios()
        {
            var socios = from s in usuariosRepo.listarSocios()
                         select new
                         {
                             FechaExpiracion = s.FechaExpiracion.HasValue ? s.FechaExpiracion.Value.ToShortDateString() : "",
                             FechaBaja = s.FechaBaja.HasValue ? s.FechaBaja.Value.ToShortDateString() : "",
                             FechaAlta = s.FechaAlta.ToShortDateString(),
                             Estado = s.Estado,
                             Foto = s.Foto,
                             FKUsuario = s.FKUsuario,
                             idSocio = s.idSocio,
                             Observaciones = s.Observaciones,
                             NumeroSocio = s.NumeroSocio,
                             MotivosBaja = s.MotivosBaja
                         };
            return Json(socios);
        }

        [HttpPost]
        public JsonResult obtenerSociosyUsuario()
        {
            
            var SociosyUsuario = from societe in usuariosRepo.listarSocios()
                                 select new
                                 {
                                     Estado = societe.Estado,
                                     FechaAlta = societe.FechaAlta.ToShortDateString(),
                                     FechaBaja = societe.FechaBaja.HasValue ? societe.FechaBaja.Value.ToShortDateString() : "",
                                     FechaExpiracion = societe.FechaExpiracion.HasValue ?  societe.FechaExpiracion.Value.ToShortDateString() : "",
                                     Foto = societe.Foto,
                                     idSocio = societe.idSocio,
                                     NumeroSocio = societe.NumeroSocio,
                                     Observaciones = societe.Observaciones,
                                     Nombre = usuariosRepo.obtenerUsuario(societe.FKUsuario).Nombre,
                                     Apellidos = usuariosRepo.obtenerUsuario(societe.FKUsuario).Apellidos
                                 };
            return Json(SociosyUsuario);
        }

        [HttpPost]
        public void crearSocio(tbSocio societe)
        {
            mtbDB.tbSocio.InsertOnSubmit(societe);
            mtbDB.SubmitChanges();
        }

        [HttpPost]
        public JsonResult obtenerPagosSocios(FormCollection data)
        {
            Guid idSocio = Guid.Parse(data["idSocio"]);
            
            var cuotas = from c in usuariosRepo.cuotasDeSocio(idSocio)
                         select new
                         {
                             idCuota = c.idCuota,
                             TipoCuota = mtbDB.tbTipoCuota.Where(tipoC => tipoC.idTipoCuota.Equals(c.FKTipoCuota)).Single().Nombre,
                             Fecha = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().Fecha.ToShortDateString(),
                             Concepto = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().Concepto,
                             BaseImponible = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().BaseImponible,
                             Total = mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().Total,                             
                             Estado = mtbDB.tbEstadoFactura.Where(estado => estado.idEstadoFactura.Equals(mtbDB.tbFactura.Where(factu => factu.idFactura.Equals(c.FKFactura)).Single().FKEstado)).Single().Nombre
                         };
            return Json(cuotas);
        }
    }
}
