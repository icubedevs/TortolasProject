using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class FacturasRepositorio
    {
        // Conecto a la BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbUsuario> listarTodos()
        {
            return mtbMalagaDB.tbUsuario.ToList();

        }
    }
}