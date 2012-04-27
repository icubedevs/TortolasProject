using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Helpers;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class FacturasController : Controller
    {
        mtbMalagaDataContext db = new mtbMalagaDataContext();
        static FacturasRepositorio FacturasRepo = new FacturasRepositorio();

        ///////////////////////////////////////////////////////////////////////////////
        // Carga de vistas
        ///////////////////////////////////////////////////////////////////////////////

            // Index
        public ActionResult Index()
        {
            return View();
        }

            // Nueva Factura
        public ActionResult nuevaFactura()
        {
            var configuracion = new {
                    vista = "nueva"
            };
            return View("factura", configuracion);
        }

            // Detalles factura
        public ActionResult leerFactura(String id)
        {
            Guid idFactura = Guid.Parse(id);
            tbFactura f = FacturasRepo.leerFactura(idFactura);
            var factura = new {
                              idFactura = f.idFactura,
                              Concepto = f.Concepto,
                              Fecha = f.Fecha.ToShortDateString(),
                              Estado = FacturasRepo.getEstado(f.idFactura),
                              Total = f.Total
                          };
            return View("leerFactura", f);
        }

        public ActionResult editarFactura(String id)
        {
            Guid idFactura = Guid.Parse(id);
            tbFactura f = FacturasRepo.leerFactura(idFactura);
            var factura = new
            {
                idFactura = f.idFactura,
                Concepto = f.Concepto,
                Fecha = f.Fecha.ToShortDateString(),
                Estado = FacturasRepo.getEstado(f.idFactura),
                Total = f.Total
            };
            return View("editarFactura", f);
        }
            

        



        ///////////////////////////////////////////////////////////////////////////////
        // Funciones
        ///////////////////////////////////////////////////////////////////////////////

            //  Leer facturas
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

            // Leer lineas factura
        [HttpPost]
        public ActionResult leerLineasFactura(FormCollection data)
        {
            Guid idFactura = Guid.Parse(data["idFactura"]);
            var lineasFactura = from l in FacturasRepo.listarLineasFactura(idFactura)
                                select new {
                                    idLineaFactura = l.idLineaFactura,
                                    concepto = l.Descripcion,
                                    unidades = l.Unidades,
                                    precio = l.PrecioUnitario,
                                    total = l.Total
                                };

            return Json(lineasFactura);

        }
  
            // Nueva factura
        [HttpPost]
        public String nuevaFactura(FormCollection data)
        {
            // Obtenemos los datos del formulario
            String concepto = data["concepto"];
            Guid ef = Guid.Parse(data["estado"]);
            Guid user = HomeController.obtenerUserIdActual();
            Guid juntaDirectiva = db.tbJuntaDirectiva.Where(jd => jd.FKSocio == db.tbSocio.Where(s => s.FKUsuario == db.tbUsuario.Where(u => u.FKUser == user).Single().idUsuario).Single().idSocio).Single().FKSocio;
            var lineasFacturaRaw = System.Web.Helpers.Json.Decode(data["lineasFactura"]);
            Decimal total = 0;

            // Creamos la nueva entidad
            tbFactura f = new tbFactura
            {
                idFactura = Guid.NewGuid(),
                Fecha = DateTime.Now,
                Total = total,
                Concepto = concepto,
                FKEstado = ef,
                FKJuntaDirectiva = juntaDirectiva
            };

            
            // Creamos la lista de lineas de factura
            List<tbLineaFactura> lineasFactura = new List<tbLineaFactura>();
            int i;
            int unidadesLinea;
            Decimal precioLinea;
            Decimal totalLinea;

            for ( i = 0; i < lineasFacturaRaw.Length; ++i)
            {
                precioLinea = lineasFacturaRaw[i].precio;
                unidadesLinea = lineasFacturaRaw[i].unidades;                
                totalLinea = unidadesLinea * precioLinea;

                tbLineaFactura linea = new tbLineaFactura
                {
                    FKFactura = f.idFactura,
                    idLineaFactura = Guid.NewGuid(),
                    Descripcion = lineasFacturaRaw[i].concepto,
                    Unidades = unidadesLinea,
                    PrecioUnitario = precioLinea,
                    Total = totalLinea
                };
                total = total + totalLinea;
                lineasFactura.Add(linea);
            }

            // Actualizamos el total de la factura
            f.Total = total;
            

            // La insertamos en la BD
            FacturasRepo.nuevaFactura(f);
            foreach(tbLineaFactura linea in lineasFactura)
            {
                FacturasRepo.nuevaLinea(linea);
            }
            
            return "ok"; // Pensado para devolver errores
        }

            // Editar factura
        [HttpPost]
        public void editarFactura(FormCollection data)
        {
            // Obtenemos los datos del formulario
            Guid idFactura = Guid.Parse(data["idFactura"]);
            String concepto = data["concepto"];
            Guid user = HomeController.obtenerUserIdActual();
            Guid juntaDirectiva = db.tbJuntaDirectiva.Where(jd => jd.FKSocio == db.tbSocio.Where(s => s.FKUsuario == db.tbUsuario.Where(u => u.FKUser == user).Single().idUsuario).Single().idSocio).Single().FKSocio;
            Guid ef = Guid.Parse(data["estado"]);
            var lineasFacturaRaw = System.Web.Helpers.Json.Decode(data["lineasFactura"]);
            Decimal total = 0;
            DateTime fecha = DateTime.Parse(data["fecha"]);
            
            tbFactura facturaAntigua = new tbFactura
            {
                Concepto = concepto,
                Fecha = fecha,
                Total = total,
                FKEstado = ef,
                FKJuntaDirectiva = juntaDirectiva
            };

            // Creamos la lista de lineas de factura
            List<tbLineaFactura> lineasFactura = new List<tbLineaFactura>();
            List<tbLineaFactura> lineasExistentes = FacturasRepo.listarLineasFactura(idFactura).ToList<tbLineaFactura>() ;

            int i;
            int unidadesLinea;
            Decimal precioLinea;
            Decimal totalLinea;

            for (i = 0; i < lineasFacturaRaw.Length; ++i)
            {
                precioLinea = lineasFacturaRaw[i].precio;
                unidadesLinea = lineasFacturaRaw[i].unidades;
                totalLinea = unidadesLinea * precioLinea;

                if (!lineasFacturaRaw[i].idLineaFactura.Equals(""))
                {
                    tbLineaFactura linea = new tbLineaFactura
                    {
                        idLineaFactura = Guid.Parse(lineasFacturaRaw[i].idLineaFactura),
                        FKFactura = idFactura,
                        Descripcion = lineasFacturaRaw[i].concepto,
                        Unidades = unidadesLinea,
                        PrecioUnitario = precioLinea,
                        Total = totalLinea
                    };

                    lineasExistentes.Remove(lineasExistentes.Where(l => l.idLineaFactura == linea.idLineaFactura).Single());
                    FacturasRepo.modificarLinea(linea.idLineaFactura, linea);
                }
                else
                {
                    tbLineaFactura linea = new tbLineaFactura
                    {
                        idLineaFactura = Guid.NewGuid(),
                        FKFactura = idFactura,
                        Descripcion = lineasFacturaRaw[i].concepto,
                        Unidades = unidadesLinea,
                        PrecioUnitario = precioLinea,
                        Total = totalLinea
                    };

                    FacturasRepo.nuevaLinea(linea);
                }
                total = total + totalLinea; 
            }
            facturaAntigua.Total = total;
            FacturasRepo.modificarFactura(idFactura, facturaAntigua);

            foreach (tbLineaFactura lineaExistente in lineasExistentes)
            {
                FacturasRepo.eliminarLinea(FacturasRepo.listarLineasFactura(idFactura).Where(l => l.idLineaFactura == lineaExistente.idLineaFactura).Single().idLineaFactura);
            }
        }


            // Eliminar factura
        [HttpPost]
        public void eliminarFactura(FormCollection data)
        {
            Guid idFactura = Guid.Parse(data["idFactura"]);
            FacturasRepo.eliminarFactura(idFactura);            
        }

        ///////////////////////////////////////////////////////////////////////////////
        // Autocomplete                                                             
        ///////////////////////////////////////////////////////////////////////////////
            // Usuarios
        [HttpPost]
        public JsonResult usuariosAutocomplete()
        {
            var usuarios = from u in db.tbUsuario
                           select new
                           {
                               idUsuario = u.idUsuario,
                               nickname = u.Nickname
                           };

            return Json(usuarios);
        }

            // Artículos
        [HttpPost]
        public JsonResult articulosAutocomplete()
        {
            var articulos = from a in db.tbArticulo
                           select new
                           {
                               idArticulo = a.idArticulo,
                               Nombre = a.Nombre
                           };

            return Json(articulos);
        }

            // Eventos
        [HttpPost]
        public JsonResult eventosAutocomplete()
        {
            var eventos = from e in db.tbEvento
                            select new
                            {
                                idEvento = e.idEvento,
                                Titulo = e.Titulo
                            };

            return Json(eventos);
        }
    }
}
