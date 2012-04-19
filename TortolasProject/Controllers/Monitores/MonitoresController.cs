using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Controllers.Monitores;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers.Monitores
{
    public class MonitoresController : Controller
    {
        //
        // GET: /Monitores/

        //static MonitoresRepositorio MonitoresRepo = new MonitoresRepositorio();
        static MonitoresRepositorio MonitoresRepo = new MonitoresRepositorio();

        public ActionResult Index()
        {
            return View();
        }


        public ActionResult obtenerTodos()
        {
            
            var monitores = from m in MonitoresRepo.listarTodos()
                            select new
                            {
                                idMonitor = m.idMonitor,
                                nombre = m.Nombre,
                                apellidos = m.Apellidos,
                                dni = m.DNI,
                                email = m.Email
                            };

            return Json(monitores);
        
        }

    }
    
}
