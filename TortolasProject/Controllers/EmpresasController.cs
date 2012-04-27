using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class EmpresasController : Controller
    {
        static EmpresasRepositorio EmpresasRepo = new EmpresasRepositorio();

        public ActionResult Index()
        {
            //var empresas = from Nombre in mtbMalagaDB.tbEmpresa select Nombre;
            return View();
        }

        public ActionResult Create()
        {
            return PartialView("Create");
        }
        

        [HttpPost]
        public ActionResult LeerTodos()
        {
            var empresas = from ob in EmpresasRepo.ListarEmpresas()
                           select new
                           {
                               idEmpresa = ob.idEmpresa,
                               Nombre = ob.Nombre,
                               CIF = ob.CIF,
                               Localidad = ob.Localidad,
                               DireccionWeb = ob.DireccionWeb,
                               TelefonodeContacto = ob.TelefonodeContacto,
                               Email = ob.Email
                           };
            return Json(empresas);
        }
        [HttpPost]
        public void UpdateEmpresa(FormCollection data)
        {
            Guid idEmpresa = Guid.Parse(data["idempresa"]);
            String Nombre = data["nombreempresaupdate"];
            String Localidad = data["localidadupdate"];
            String DireccionWeb = data["direccionwebupdate"];
            int TelefonodeContacto = int.Parse(data["telefonodecontactoupdate"]);
            String Email = data["emailupdate"];
            String CIF = data["cifupdate"];

            
            tbEmpresa Empresa = new tbEmpresa
            {
                idEmpresa = idEmpresa,
                Nombre = Nombre,
                Localidad = Localidad,
                DireccionWeb = DireccionWeb,
                TelefonodeContacto = TelefonodeContacto,
                Email = Email,
                CIF = CIF,
            };

            EmpresasRepo.updateEmp(Empresa);
        }
        [HttpPost]
        public void CreateEmpresa(FormCollection data)
        {
            Guid idEmpresa = Guid.NewGuid();
            String Nombre = data["nombreempresa"];
            String Localidad = data["localidad"];
            String DireccionWeb = data["direccionweb"];
            int TelefonodeContacto = int.Parse(data["telefonodecontacto"]);
            String Email = data["email"];
            String CIF = data["cif"];


            tbEmpresa Empresa = new tbEmpresa
            {
                idEmpresa = idEmpresa,
                Nombre = Nombre,
                Localidad = Localidad,
                DireccionWeb = DireccionWeb,
                TelefonodeContacto = TelefonodeContacto,
                Email = Email,
                CIF = CIF,
            };

            EmpresasRepo.createEmp(Empresa);
            
        }
        public void DeleteEmpresa(FormCollection data)
        {
            Guid idEmpresa = Guid.Parse(data["idempresa"]);

            EmpresasRepo.deleteEmp(idEmpresa);
        }
        [HttpPost]
        public ActionResult CargarVistaNuevaEmpresa()
        {
            return PartialView("NuevaEmpresa");
        }
        
    }    
}
