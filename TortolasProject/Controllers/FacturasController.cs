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

        public class usuarioPrueba
        {
            public Guid idUsuario { get; set;}
            public String Nickname { get; set;}
            public String DNI { get; set;}
            public String Email { get; set;}
        }

        [HttpPost]
        public ActionResult leerPrueba()
        {
            List<usuarioPrueba> listaUsuarios = new List<usuarioPrueba>();
            
            usuarioPrueba dani = new usuarioPrueba{
                idUsuario = new Guid(),
                Nickname = "dani",
                Email = "dani@dani.com",
                DNI = "123456789"
            };

            usuarioPrueba ismi = new usuarioPrueba
            {
                idUsuario = new Guid(),
                Nickname = "ismi",
                Email = "ismi@dani.com",
                DNI = "123456389"
            };

            listaUsuarios.Add(dani);
            listaUsuarios.Add(ismi);

            return Json(listaUsuarios);           
        }
    }
}
