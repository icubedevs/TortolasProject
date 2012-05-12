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

    }
}
