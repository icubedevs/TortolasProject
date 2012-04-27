using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using TortolasProject.Controllers.Monitores;
using TortolasProject.Models.Repositorios;
using TortolasProject.Models;


namespace TortolasProject.Controllers.Monitores
{
    public class MonitoresController : Controller
    {
        //
        // GET: /Monitores/

        //static MonitoresRepositorio MonitoresRepo = new MonitoresRepositorio();
        static MonitoresRepositorio MonitoresRepo = new MonitoresRepositorio();
        mtbMalagaDataContext mtbDB = new mtbMalagaDataContext();
        

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult obtenerTodos()
        {
            
            var monitores = from m in MonitoresRepo.listarTodos()
                            select new
                            {
                                idMonitor = m.idMonitor,
                                nombre = m.Nombre,
                                apellidos = m.Apellidos,
                                dni = m.DNI,
                                email = m.Email,
                                direccion = m.Direccion,
                                telefono = m.Telefono,
                                foto = m.Foto
                            };

            return Json(monitores);
        
        }

        [HttpPost]
        public void editar(FormCollection data)
        {
            // Recibimos los datos
            Guid idMonitor = Guid.Parse(data["idMonitor"]);
            String Nombre = data["nombre"];
            String Apellidos = data["apellidos"];
            String Dni = data["dni"];
            String Direccion = data["direccion"];
            String Email = data["email"];
            int Telefono = int.Parse(data["telefono"]);
            String Foto = data["foto"];
            

            tbMonitor nuevoMonitor = new tbMonitor
            {
                idMonitor = idMonitor,
                Nombre = Nombre,
                Apellidos = Apellidos,
                DNI = Dni,
                Direccion = Direccion,
                Email = Email,
                Telefono = Telefono,
                Foto =  Foto
            };
            
            MonitoresRepo.editarMonitor(nuevoMonitor);
        }

        [HttpPost]
        public void crear(FormCollection data)
        {
            // Recibimos datos
            String Nombre = data["nombre"];
            String Apellidos = data["apellidos"];
            String Dni = data["dni"];
            String Direccion = data["direccion"];
            String Email = data["email"];
            int Telefono = int.Parse(data["telefono"]);
            String Foto = data["foto"];

            tbMonitor nuevo = new tbMonitor
            {
                idMonitor = Guid.NewGuid(),
                Nombre = Nombre,
                Apellidos = Apellidos,
                DNI = Dni,
                Direccion = Direccion,
                Email = Email,
                Telefono = Telefono,
                Foto = Foto
            };

            MonitoresRepo.crearMonitor(nuevo);
        }

        [HttpPost]
        public void eliminar(FormCollection data)
        {
            Guid idMonitor = Guid.Parse(data["idMonitor"]);
            MonitoresRepo.eliminarMonitor(idMonitor);
        }

        [HttpPost]
        //public ActionResult subir(IEnumerable<HttpPostedFileBase> attachments)
        public String subir(IEnumerable<HttpPostedFileBase> attachments)
        {
            String fileName = " ";
            // The Name of the Upload component is "attachments" 
            foreach (var file in attachments)
            {
                // Some browsers send file names with full path. This needs to be stripped.
                fileName = Path.GetFileName(file.FileName);
                var physicalPath = Path.Combine(Server.MapPath("~/Content/images/Monitores"), fileName);

                file.SaveAs(physicalPath);
            }
            // Return an empty string to signify success
            //return Content("");
            return fileName;
        }
    

    }
    
}
