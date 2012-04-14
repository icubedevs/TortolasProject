using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class EmpresasRepositorio
    {
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbEmpresa> ListarEmpresas()
        {
            return mtbMalagaDB.tbEmpresa.ToList();
        }
        public tbEmpresa DetalleEmpresa(Guid cif)
        {
            return mtbMalagaDB.tbEmpresa.Where(user => user.CIF == cif).Single();
        }

    }
}