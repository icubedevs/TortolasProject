/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



       $(document).ready(function(){
          
          $("#chart1").kendoChart({
                title: {
                    text: "Aumento de usuarios por año"
                },
                series: [
                    { name: "Altas nuevas por año", data: [20, 40, 60, 125] }
                ],
                categoryAxis:{
                    categories: [ 2008, 2009, 2010, 2011 ]
                }
            });
          
          $("#chart2").kendoChart({
                        theme: $(document).data("kendoSkin") || "default",
                        title: {
                            text: "Eventos en MTB durante 2011"
                        },
                        legend: {
                            position: "bottom"
                        },
                        seriesDefaults: {
                            labels: {
                                visible: true,
                                format: "{0}%"
                            }
                        },
                        series: [{
                            type: "pie",
                            data: [ {
                                category: "Eventos Oficiales",
                                value: 32.5
                            }, {
                                category: "Eventos No Oficiales",
                                value: 42
                            }, {
                                category: "Cursillos",
                                value: 25
                            }, 
                        ]
                        }],
                        tooltip: {
                            visible: true,
                            format: "{0}%"
                        }
          });
 
       });
       