using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class ArticulosController : Controller
    {
        static ArticulosRepositorio ArticulosRepo = new ArticulosRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult leerTodos()
        {
            var articulos = from art in ArticulosRepo.listarArticulos() 
                           select new
                               {
                                   name = art.Nombre,
                                   description = art.Descripcion,
                                   image = art.Imagen,
                                   price = art.Precio
                               };

            return Json(articulos);
        }
                         

    }
}