using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers.Empresas
{

    public class AsociacionesController : Controller
    {
        static EmpresasRepositorio AsociacionesRepo = new EmpresasRepositorio();

        //
        // GET: /Asociaciones/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {

            var asociaciones = from ob in AsociacionesRepo.ListarAsociaciones()
                           select new
                           {
                               idAsociacion = ob.FKCodigoEmpresa,
                               Direccion = ob.Direccion,
                               Tematica = ob.Tematica,
                               NombreAsociacion = AsociacionesRepo.buscaremp(ob.FKCodigoEmpresa).Nombre
                               
                           };
            return Json(asociaciones);
        }

        [HttpPost]
        public void UpdateAsociacion(FormCollection data)
        {
            Guid idAsociacion = Guid.Parse(data["idempresa"]);
            String Direccion = data["direccionupdate"];
            String Tematica = data["tematicaupdate"];


            tbAsociacion asociacion = new tbAsociacion
            {
                FKCodigoEmpresa = idAsociacion,
                Direccion = Direccion,
                Tematica = Tematica
            };


            AsociacionesRepo.updateAsoc(asociacion);
        }

        public void DeleteAsociacion(FormCollection data)
        {
            Guid idAsociacion = Guid.Parse(data["idasociacion"]);

            AsociacionesRepo.deleteAsoc(idAsociacion);
            AsociacionesRepo.deleteEmp(idAsociacion);
        }

    }


}
