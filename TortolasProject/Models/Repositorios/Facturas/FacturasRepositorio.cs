using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TortolasProject.Models.Repositorios
{
    public class FacturasRepositorio
    {
        // Conecto a la BD
        mtbMalagaDataContext mtbMalagaDB = new mtbMalagaDataContext();

        ///////////////////////////////////////////////////////////////////////////////
        // Métodos de la clase de tbFactura
        ///////////////////////////////////////////////////////////////////////////////
        public IList<tbFactura> listarFacturas()
        {
            return mtbMalagaDB.tbFactura.ToList();

        }

        public tbFactura leerFactura(Guid id)
        {
            return mtbMalagaDB.tbFactura.Where(factura => factura.idFactura == id).Single();
            
        }

        public void nuevaFactura(tbFactura f)
        {
            mtbMalagaDB.tbFactura.InsertOnSubmit(f);
            save();
        }
        public void eliminarFactura(Guid id)
        {
            tbFactura f = leerFactura(id);
            
            foreach ( tbLineaFactura lineaFactura in mtbMalagaDB.tbLineaFactura.Where(lf => lf.FKFactura == f.idFactura) )
            {
                eliminarLinea(lineaFactura.idLineaFactura);
            }

            mtbMalagaDB.tbFactura.DeleteOnSubmit(f);
            save();

        }

        public void setEstado(tbEstadoFactura estado, Guid id)
        {
            tbFactura f = leerFactura(id);
            f.FKEstado = estado.idEstadoFactura;
            save();

        }

        public String getEstado(Guid id)
        {
            tbFactura f = leerFactura(id);

            return mtbMalagaDB.tbEstadoFactura.Where(estado => estado.idEstadoFactura == f.FKEstado).Single().Nombre;
        }

        public void modificarFactura(Guid id, tbFactura factura)
        {
            tbFactura f = leerFactura(id);

            f.Concepto = factura.Concepto;
            f.Fecha = factura.Fecha; // Pendiente de saber si se puede modificar la fecha de una factura.
            f.FKCodigoEmpresa = factura.FKCodigoEmpresa;
            f.FKContrato = factura.FKContrato;
            f.FKCursillo = factura.FKCursillo;
            f.FKEstado = factura.FKEstado;
            f.FKEventoOficial = factura.FKEventoOficial;
            f.FKJuntaDirectiva = factura.FKJuntaDirectiva;
            f.FKProveedores = factura.FKProveedores;
            f.FKUsuario = factura.FKUsuario;
            f.Total = factura.Total;

            save();
        }

        public IList<tbFactura> getByCourse(Guid idCursillo)
        {
            return mtbMalagaDB.tbFactura.Where(facturas => facturas.FKCursillo == idCursillo).ToList();
        }

        ///////////////////////////////////////////////////////////////////////////////
        //  Métodos de tbLineaFactura
        ///////////////////////////////////////////////////////////////////////////////

        public void nuevaLinea(tbLineaFactura linea)
        {
            mtbMalagaDB.tbLineaFactura.InsertOnSubmit(linea);
            save();
        }

        public void modificarLinea(Guid id, tbLineaFactura linea)
        {
            tbLineaFactura lineaFactura = leerLinea(id);
            lineaFactura.Descripcion = linea.Descripcion;
            lineaFactura.PrecioUnitario = linea.PrecioUnitario;
            lineaFactura.Total = linea.Total;
            lineaFactura.Unidades = linea.Unidades;
            
            save();
        }

        public tbLineaFactura leerLinea(Guid id)
        {
            return mtbMalagaDB.tbLineaFactura.Where(linea => linea.idLineaFactura == id).Single();
        }

        public void eliminarLinea(Guid id)
        {
            tbLineaFactura linea = leerLinea(id);
            mtbMalagaDB.tbLineaFactura.DeleteOnSubmit(linea);
            save();
        }

        public IList<tbLineaFactura> listarLineasFactura(Guid idFactura)
        {
            return mtbMalagaDB.tbLineaFactura.Where(lineaFactura => lineaFactura.FKFactura == idFactura).ToList();
        }

        public Boolean existeLinea(tbLineaFactura linea)
        {
            return mtbMalagaDB.tbLineaFactura.Contains(linea);
        }
        ///////////////////////////////////////////////////////////////////////////////
        // Métodos de tbMovimientosIngreso
        ///////////////////////////////////////////////////////////////////////////////
        public void nuevoMovimientoIngreso(tbMovimientoIngreso mov)
        {
            mtbMalagaDB.tbMovimientoIngreso.InsertOnSubmit(mov);
            save();
        }

        public IList<tbMovimientoIngreso> listarMovimientosIngreso()
        {
            return mtbMalagaDB.tbMovimientoIngreso.ToList();
        }

        public tbMovimientoIngreso leerMovimientoIngreso(Guid id)
        {
            return mtbMalagaDB.tbMovimientoIngreso.Where(mov => mov.idMovimientoIngreso == id).Single();
        }

        public void eliminarMovimientoIngreso(Guid id)
        {
            tbMovimientoIngreso mov = leerMovimientoIngreso(id);
            mtbMalagaDB.tbMovimientoIngreso.DeleteOnSubmit(mov);
            save();
        }

        public void modificarMovimientoIngreso(Guid id, tbMovimientoIngreso mov)
        {
            tbMovimientoIngreso old = leerMovimientoIngreso(id);
            old.Concepto = mov.Concepto;
            old.Descripcion = mov.Descripcion;
            old.Fecha = mov.Fecha;
            old.FKFactura = mov.FKFactura;
            old.Responsable = mov.Responsable;
            old.Total = mov.Total;
            save();
        }

        ///////////////////////////////////////////////////////////////////////////////
        // Métodos de tbMovimientosGasto
        ///////////////////////////////////////////////////////////////////////////////
        public void nuevoMovimientoGasto(tbMovimientoGasto mov)
        {
            mtbMalagaDB.tbMovimientoGasto.InsertOnSubmit(mov);
            save();
        }

        public IList<tbMovimientoGasto> listarMovimientosGasto()
        {
            return mtbMalagaDB.tbMovimientoGasto.ToList();
        }

        public tbMovimientoGasto leerMovimientoGasto(Guid id)
        {
            return mtbMalagaDB.tbMovimientoGasto.Where(mov => mov.idMovimientoGasto == id).Single();
        }

        public void eliminarMovimientoGasto(Guid id)
        {
            tbMovimientoGasto mov = leerMovimientoGasto(id);
            mtbMalagaDB.tbMovimientoGasto.DeleteOnSubmit(mov);
            save();
        }

        public void modificarMovimientoGasto(Guid id, tbMovimientoGasto mov)
        {
            tbMovimientoGasto old = leerMovimientoGasto(id);
            old.Concepto = mov.Concepto;
            old.Descripcion = mov.Descripcion;
            old.Fecha = mov.Fecha;
            old.FKFactura = mov.FKFactura;
            old.Responsable = mov.Responsable;
            old.Total = mov.Total;
            save();
        }


        // 
        //  Funciones auxiliares
        //
        private void save()
        {
            mtbMalagaDB.SubmitChanges();
        }



    }
}