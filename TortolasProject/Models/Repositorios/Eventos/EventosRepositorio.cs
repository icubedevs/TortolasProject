using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class EventosRepositorio : Controller
    {
        //Conexion BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbEvento> listarTodos()
        {
            return mtbMalagaDB.tbEvento.ToList();
        }

        public tbEvento details(Guid id)
        {
            return mtbMalagaDB.tbEvento.Where(evento => evento.idEvento == id).Single();
        }

    }
}
