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
        static EventosRepositorio EventosRepo = new EventosRepositorio();

        public ActionResult Index()
        {
            return View();
        }

    }
}
