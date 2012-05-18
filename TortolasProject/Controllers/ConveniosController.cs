using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class ConveniosController : Controller
    {
        //
        // GET: /Convenios/
        static EmpresasRepositorio ConveniosRepo = new EmpresasRepositorio();

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {

            var convenios = from ob in ConveniosRepo.ListarConvenios()
                              select new
                              {
                                  idConvenio = ob.idConvenio,
                                  FKCodigoEmpresa = ob.FKCodigoEmpresa,
                                  Descripcion = ob.DescripcionOferta,
                                  NombreEmpre = ConveniosRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                                  CIFEmpresaC = ConveniosRepo.buscaremp(ob.FKCodigoEmpresa).CIF,
                              };
            return Json(convenios);
        }

        [HttpPost]
        public void UpdateConvenio(FormCollection data)
        {
            Guid idConvenio = Guid.Parse(data["idconvenio"]);
            String Descripcion = data["descripcion"];

            tbConvenio convenio = new tbConvenio
            {
                 
                DescripcionOferta = Descripcion,
                FKCodigoEmpresa = Guid.NewGuid(),
                idConvenio = idConvenio 
                   
            };


            ConveniosRepo.updateCon(convenio);
        }

        [HttpPost]
        public void DeleteConvenio(FormCollection data)
        {
            Guid idConvenio = Guid.Parse(data["idconvenio"]);

            ConveniosRepo.deleteCon(idConvenio);
        }

        [HttpPost]
        public void CreateConvenio(FormCollection data)
        {
            bool existe = true;

            Guid idEmpresa = Guid.NewGuid();
            String Nombre = data["nombreempresa"];
            int TelefonodeContacto = int.Parse(data["telefono"]);
            int TelefonodeContacto2 = int.Parse(data["telefono2"]);
            String descripcion = data["descripcion"];
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
            tbConvenio Convenio = new tbConvenio
            {
                FKCodigoEmpresa = idEmpresa,
                idConvenio = Guid.NewGuid(),
                DescripcionOferta = descripcion
            };
            try
            {
                if (ConveniosRepo.buscarempCIF(CIF).CIF.Equals(CIF)) //Si entra dentro del bucle es que EXISTE una empresa asociada
                {
                    Convenio.FKCodigoEmpresa = ConveniosRepo.buscarempCIF(CIF).idEmpresa;
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
                ConveniosRepo.createEmp(Empresa);
            }

            ConveniosRepo.createCon(Convenio);
        }
    }
}
