using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;

namespace TortolasProject.Controllers
{
    public class FacturasController : Controller
    {
        // Conecto a la BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        //
        // GET: /Facturas/
        

        public ActionResult Index()
        {
            var facturas = from estadoFactura in mtbMalagaDB.tbEstadoFactura select estadoFactura;
            return View(facturas);
        }

        public ActionResult Create()
        {
            return View();
        }

    }
}
