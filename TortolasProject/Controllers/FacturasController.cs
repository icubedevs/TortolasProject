using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class FacturasController : Controller
    {
        static FacturasRepositorio FacturasRepo = new FacturasRepositorio();
       
        // Index
        public ActionResult Index()
        {
            //var facturas = from estadoFactura in FacturasRepositoriodoFactura select estadoFactura;
        
            return View();
        }

        
        public ActionResult Create()
        {
            return PartialView("Create");
        }

        public ActionResult Details(Guid id)
        {

            tbUsuario usuario = FacturasRepo.details(id);
            return PartialView("Details", usuario);
        }
        //LeerFacturas
        [HttpPost]
        public ActionResult leerTodos()
        {
            var usuarios = from u in FacturasRepo.listarTodos() 
                           select new
                               {
                                   idUsuario = u.idUsuario,
                                   Nickname = u.Nickname,
                                   DNI = u.DNI,
                                   Email = u.Email
                               };
            

            return Json(usuarios);
        }   
    }
}
