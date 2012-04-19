using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class EmpresasController : Controller
    {
        static EmpresasRepositorio EmpresasRepo = new EmpresasRepositorio();

        public ActionResult Index()
        {
            //var empresas = from Nombre in mtbMalagaDB.tbEmpresa select Nombre;
            return View();
        }

        public ActionResult Create()
        {
            return PartialView("Create");
        }
        

        [HttpPost]
        public ActionResult LeerTodos()
        {
            var empresas = from ob in EmpresasRepo.ListarEmpresas()
                           select new
                           {
                               idEmpresa = ob.idEmpresa,
                               Nombre = ob.Nombre,
                               CIF = ob.CIF,
                               Localidad = ob.Localidad
                           };
            return Json(empresas);
        }
    }    
}
