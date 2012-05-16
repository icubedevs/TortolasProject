using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class ConveniosController : Controller
    {
        //
        // GET: /Convenios/
        static EmpresasRepositorio ConveniosRepo = new EmpresasRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {

            var convenios = from ob in ConveniosRepo.ListarConvenios()
                              select new
                              {
                                  idConvenio = ob.idConvenio,
                                  FKCodigoEmpresa = ob.FKCodigoEmpresa,
                                  Descripcion = ob.DescripcionOferta,
                                  NombreEmpre = ConveniosRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                                  CIFEmpresaC = ConveniosRepo.buscaremp(ob.FKCodigoEmpresa).CIF,
                              };
            return Json(convenios);
        }

    }
}
