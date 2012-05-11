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
            tbFactura f = new tbFactura {
                    vista = "nueva"
            };
            var estado = f.vista;
            return View("factura",f);
        }

            // Detalles factura
        public ActionResult leerFactura(String id)
        {
            Guid idFactura = Guid.Parse(id);
            tbFactura f = FacturasRepo.leerFactura(idFactura);
            f.vista = "detalles";
            if (f.FKUsuario != null) { f.idRelacion = f.FKUsuario.ToString(); }
            else { f.idRelacion = null; }
   
            return View("factura", f);
        }

        [HttpGet]
        public ActionResult editarFactura(String id)
        {
            Guid idFactura = Guid.Parse(id);
            tbFactura f = FacturasRepo.leerFactura(idFactura);
            var factura = new
            {
                vista = "editar",
                idFactura = f.idFactura,
                Concepto = f.Concepto,
                Fecha = f.Fecha.ToShortDateString(),
                Estado = FacturasRepo.getEstado(f.idFactura),
                Total = f.Total
            };
            return View("factura", f);
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
            var idRelacion = data["idRelacion"];
            string tipo = data["tipo"];

                                   
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

            // Metemos las relaciones con otros subsistemas
            if (tipo.Equals("usuario"))         f.FKUsuario = Guid.Parse(idRelacion);
            else if (tipo.Equals("eventos"))    f.FKEventoOficial = Guid.Parse(idRelacion);
            else if(tipo.Equals("cursillos"))   f.FKCursillo = Guid.Parse(idRelacion);
            else if (tipo.Equals("pedidoGlobal"))
            {
                // METER FK PEDIDO GLOBAL EN FACTURA
            }
            else if (tipo.Equals("pedidoUsuario"))
            {
                // IDEM
            }
            
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
            //var relacion = System.Web.Helpers.Json.Decode(data["idRelacion"]); <--- SI DESEAS DECODIFICAR UN JSON
            Guid idRelacion = new Guid();
            if (!data["idRelacion"].Equals("null"))
            {
                idRelacion = Guid.Parse(data["idRelacion"]);
            }
            string tipo = data["tipo"];

            
            tbFactura facturaAntigua = new tbFactura
            {
                Concepto = concepto,
                Fecha = fecha,
                Total = total,
                FKEstado = ef,
                FKJuntaDirectiva = juntaDirectiva
            };

            // Metemos las relaciones con otros subsistemas
            if (tipo.Equals("usuario")) facturaAntigua.FKUsuario = idRelacion; else facturaAntigua.FKUsuario = null;
            if (tipo.Equals("eventos")) facturaAntigua.FKEventoOficial = idRelacion; else facturaAntigua.FKEventoOficial = null;
            if (tipo.Equals("cursillos")) facturaAntigua.FKCursillo = idRelacion; else facturaAntigua.FKCursillo = null;
            //if (tipo.Equals("pedidoGlobal")) facturaAntigua.FKPedidoGlobal = idRelacion; else facturaAntigua.FKPedidoGlobal = null;
            //if (tipo.Equals("pedidoUsuario")) facturaAntigua.FKPedidoUsuario = idRelacion; else facturaAntigua.FKPedidoUsuario = null;
            if (tipo.Equals("empresa")) facturaAntigua.FKCodigoEmpresa = idRelacion; else facturaAntigua.FKCodigoEmpresa = null;
            if (tipo.Equals("proveedor")) facturaAntigua.FKProveedores = idRelacion; else facturaAntigua.FKProveedores = null;
            if (tipo.Equals("contrato")) facturaAntigua.FKContrato = idRelacion; else facturaAntigua.FKContrato = null;
            
            
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


        [HttpPost]
        public JsonResult leerFactura(FormCollection data)
        {
            Guid idFactura = Guid.Parse(data["idFactura"]);
            tbFactura factura = FacturasRepo.leerFactura(idFactura);
            if (factura.FKUsuario != null) { factura.idRelacion = factura.FKUsuario.Value.ToString(); factura.tipo = "usuario"; }
           
            

            var f = new
            {
                idFactura = factura.idFactura,
                Total = factura.Total,
                FKEstado = factura.FKEstado,
                Fecha = factura.Fecha.ToShortDateString().ToString(),
                Concepto = factura.Concepto,
                idRelacion = factura.idRelacion,
                tipo = factura.tipo,
                NombreEstado = FacturasRepo.getEstado(factura.idFactura)
            };            

            return Json(f);
        }
        ///////////////////////////////////////////////////////////////////////////////
        // Listas                                                            
        ///////////////////////////////////////////////////////////////////////////////
            // Usuarios
        [HttpPost]
        public JsonResult usuariosListado()
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
        public JsonResult articulosListado()
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
        public JsonResult eventosListado()
        {
            var eventos = from e in db.tbEvento
                            select new
                            {
                                idEvento = e.idEvento,
                                Titulo = e.Titulo,
                                Lugar = e.Lugar,
                                FechaRealizacion = e.FechaRealizacion.ToShortDateString()
                            };

            return Json(eventos);
        }
        // Cursillos
        [HttpPost]
        public JsonResult cursillosListado()
        {
            var cursillos = from e in db.tbCursillo
                          select new
                          {
                              idCursillo = e.idCursillo,
                              Titulo = e.Titulo,
                              Lugar = e.Lugar,
                              FechaRealizacion = e.FechaRealizacion.ToShortDateString()
                          };

            return Json(cursillos);
        }

        // Pedidos globales
        [HttpPost]
        public JsonResult pedidosGlobalesListado()
        {
            var pedidos = from e in db.tbPedidoGlobal
                            select new
                            {
                                idPedidoGlobal = e.idPedidoGlobal,
                                Total = e.Total
                            };

            return Json(pedidos);
        }

        // Pedidos usuario
        [HttpPost]
        public JsonResult pedidosUsuarioListado()
        {
            var pedidos = from e in db.tbPedidoUsuario
                          select new
                          {
                              idPedidoUsuario = e.idPedidoUsuario,
                              idUsuario = e.FKUsuario,
                              nickname = db.tbUsuario.Where(u => u.idUsuario == e.FKUsuario).Single()
                          };

            return Json(pedidos);
        }
        
        // Empresas
        [HttpPost]
        public JsonResult empresasListado()
        {
            var empresas = from e in db.tbEmpresa
                           select new
                           {
                                idEmpresa = e.idEmpresa,
                                CIF = e.CIF,
                                Nombre = e.Nombre,
                                Email = e.Email,
                                Localidad = e.Localidad,
                                Telefono = e.TelefonodeContacto
                           };
            return Json(empresas);
        }

        // Proveedores
        [HttpPost]
        public JsonResult proveedoresListado()
        {
            var proveedores = from p in db.tbProveedores
                              select new
                              {
                                  idProveedores = p.idProveedores,
                                  Mercado = p.Mercado,
                                  Direccion = p.DireccionFisica,
                                  Nombre = db.tbEmpresa.Where(e => p.FKCodigoEmpresa == e.idEmpresa).Single().Nombre
                              };
            return Json(proveedores);
        }

        // Contratos
        public JsonResult contratosListado()
        {
            var contratos = from c in db.tbContrato
                            select new
                            {
                                Descripcion = c.DescripcionLegal,
                                FechaCaducidad = c.FechaCaducidad.ToShortDateString(),
                                FechaCreacion = c.FechaCreacion.Value.ToShortDateString(),
                                Firmas = c.Firmas,
                                FKCodigoEmpresa = c.FKCodigoEmpresa,
                                idContrato = c.idContrato,
                                Importe = c.Importe,
                                NombreEmpresa = c.NombreEmpresa
                            };
            return Json(contratos);
        }

        // Estados de factura
        [HttpPost]
        public JsonResult estadosListado()
        {
            var estados = from e in db.tbEstadoFactura
                          select new
                          {
                              idEstadoFactura = e.idEstadoFactura,
                              Nombre = e.Nombre
                          };
            return Json(estados);
        }
    }
}
