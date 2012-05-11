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
                               NombreAsociacion = AsociacionesRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                               Telefono = AsociacionesRepo.buscaremp(ob.FKCodigoEmpresa).TelefonodeContacto
                               
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

        public void CreateAsociacion(FormCollection data)
        {
            bool existe = true;

            Guid idEmpresa = Guid.NewGuid();
            String Nombre = data["nombreempresa"];
            String tematica = data["tematica"];
            int TelefonodeContacto = int.Parse(data["telefono"]);
            int TelefonodeContacto2 = int.Parse(data["telefono2"]);
            String direccion = data["direccion"];
            String CIF = data["cif"];

            tbEmpresa Empresa = new tbEmpresa
            {
                idEmpresa = idEmpresa,
                Nombre = Nombre,
                Localidad = " ",
                DireccionWeb = " ",
                TelefonodeContacto = TelefonodeContacto,
                Email = " ",
                CIF = CIF
            };
            tbAsociacion Asociacion = new tbAsociacion 
            { 
                FKCodigoEmpresa = idEmpresa,
                Tematica = tematica,
                Direccion = direccion,
            };
            try
            {
                if (AsociacionesRepo.buscarempCIF(CIF).CIF.Equals(CIF)) //Si entra dentro del bucle es que EXISTE una empresa asociada
                {
                    Asociacion.FKCodigoEmpresa = AsociacionesRepo.buscarempCIF(CIF).idEmpresa;
                }
                /*else
                {
                    AsociacionesRepo.createEmp(Empresa);

                }*/
            }
            catch
            {
                existe = false;
            }

            if (!existe)
            {
                AsociacionesRepo.createEmp(Empresa);
            }

            AsociacionesRepo.createAsoc(Asociacion);
            
        }

    }


}
