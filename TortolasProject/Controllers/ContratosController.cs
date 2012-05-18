using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers

{
    public class ContratosController : Controller
    {
        //
        // GET: /Contratos/

        static EmpresasRepositorio ContratosRepo = new EmpresasRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {

            var contratos = from ob in ContratosRepo.ListarContratos()
                            select new
                            {
                                idContrato = ob.idContrato,
                                FKCodigoEmpresa = ob.FKCodigoEmpresa,
                                FKJuntaDirectiva = ob.FKJuntaDirectiva,
                                NombreEmpresa = ContratosRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                                CIFEmpresa = ContratosRepo.buscaremp(ob.FKCodigoEmpresa).CIF,
                                FechaCreacion = ob.FechaCreacion.HasValue ? ob.FechaCreacion.Value.ToShortDateString() : "",
                                FechaCaducidad = ob.FechaCaducidad.ToShortDateString(),
                                DescripcionLegal = ob.DescripcionLegal,
                                Firmas = ob.Firmas,
                                Importe = ob.Importe.ToString(),
                            };
            return Json(contratos);
        }

    }
}
