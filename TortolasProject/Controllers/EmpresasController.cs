using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;

namespace TortolasProject.Controllers
{
    public class EmpresasController : Controller
    {
        // Conecto a la BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public ActionResult Index()
        {
            var empresas = from Nombre in mtbMalagaDB.tbEmpresa select Nombre;
            return View(empresas);
        }

        [HttpPost]
        public ActionResult Prueba(string s, int n)
        {
            return new Data"Prueba de ajax";
        }

    }
    
}
