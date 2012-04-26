using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class ArticulosRepositorio
    {
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }
        
        //tbArticulo
        public IList<tbArticulo> listarArticulos()
        {
            return mtbMalagaDB.tbArticulo.ToList();
        }

        public void añadirArticulo(tbArticulo f)
        {
            mtbMalagaDB.tbArticulo.InsertOnSubmit(f);
            save();
        }



    }
}