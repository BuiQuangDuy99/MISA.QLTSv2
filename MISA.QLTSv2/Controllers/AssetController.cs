using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.QLTSv2.Controllers
{
    public class AssetController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult AssetIncreased()
        {
            return View();
        }

        public IActionResult RefDecrement()
        {
            return View();
        }

    }
}
