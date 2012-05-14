using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class InventarioRepositorio
    {

        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbInventario> listarInventario()
        {
            return mtbMalagaDB.tbInventario.ToList();
        }

        public tbInventario leerInventario(Guid idInventario)
        {
            return mtbMalagaDB.tbInventario.Where(inv => inv.idInventario == idInventario).Single();
        }

        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }

        public void anadirInventario(tbInventario f)
        {
            mtbMalagaDB.tbInventario.InsertOnSubmit(f);
            save();
        }

        public void eliminarInventario(tbInventario f)
        {
            mtbMalagaDB.tbInventario.DeleteOnSubmit(f);
            save();
        }
    }
}
