using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class PedidosController : Controller
    {
        static PedidosRepositorio PedidosRepo = new PedidosRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult leerTodos()
        {
            var pedidos = from ped in PedidosRepo.listarPedidos()
                          select new
                          {
                              idPedido = ped.idPedidoGlobal,
                              descuento = ped.DescuentoFijo,
                              total = ped.Total,
                              estado = ped.FechaLimite.Value.ToShortDateString(),
                              nombre = ped.Nombre
                          };
            return Json(pedidos);
        }

        public int anadirPedido(FormCollection Data)
        {
            String nombre = Data["Nombre"];
            int descuento = int.Parse(Data["Descuento"]);
            DateTime date = DateTime.Parse(Data["Fecha"]);

            tbPedidoGlobal f = new tbPedidoGlobal()
            {
                Nombre = nombre,
                DescuentoFijo = descuento,
                idPedidoGlobal = Guid.NewGuid(),
                Total = 0,
                FechaLimite = date
            };

            PedidosRepo.anadirPedido(f);
            return 1;
        }
      }
}