using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class AccountRepositorio
    {
         // Conecto a la BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public void registro(tbUsuario nuevoUsuario)
        {
            mtbMalagaDB.tbUsuario.InsertOnSubmit(nuevoUsuario);
            mtbMalagaDB.SubmitChanges();
        }
    }
}