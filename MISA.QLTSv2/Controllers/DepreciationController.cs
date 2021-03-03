using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.QLTSv2.Controllers
{
    public class DepreciationController : Controller
    {
        public IActionResult Index()
        {
            return View("Depreciation");
        }
    }
}
