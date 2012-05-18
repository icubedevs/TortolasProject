$(document).ready(function () {

    //****************************************ANADIR PEDIDO VENTANA*******************************************
    $("#anadirPedidoVentana").kendoWindow({
        title: "Añadir pedido",
        height: "300px",
        width: "500px",
        modal: true,
        visible: false
    });

    $("#fechaPedido").kendoDatePicker({
        start: "day",
        depth: "year",
        format: "dd/MM/yyyy"
    });

    $("#anadirPedidoVentanaCancelar").live('click', function () {
        var w = $("#anadirPedidoVentana").data("kendoWindow");
        w.close();
    });

    $("#anadirPedidoVentanaAceptar").live('click', function () {

        var nom = $("#nombre").val();
        var desc = $("#descuento").val();
        var date = $("#fechaPedido").val();

        data = {
            Nombre: nom,
            Descuento: desc,
            Fecha: date
        };
        url = 'Pedidos/anadirPedido';
        $.post(url, data, function (data) {
            var w = $("#anadirPedidoVentana").data("kendoWindow");
            w.close();

            $("#pedidosGrid").data("kendoGrid").dataSource.read();
            var tabla = $("#pedidosGrid").data("kendoGrid");
            tabla.refresh();
        });
    });
    //***********************************************INDEX****************************************************
    $("#anadirPedidoButton").click(function () {
        $("#nombre").val("");
        $("#descuento").val("");
        var w = $("#anadirPedidoVentana").data("kendoWindow");
        w.center();
        w.open();
    });



    $("#pedidosGrid").kendoGrid({
        selectable: true,
        detailTemplate: kendo.template($("#templateDetailPedidos").html()),
        detailInit: inicializarTabla,
        columns: [
                  {
                      field: "nombre",
                      title: "Nombre"
                  },
                  {
                      field: "estado",
                      title: "Estado"
                  },
                   {
                       field: "descuento",
                       title: "Descuento"
                   },
                  {
                      field: "total",
                      title: "Total"
                  }],
        dataSource: {
            transport: {
                read: {
                    url: "Pedidos/leerTodos",
                    dataType: "json",
                    type: "POST"
                }
            },
            schema:
                {
                    model:
                       {
                           id: "idPedidoGlobal"
                       }
                }
        }
    });

});


       function inicializarTabla(e) {
           $(".tabsPedidos").kendoTabStrip();
           /*$(".lineasPedido").kendoGrid({
           selectable: true,
           detailTemplate: kendo.template($("#templateDetailPedidoUsuarios").html()),
           detailInit: inicializarTabla2,
           columns: [
           {
           field: "nombre",
           title: "Nombre"
           },
           {
           field: "estado",
           title: "Estado"
           },
           {
           field: "descuento",
           title: "Descuento"
           },
           {
           field: "total",
           title: "Total"
           }],
           dataSource: {
           transport: {
           read: {
           url: "Pedidos/leerTodos",
           dataType: "json",
           type: "POST"
           }
           },
           schema:
           {
           model:
           {
           id: "idPedidoGlobal"
           }
           }
           }
           })*/
       }