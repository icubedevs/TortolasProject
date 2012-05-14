using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models;
using TortolasProject.Models.Repositorios;

namespace TortolasProject.Controllers.Empresas
{

    public class ProveedoresController : Controller
    {

        static EmpresasRepositorio ProveedoresRepo = new EmpresasRepositorio();
        //
        // GET: /Proveedores/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {

            var proveedores = from ob in ProveedoresRepo.ListarProveedores()
                               select new
                               {
                                   idProveedor = ob.FKCodigoEmpresa,
                                   DireccionFisica = ob.DireccionFisica,
                                   Mercado = ob.Mercado,
                                   CodigoPostal = ob.CodigoPostal,
                                   NombreProveedor = ProveedoresRepo.buscaremp(ob.FKCodigoEmpresa).Nombre,
                                   CIFEmpresaP = ProveedoresRepo.buscaremp(ob.FKCodigoEmpresa).CIF,
                               };
            return Json(proveedores);
        }

        [HttpPost]
        public void UpdateProveedor(FormCollection data)
        {
            Guid idProveedor = Guid.Parse(data["idproveedor"]);
            Guid FKCodigoEmpresa = Guid.Parse(data["FKCodigoEmpresa"]);
            String DireccionFis = data["direccionfisupdate"];
            String Mercado = data["mercado"];
            int CodigoPostal = int.Parse(data["codigopostal"]);


            tbProveedores proveedor = new tbProveedores
            {
                FKCodigoEmpresa = idProveedor,
                Mercado = Mercado,
                CodigoPostal = CodigoPostal,
                DireccionFisica = DireccionFis,
                idProveedores = Guid.NewGuid()  //Le doy un valor para que no este vacio ni repetido, al actualizar no incluyo ese campo

            };


            ProveedoresRepo.updateProv(proveedor);
        }

        [HttpPost]
        public void DeleteProveedor(FormCollection data)
        {
            Guid idProveedor = Guid.Parse(data["idProveedor"]);

            ProveedoresRepo.deleteProv(idProveedor);
            ProveedoresRepo.deleteEmp(idProveedor);
        }

        [HttpPost]
        public void CreateProveedor(FormCollection data)
        {
            bool existe = true;

            Guid idEmpresa = Guid.NewGuid();
            String Nombre = data["nombreempresa"];
            String mercado = data["mercado"];
            int TelefonodeContacto = int.Parse(data["telefono"]);
            int TelefonodeContacto2 = int.Parse(data["telefono2"]);
            int codigopostal = int.Parse(data["codigopostal"]);
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
            tbProveedores Proveedor = new tbProveedores
            {
                FKCodigoEmpresa = idEmpresa,
                idProveedores = Guid.NewGuid(),
                Mercado = mercado,
                CodigoPostal = codigopostal,
                DireccionFisica = direccion
            };
            try
            {
                if (ProveedoresRepo.buscarempCIF(CIF).CIF.Equals(CIF)) //Si entra dentro del bucle es que EXISTE una empresa asociada
                {
                    Proveedor.FKCodigoEmpresa = ProveedoresRepo.buscarempCIF(CIF).idEmpresa;
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
                ProveedoresRepo.createEmp(Empresa);
            }

            ProveedoresRepo.createProv(Proveedor);

        }

    }
}
