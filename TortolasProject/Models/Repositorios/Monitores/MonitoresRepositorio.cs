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

        public tbMonitor leerMonitor(Guid id)
        {
            return mtbMalagaDB.tbMonitor.Where(monitor => monitor.idMonitor == id).Single();            
        }

        public void editarMonitor(tbMonitor nuevo)
        {
            tbMonitor monitorModificar = leerMonitor(nuevo.idMonitor);
            
            monitorModificar.Nombre = nuevo.Nombre;
            monitorModificar.Apellidos = nuevo.Apellidos;
            monitorModificar.Direccion = nuevo.Direccion;
            monitorModificar.DNI = nuevo.DNI;
            monitorModificar.Email = nuevo.Email;
            monitorModificar.Telefono = nuevo.Telefono;
            monitorModificar.Foto = nuevo.Foto;
            mtbMalagaDB.SubmitChanges();
        }

        public void crearMonitor(tbMonitor nuevo)
        {
            mtbMalagaDB.tbMonitor.InsertOnSubmit(nuevo);
            mtbMalagaDB.SubmitChanges();
        }

        public void eliminarMonitor(Guid eliminar)
        {
            
            mtbMalagaDB.tbMonitor.DeleteOnSubmit(leerMonitor(eliminar));
            mtbMalagaDB.SubmitChanges();
        }

    }
}
