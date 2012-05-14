using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class PedidosRepositorio
    {
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }

    }
}
