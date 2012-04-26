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

        public ActionResult AñadirArticulo()
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

        public ActionResult cargarVistaAñadirArticulo()
        {
            return PartialView("AñadirArticulo");
        }

        public int nuevoArticulo(FormCollection Data)
        {
            String nombre = Data ["nombre"];
            String imagen = Data ["imagen"];
            String descripcion = Data ["descripcion"];
            decimal precio = Decimal.Parse(Data ["precio"]);

            tbArticulo f = new tbArticulo()
            {
                idArticulo= Guid.NewGuid(),
                Nombre = nombre,
                Imagen = imagen,
                Descripcion = descripcion,
                Precio = precio,
            };

            ArticulosRepo.añadirArticulo(f);
            return 1; //mirar control de errores
        }
    }
}