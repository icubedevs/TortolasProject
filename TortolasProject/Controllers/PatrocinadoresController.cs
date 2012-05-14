using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class PatrocinadoresController : Controller
    {
        static EmpresasRepositorio PatrocinadoresRepo = new EmpresasRepositorio();
        //
        // GET: /Patrocinadores/

        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult LeerTodos()
        {

            var patrocinadores = from ob in PatrocinadoresRepo.ListarPatrocinadores()
                              select new
                              {
                                  idPatrocinador = ob.FKCodigoEmpresa,
                                  LocalizacionP = ob.LocalizacionPublicidad,
                                  NombrePatrocinador = PatrocinadoresRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                                  CIFEmpresaPat = PatrocinadoresRepo.buscaremp(ob.FKCodigoEmpresa).CIF,
                              };
            return Json(patrocinadores);
        }

    }
}
