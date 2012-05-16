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

        public tbUsuario obtenerUsuarioNoAsp(Guid abuscar)
        {
            return mtbMalagaDB.tbUsuario.Where(usuario => usuario.FKUser == abuscar).Single();
        }

        public void actualizarUsuario(tbUsuario aModificar)
        {
            tbUsuario usuario = obtenerUsuarioNoAsp(aModificar.idUsuario);

            usuario.Aficiones = aModificar.Aficiones;
            usuario.Apellidos = aModificar.Apellidos;
            usuario.Avatar = aModificar.Avatar;
            usuario.Direccion = aModificar.Direccion;
            usuario.DNI = aModificar.DNI;            
            usuario.Experiencias = aModificar.Experiencias;
            usuario.Facebook = aModificar.Facebook;
            usuario.FechaNacimiento = aModificar.FechaNacimiento;
            usuario.GooglePlus = aModificar.GooglePlus;
            usuario.Localidad = aModificar.Localidad;
            usuario.Nacionalidad = aModificar.Nacionalidad;
            usuario.Nombre = aModificar.Nombre;
            usuario.Sexo = aModificar.Sexo;
            usuario.SitioWeb = aModificar.SitioWeb;
            usuario.Skype = aModificar.Skype;

            mtbMalagaDB.SubmitChanges();
        }

        public tbSocio obtenerSocio(Guid usuario)
        {
            return  mtbMalagaDB.tbSocio.Where(socio => socio.FKUsuario.Equals(usuario)).SingleOrDefault();
           /* return new tbSocio
            {
                idSocio = societe.idSocio,
                Estado = societe.Estado,
                Foto = societe.Foto,
                NumeroSocio = societe.NumeroSocio,
                FKUsuario = societe.FKUsuario,

            };*/
        }

        public IList<tbTipoCuota> obtenerCuotas()
        {
            return mtbMalagaDB.tbTipoCuota.ToList();
        }


        public int existeNickname(String Nickname)
        {
            return mtbMalagaDB.tbUsuario.Count(usuario => usuario.Nickname.Equals(Nickname));
        }

        public int existeEmail(String Email)
        {
            return mtbMalagaDB.tbUsuario.Count(usuario => usuario.Email.Equals(Email));
        }
    }
}
