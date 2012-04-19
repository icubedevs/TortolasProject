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
        mtbMalagaDataContext bd = new mtbMalagaDataContext();
        static FacturasRepositorio FacturasRepo = new FacturasRepositorio();

        ///////////////////////////////////////////////////////////////////////////////
        // Carga de vistas
        ///////////////////////////////////////////////////////////////////////////////

            // Index
        public ActionResult Index()
        {
            return View();
        }

            // NuevaFactura
        [HttpPost]
        public ActionResult cargarVistaNuevaFactura()
        {
            return PartialView("NuevaFactura");
        }

            // Detalles factura
        [HttpPost]
        public ActionResult leerFactura(FormCollection datos)
        {
            Guid idFactura = Guid.Parse(datos["idFactura"]);
            tbFactura usuario = FacturasRepo.leerFactura(idFactura);
            return PartialView("Details", usuario);
        }

        



        ///////////////////////////////////////////////////////////////////////////////
        // Funciones
        ///////////////////////////////////////////////////////////////////////////////
        

        

            //Leer dacturas
        [HttpPost]
        public ActionResult leerTodos()
        {
            var facturas = from f in FacturasRepo.listarFacturas() 
                           select new
                               {
                                   idFactura = f.idFactura,
                                   concepto = f.Concepto,
                                   estado = f.FKEstado,
                                   total = f.Total,
                                   juntaDirectiva = f.FKJuntaDirectiva,
                                   fecha = f.Fecha.ToShortDateString()
                               };

            return Json(facturas);
        }
  
            // Nueva factura
        [HttpPost]
        public int nuevaFactura(FormCollection data)
        {
            // Obtenemos los datos del formulario
            decimal total = decimal.Parse(data["total"]);
            String concepto = data["concepto"];
            Guid ef = Guid.Parse(data["estado"]);
            Guid jd = Guid.Parse(data["jd"]);

            // Creamos la nueva entidad
            tbFactura f = new tbFactura
            {
                idFactura = Guid.NewGuid(),
                Fecha = DateTime.Now,
                Total = total,
                Concepto = concepto,
                FKEstado = ef,
                FKJuntaDirectiva = jd
            };

            // La insertamos en la BD
            FacturasRepo.nuevaFactura(f);


            return 1; // Pensado para devolver errores
        }


            // Eliminar factura
        [HttpPost]
        public void eliminarFactura(FormCollection id)
        {
            //FacturasRepo.eliminarFactura(id);
            id.AllKeys.ToString();
        }

 
    }
}
