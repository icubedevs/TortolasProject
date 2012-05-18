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

        public IList<tbPedidoGlobal> listarPedidos()
        {
            return mtbMalagaDB.tbPedidoGlobal.ToList();
        }

        public void anadirPedido(tbPedidoGlobal f)
        {
            mtbMalagaDB.tbPedidoGlobal.InsertOnSubmit(f);
            save();
        }
        
        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }

    }
}
