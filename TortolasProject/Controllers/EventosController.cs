using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;

namespace TortolasProject.Controllers
{
    public class EventosController : Controller
    {
        //
        // GET: /Eventos/
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public ActionResult Index()
        {
            return View();
        }

    }
}
