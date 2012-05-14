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

        public ActionResult leerCategorias()
        {
            var categorias = from cat in ArticulosRepo.listarCategorias()
                             select new
                             {
                                 categoria = cat.idCategoria,
                                 nombre = cat.Nombre
                             };

            return Json(categorias);
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
                                   precio = art.Precio,
                                   categoriaNombre = ArticulosRepo.leerCategoria(art.FKCategoria).Nombre,
                                   categoriaId = ArticulosRepo.leerCategoria(art.FKCategoria).idCategoria
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
            Guid categoria = Guid.Parse(Data["categoria"]);

            tbArticulo f = new tbArticulo()
            {
                idArticulo= Guid.NewGuid(),
                Nombre = nombre,
                Imagen = imagen,
                Descripcion = descripcion,
                Precio = precio,
                FKCategoria = categoria,
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
        public int eliminarArticulo(FormCollection Data)
        {
            Guid idArticulo = Guid.Parse(Data["idarticulo"]);

            ArticulosRepo.eliminarArticulo(ArticulosRepo.leerArticulo(idArticulo));
            return 1; //mirar control de errores
        }
    }
}