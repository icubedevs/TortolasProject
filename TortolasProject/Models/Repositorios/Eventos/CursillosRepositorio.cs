using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TortolasProject.Models.Repositorios
{
    public class CursillosRepositorio : Controller
    {
        //Conexion BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        public IList<tbCursillo> listarCursillos()
        {
            return mtbMalagaDB.tbCursillo.ToList();
        }

        public tbCursillo details(Guid id)
        {
            return mtbMalagaDB.tbCursillo.Where(cursillo => cursillo.idCursillo == id).Single();
        }

        public tbCursillo leerCursillo(Guid id)
        {
            return mtbMalagaDB.tbCursillo.Where(cursillo => cursillo.idCursillo == id).Single();
        }

        public void inscripcionCursillo(tbDocInscripcion doc)
        {
            mtbMalagaDB.tbDocInscripcion.InsertOnSubmit(doc);
            save();
        }

        public void crearCursillo(tbCursillo cur)
        {
            mtbMalagaDB.tbCursillo.InsertOnSubmit(cur);
            save();
        }

        public void eliminarCursillo(Guid id)
        {
            tbCursillo cur = leerCursillo(id);

            mtbMalagaDB.tbCursillo.DeleteOnSubmit(cur);
            save();
        }

        public void editarCursillo(Guid id, tbCursillo cursillo)
        {
            tbCursillo cur = leerCursillo(id);

            cur.Titulo = cursillo.Titulo;
            cur.FechaRealizacion = cursillo.FechaRealizacion;
            cur.Lugar = cursillo.Lugar;
            cur.Actividad = cursillo.Actividad;
            cur.FechaAperturaInscripcion = cursillo.FechaAperturaInscripcion;
            cur.Tematica = cursillo.Tematica;
            cur.Precio = cursillo.Precio;
            cur.NumAcompa = cursillo.NumAcompa;
            cur.DescuentoSocios = cursillo.DescuentoSocios;
            cur.ConocimientosPrevios = cursillo.ConocimientosPrevios;
            cur.FechaLimiteInscripcion = cursillo.FechaLimiteInscripcion;
            cur.Plazas = cursillo.Plazas;

            save();
        }

        public IList<tbCursillo> getByUser(Guid idUsuario)
        {
            return mtbMalagaDB.tbCursillo.Where(cursillo => cursillo.FKUsuarioCreador == idUsuario).ToList();
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


