using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;

namespace TortolasProject.Controllers
{
    public class EventosController : Controller
    {
        // GET: /Eventos/
        mtbMalagaDataContext bd = new mtbMalagaDataContext();
        static EventosRepositorio EventosRepo = new EventosRepositorio();

          //Index
        public ActionResult Index()
        {
            return View();
        }

          //CrearEvento
        [HttpPost]
        public ActionResult cargarVistaCrearEvento()
        {
            return PartialView("VistaCrearEvento");
        }

        [HttpPost]
        public ActionResult LeerTodos()
        {
            var eventos = from ob in EventosRepo.listarEventos()
                          select new
                          {
                              idEvento = ob.idEvento,
                              Titulo = ob.Titulo,
                              Lugar = ob.Lugar,
                              Actividad = ob.Actividad,
                             // FechaAperturaInscripcion = ob.FechaAperturaInscripcion.Value.ToShortDateString(),
                             // FechaLimiteInscripcion = ob.FechaLimiteInscripcion.Value.ToShortDateString(),
                              FechaRealizacion = ob.FechaRealizacion.ToShortDateString(),
                              PrioridadSocios = ob.PrioridadSocios,
                              Plazas = ob.Plazas
                          };
            return Json(eventos);
        }

        [HttpPost]
        public void UpdateEvento(FormCollection data)
        {
            Guid idEvento = Guid.Parse(data["idEvento"]);
            String Titulo = data["TituloUpdate"];
            String Lugar = data["LugarUpdate"];
            DateTime FechaRealizacion = DateTime.Parse(data["FechaRealizacionUpdate"]);
            DateTime FechaAperturaIncripcion = DateTime.Parse(data["FechaAperturaInscripUpdate"]);
            DateTime FechaLimiteIncripcion = DateTime.Parse(data["FechaLimiteInscripUpdate"]);
            int Plazas = int.Parse(data["PlazasUpdate"]);
            bool PrioridadSocios = bool.Parse(data["PrioridadSociosUpdate"]);
            String Actividad = data["ActividadUpdate"];

            tbEvento Evento = new tbEvento
            {
                Titulo = Titulo,
                Lugar = Lugar,
                FechaRealizacion = FechaRealizacion,
                FechaAperturaInscripcion = FechaAperturaIncripcion,
                FechaLimiteInscripcion = FechaLimiteIncripcion,
                Plazas = Plazas,
                PrioridadSocios = PrioridadSocios,
                Actividad = Actividad
            };

            EventosRepo.editarEvento(idEvento,Evento);
        }
        [HttpPost]
        public void CreateEvento(FormCollection data)
        {
            Guid idEvento = Guid.NewGuid();
            String Titulo = data["TituloUpdate"];
            String Lugar = data["LugarUpdate"];
            DateTime FechaRealizacion = DateTime.Parse(data["FechaRealizacionUpdate"]);
            DateTime FechaAperturaIncripcion = DateTime.Parse(data["FechaAperturaInscripUpdate"]);
            DateTime FechaLimiteIncripcion = DateTime.Parse(data["FechaLimiteInscripUpdate"]);
            int Plazas = int.Parse(data["PlazasUpdate"]);
            bool PrioridadSocios = bool.Parse(data["PrioridadSociosUpdate"]);
            String Actividad = data["ActividadUpdate"];
            Guid FKUsuario =  Guid.Parse(data["FKUsuario"]);

            tbEvento Evento = new tbEvento
            {
                Titulo = Titulo,
                Lugar = Lugar,
                FechaRealizacion = FechaRealizacion,
                FechaAperturaInscripcion = FechaAperturaIncripcion,
                FechaLimiteInscripcion = FechaLimiteIncripcion,
                Plazas = Plazas,
                PrioridadSocios = PrioridadSocios,
                Actividad = Actividad,
                FKUsuarioCreador = FKUsuario
            };

            EventosRepo.crearEvento(Evento);
        }

        public void eliminarEvento(FormCollection data)
        {
            Guid idEvento = Guid.Parse(data["idEvento"]);

            EventosRepo.eliminarEvento(idEvento);
        }
    }

}

