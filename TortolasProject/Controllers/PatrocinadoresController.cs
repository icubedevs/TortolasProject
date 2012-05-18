using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers
{
    public class PatrocinadoresController : Controller
    {
        static EmpresasRepositorio PatrocinadoresRepo = new EmpresasRepositorio();
        //
        // GET: /Patrocinadores/

        public ActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public ActionResult LeerTodos()
        {

            var patrocinadores = from ob in PatrocinadoresRepo.ListarPatrocinadores()
                              select new
                              {
                                  idPatrocinador = ob.FKCodigoEmpresa,
                                  LocalizacionP = ob.LocalizacionPublicidad,
                                  NombrePatrocinador = PatrocinadoresRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                                  CIFEmpresaPat = PatrocinadoresRepo.buscaremp(ob.FKCodigoEmpresa).CIF,
                              };
            return Json(patrocinadores);
        }

        [HttpPost]
        public void UpdatePatrocinador(FormCollection data)
        {
            Guid idPatrocinador = Guid.Parse(data["idpatrocinador"]);
            Guid FKCodigoEmpresa = Guid.Parse(data["FKCodigoEmpresa"]);
            String Localización = data["locupdate"];

            tbPatrocinador patrocinador = new tbPatrocinador
            {
                 FKCodigoEmpresa = FKCodigoEmpresa,
                 idPatrocinador = idPatrocinador,//Le doy un valor para que no este vacio ni repetido, al actualizar no incluyo ese campo
                 LocalizacionPublicidad = Localización

            };


            PatrocinadoresRepo.updatePat(patrocinador);
        }

        [HttpPost]
        public void DeletePatrocinador(FormCollection data)
        {
            Guid idPatrocinador = Guid.Parse(data["idpatrocinador"]);

            PatrocinadoresRepo.deletePat(idPatrocinador);
            //PatrocinadoresRepo.deleteEmp(idPatrocinador);
        }

        [HttpPost]
        public void CreatePatrocinador(FormCollection data)
        {
            bool existe = true;

            Guid idEmpresa = Guid.NewGuid();
            String Nombre = data["nombreempresa"];
            int TelefonodeContacto = int.Parse(data["telefono"]);
            int TelefonodeContacto2 = int.Parse(data["telefono2"]);
            String Localizacion = data["localizacion"];
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
            tbPatrocinador Patrocinador = new tbPatrocinador
            {
                FKCodigoEmpresa = idEmpresa,
                idPatrocinador = Guid.NewGuid(),
                LocalizacionPublicidad = Localizacion
            };
            try
            {
                if (PatrocinadoresRepo.buscarempCIF(CIF).CIF.Equals(CIF)) //Si entra dentro del bucle es que EXISTE una empresa asociada
                {
                    Patrocinador.FKCodigoEmpresa = PatrocinadoresRepo.buscarempCIF(CIF).idEmpresa;
                }
            }
            catch
            {
                existe = false;
            }

            if (!existe)
            {
                PatrocinadoresRepo.createEmp(Empresa);
            }

            PatrocinadoresRepo.createPat(Patrocinador);

        }

    }
}
