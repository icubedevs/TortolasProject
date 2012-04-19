using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class MonitoresRepositorio 
    {
        // Conecto a la BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbMonitor> listarTodos()
        {           
            return mtbMalagaDB.tbMonitor.ToList();            
        }

    }
}
