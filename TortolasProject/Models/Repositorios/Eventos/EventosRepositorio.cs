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

        public IList<tbEvento> listarEventos()
        {
            return mtbMalagaDB.tbEvento.ToList();
        }

        public tbEvento details(Guid id)
        {
            return mtbMalagaDB.tbEvento.Where(evento => evento.idEvento == id).Single();
        }

        public tbEvento leerEvento(Guid id)
        {
            return mtbMalagaDB.tbEvento.Where(evento => evento.idEvento == id).Single();
        }

        public void crearEvento(tbEvento ev)
        {
            mtbMalagaDB.tbEvento.InsertOnSubmit(ev);
            save();
        }

        public void eliminarEvento(Guid id) 
        {
            tbEvento ev = leerEvento(id);
            mtbMalagaDB.tbEvento.DeleteOnSubmit(ev);
            save();
        }

        public void editarEvento(Guid id, tbEvento evento) 
        {
            tbEvento ev = leerEvento(id);

            ev.Titulo = evento.Titulo;
            ev.FechaRealizacion = evento.FechaRealizacion;
            ev.Lugar = evento.Lugar;
            ev.Actividad = evento.Actividad;
            ev.FechaAperturaInscripcion = evento.FechaAperturaInscripcion;
            ev.FechaLimiteInscripcion = evento.FechaLimiteInscripcion;
            ev.PrioridadSocios = evento.PrioridadSocios;
            ev.Plazas = evento.Plazas;

            save();
        }

        public IList<tbEvento> getByUser(Guid idUsuario)
        {
            return mtbMalagaDB.tbEvento.Where(evento => evento.FKUsuarioCreador == idUsuario).ToList();
        }

        //PARTICIPANTES
        /*Participantes y documentos de inscripcion y tal y cual y esto y lo otro,  mas tarde lo abordaremos y tal y cual...
        public void leerTodosDocInscrip()
        */

        // 
        //  Funciones auxiliares
        //
        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }
    }
}
