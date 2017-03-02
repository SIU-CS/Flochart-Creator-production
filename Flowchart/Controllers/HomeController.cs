using Microsoft.AspNetCore.Mvc;

namespace FlowchartCreator.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "FAQ/Description of Application";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Contact Us!";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
