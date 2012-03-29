using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using TortolasProject;
using TortolasProject.Controllers;

namespace TortolasProject.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Disponer
            HomeController controller = new HomeController();

            // Actuar
            ViewResult result = controller.Index() as ViewResult;

            // Declarar
            Assert.AreEqual("ASP.NET MVC", result.ViewBag.Message);
        }

        [TestMethod]
        public void About()
        {
            // Disponer
            HomeController controller = new HomeController();

            // Actuar
            ViewResult result = controller.About() as ViewResult;

            // Declarar
            Assert.IsNotNull(result);
        }
    }
}
