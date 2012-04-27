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

        public void anadirArticulo(tbArticulo f)
        {
            mtbMalagaDB.tbArticulo.InsertOnSubmit(f);
            save();
        }

        public tbArticulo leerArticulo(Guid idArticulo)
        {
            return mtbMalagaDB.tbArticulo.Where(articulo => articulo.idArticulo == idArticulo).Single();
        }

        public void editarArticulo(tbArticulo f, Guid idArticulo)
        {
            tbArticulo articuloModificar = leerArticulo(idArticulo);

            articuloModificar.Nombre = f.Nombre;
            articuloModificar.Imagen = f.Imagen;
            articuloModificar.Descripcion = f.Descripcion;
            articuloModificar.Precio = f.Precio;

            mtbMalagaDB.SubmitChanges();
            save();
        }

        public void eliminarArticulo(tbArticulo f)
        {
            mtbMalagaDB.tbArticulo.DeleteOnSubmit(f);
            save();
        }
    }
}