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

       
        // Index
        public ActionResult Index()
        {
            var facturas = from estadoFactura in mtbMalagaDB.tbEstadoFactura select estadoFactura;
        
            return View();
        }

        
        public ActionResult Create()
        {
            return PartialView();
        }


        //Prueba de AJAX
        [HttpPost]
        public JsonResult Prueba(string n, string c)
        {
            string nombre = n + "Prozid";
            string coche = c + " 16V eco2";

            String [] array = {nombre, coche}; 
            

            return Json(array);
        }               

    }
}
