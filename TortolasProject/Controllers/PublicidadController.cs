using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class PublicidadController : Controller
    {
        //
        // GET: /Publicidad/
        static EmpresasRepositorio PublicidadRepo = new EmpresasRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LeerTodos(FormCollection data)
        {
            var id = Guid.Parse(data["idPat"]);

            var publicidad = from ob in PublicidadRepo.ListarPublicidad(id)
                                 select new
                                 {
                                     Loc = ob.LocalizacionPublicidad,
                                     Caracteristicas = ob.Caracteristicas,
                                     idPublicidad = ob.idPublicidad,
                                     idPatro = ob.FKCodigoEmpresa
                                 };
            return Json(publicidad);
        }

        [HttpPost]
        public void UpdatePublicidad(FormCollection data)
        {
            //var epublicidad = System.Web.Helpers.Json.Decode(data["models"]);

            Guid idPublicidad = Guid.Parse(data["idpublicidad"]);
            String Caracteristicas = data["caracpublicidadeditar"];
            String Localización = data["locupdate"];

            tbPublicidad publicidad = new tbPublicidad
            {
                Caracteristicas = Caracteristicas,
                LocalizacionPublicidad = Localización,
                idPublicidad = idPublicidad,
            };


            PublicidadRepo.updatePub(publicidad);
        }
    }
}
