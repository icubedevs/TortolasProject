using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;

namespace TortolasProject.Controllers
{
    public class AdministracionController : Controller
    {
        //
        // GET: /Administracion/

        static UsuariosRepositorio UsuariosRepo = new UsuariosRepositorio();

        public ActionResult Index()
        {
            return View();
        }

    

        
    }
}
