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
                                   idArticulo = art.idArticulo,
                                   nombre = art.Nombre,
                                   descripcion = art.Descripcion,
                                   imagen = art.Imagen,
                                   precio = art.Precio
                               };

            return Json(articulos);
        }

        public ActionResult cargarVistaAnadirArticulo()
        {
            return PartialView("AnadirArticulo");
        }

        public ActionResult cargarVistaEditarArticulo()
        {
            return PartialView("EditarArticulo");
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

            ArticulosRepo.anadirArticulo(f);
            return 1; //mirar control de errores
        }
        public int editarArticulo(FormCollection Data)
        {
            String nombre = Data["nombre"];
            String imagen = Data["imagen"];
            String descripcion = Data["descripcion"];
            decimal precio = Decimal.Parse(Data["precio"]);
            Guid idArticulo = Guid.Parse(Data["idarticulo"]);

            tbArticulo f = new tbArticulo()
            {
                idArticulo = idArticulo,
                Nombre = nombre,
                Imagen = imagen,
                Descripcion = descripcion,
                Precio = precio,
            };

            ArticulosRepo.editarArticulo(f, idArticulo);
            return 1; //mirar control de errores
        }
    }
}