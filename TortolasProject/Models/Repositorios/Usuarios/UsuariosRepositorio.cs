using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class UsuariosRepositorio
    {
        //
        // GET: /Usuarios/

        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbUsuario> listarUsuarios()
        {
            return mtbMalagaDB.tbUsuario.ToList();

        }

    }
}
