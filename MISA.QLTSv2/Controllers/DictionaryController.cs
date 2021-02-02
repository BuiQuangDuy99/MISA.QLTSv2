using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.QLTSv2.Controllers
{
    public class DictionaryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// View danh sách phòng ban
        /// </summary>
        /// <returns></returns>
        /// CreatedBy NDTUNG (1/2/2021)
        public IActionResult Department()
        {
            return View("_DepartmentPartial");
        }
    }
}
