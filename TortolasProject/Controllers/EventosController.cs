using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;

namespace TortolasProject.Controllers
{
    public class EventosController : Controller
    {
        // GET: /Eventos/
        mtbMalagaDataContext bd = new mtbMalagaDataContext();
        static EventosRepositorio EventosRepo = new EventosRepositorio();

          //Index
        public ActionResult Index()
        {
            return View();
        }

          //CrearEvento
        [HttpPost]
        public ActionResult cargarVistaCrearEvento()
        {
            return PartialView("crearEvento");
        }
    }
}
