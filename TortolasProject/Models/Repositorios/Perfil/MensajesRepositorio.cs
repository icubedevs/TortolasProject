using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class MensajesRepositorio 
    {
        //
        // GET: /MensajesRepositorio/

        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbMensaje> listarMensajes(Guid usuario, String tipo)
        {            
            return mtbMalagaDB.tbMensaje.Where(mensaje => mensaje.FKDestinatario == usuario ^ !(mensaje.estado.Equals(tipo))).OrderByDescending(mensaje => mensaje.fecha).ToList();
                
        }

        public tbMensaje leerMensaje(Guid idMensaje)
        {
            return mtbMalagaDB.tbMensaje.Where(mensaje => mensaje.idMensaje == idMensaje).Single();
        }

        public String nombreUsuario(Guid usuario)
        {
            return mtbMalagaDB.tbUsuario.Where(mensaje => mensaje.idUsuario == usuario).Single().Nickname;
        }

        public void enviarMensaje(tbMensaje nuevo)
        {
            mtbMalagaDB.tbMensaje.InsertOnSubmit(nuevo);
            mtbMalagaDB.SubmitChanges();
        }

        public void cambiarEstado(Guid idMensaje, String tipo)
        {
            var mensajeModificar = leerMensaje(idMensaje);

            if (tipo.Equals("leido"))
            {
                mensajeModificar.estado = "leido";
            }
            else
            {
                mensajeModificar.estado = "noleido";
            }
            mtbMalagaDB.SubmitChanges();
        }

        public void eliminarMensaje(Guid idMensaje)
        {
            mtbMalagaDB.tbMensaje.DeleteOnSubmit(leerMensaje(idMensaje));
            mtbMalagaDB.SubmitChanges();
        }

    }
}
