using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class InventarioController : Controller
    {


        static InventarioRepositorio InventarioRepo = new InventarioRepositorio();
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
            var articulos = from inv in InventarioRepo.listarInventario()
                            select new
            {
                            idInventario = inv.idInventario,
                            idArticulo = inv.FKArticulo,
                            ubicacion = inv.Ubicacion,
                            cantidad = inv.Cantidad,
                            nombre = ArticulosRepo.leerArticulo(inv.FKArticulo).Nombre,
                            imagen = ArticulosRepo.leerArticulo(inv.FKArticulo).Imagen,
                            descripcion = ArticulosRepo.leerArticulo(inv.FKArticulo).Descripcion,
                            precio = ArticulosRepo.leerArticulo(inv.FKArticulo).Precio,
                            categoria = ArticulosRepo.leerCategoria(ArticulosRepo.leerArticulo(inv.FKArticulo).FKCategoria).Nombre,
            };

            return Json(articulos);
        }

        public int anadirInventario(FormCollection Data)
        {
            String Ubicacion = Data ["Ubicacion"];
            int Cantidad = int.Parse(Data["Cantidad"]);
            Guid idArticulo = Guid.Parse(Data ["Articulo"]);
            tbInventario inv = new tbInventario()
            {
                idInventario = Guid.NewGuid(),
                FKArticulo = idArticulo,
                Ubicacion = Ubicacion,
                Cantidad = Cantidad,
            };
            InventarioRepo.anadirInventario(inv);
            return 1;
        }

        public int eliminarInventario(FormCollection Data)
        {
            Guid idInventario = Guid.Parse(Data["idInventario"]);

            InventarioRepo.eliminarInventario(InventarioRepo.leerInventario(idInventario));
            return 1; //mirar control de errores
        }

        public ActionResult cargarVistaAnadirInventario()
        {
            return PartialView("AnadirInventario");
        }

    }
}
