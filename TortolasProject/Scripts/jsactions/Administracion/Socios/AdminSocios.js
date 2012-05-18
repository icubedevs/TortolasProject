$(document).ready(function () {



    // Cargamos la tabla de Usuarios
    $("#tablaAdminSocios").kendoGrid({
        dataSource: {
            transport: {
                type: "json",
                read: {
                    url: "Socios/obtenerSociosyUsuario",
                    type: "POST",
                    dataType: "json"
                },
                pageSize: 15
            }
        },
        pageable: true,
        sortable: true,
        selectable: true,
        scrollable: false,
        filterable: true,
        toolbar: kendo.template($("#templateToolbarAdminSocio").html()),
        detailTemplate: kendo.template($("#templateDetailAdminSocio").html()),
        detailInit: inicializarTablaAdminSocio,
        columns: [
                            {
                                field: "NumeroSocio",
                                title: "Socio",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }

                            },
                            {
                                field: "Nombre",
                                title: "Nombre",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Apellidos",
                                title: "Apellidos",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "FechaAlta",
                                title: "Alta",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "FechaExpiracion",
                                title: "Expiracion",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Estado",
                                title: "Estado",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                title: "Herramientas",
                                command:
                                [
                                    { text: "editar", className: "editarfila" },
                                    { text: "eliminar", className: "eliminarUsuario" }
                                ]
                            }

                    ]
    });



    function inicializarTablaAdminSocio(e) {

        $(".tabsSocios").kendoTabStrip();


        $(".Pagados").kendoGrid({
            dataSource: {
                transport: {
                    type: "json",
                    read: {
                        url: "Socios/obtenerPagosSocios",
                        data: { idSocio: e.data.idSocio },
                        type: "POST",
                        dataType: "json"
                    },
                    pageSize: 15
                }
            },
            pageable: true,
            sortable: true,
            selectable: true,
            scrollable: false,
            filterable: true,
            //toolbar: kendo.template($("#templateToolbarCuotas").html()),
            //detailTemplate: kendo.template($("#templateDetailAdminSocio").html()),
            //detailInit: inicializarTablaAdminSocio */
            columns: [
                            {
                                field: "TipoCuota",
                                title: "Cuota",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Fecha",
                                title: "Fecha",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Concepto",
                                title: "Concepto",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "BaseImponible",
                                title: "B.Imponible",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Total",
                                title: "Total",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Estado",
                                title: "Estado",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            }
                     ]
        });

        $(".Pendientes").kendoGrid({
            dataSource: {
                transport: {
                    type: "json",
                    read: {
                        url: "Socios/obtenerPagosSocios",
                        data: { idSocio: e.data.idSocio },
                        type: "POST",
                        dataType: "json"
                    },
                    pageSize: 15
                }
            },
            pageable: true,
            sortable: true,
            selectable: true,
            scrollable: false,
            filterable: true,
            toolbar: kendo.template($("#templateToolbarCuotasPendientes").html()),
            //detailTemplate: kendo.template($("#templateDetailAdminSocio").html()),
            //detailInit: inicializarTablaAdminSocio */
            columns: [
                            {
                                field: "TipoCuota",
                                title: "Cuota",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Fecha",
                                title: "Fecha",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Concepto",
                                title: "Concepto",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "BaseImponible",
                                title: "B.Imponible",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Total",
                                title: "Total",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            },
                            {
                                field: "Estado",
                                title: "Estado",
                                filterable: {
                                    extra: false, //do not show extra filters
                                    operators: { // redefine the string operators
                                        string: {
                                            eq: "Es igual a..",
                                            neq: "No es igual a...",
                                            startswith: "Empieza por...",
                                            contains: "Contiene"
                                        }
                                    }
                                }
                            }
                     ]
        });

        $(".Pagados").data("kendoGrid").dataSource.filter({ field: "Estado", operator: "eq", value: "Pagado" });
        $(".Pendientes").data("kendoGrid").dataSource.filter({ field: "Estado", operator: "eq", value: "Pendiente" });

        // El boton de Cambio de estado de cuota de Pendiente a Pagado

        $(".botonCambiarEstadoCuota").click(function () {

            var tabla = $(this).parent().parent().data("kendoGrid");

            // var seleccionado = $('[socio="' + socio + '"]').data("kendoGrid").select();
            var seleccionado = tabla.select();
            var filaJson = tabla.dataItem(seleccionado).toJSON();      // La pasamos a JSON                
            
            var dataSource = tabla.dataSource;

            var idCuota = dataSource.getByUid(seleccionado.attr("data-uid")).idCuota;

            alert(idCuota);
        });
    }



});