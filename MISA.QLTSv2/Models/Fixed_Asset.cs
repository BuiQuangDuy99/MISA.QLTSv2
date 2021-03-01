using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.QLTSv2.Models
{
    /// <summary>
    /// Tài sản
    /// createBy:NVTUYEN(01/03/2021)
    /// </summary>
    public class Fixed_Asset
    {
        #region Declare
        #endregion
        #region Constructor
        public Fixed_Asset()
        {

        }
        #endregion
        #region properties
        public Guid fixed_asset_id { get; set; }
        public string fixed_asset_code { get; set; }
        public int fixed_asset_name { get; set; }
        public Guid organization_id { get; set; }
        public string organization_code { get; set; }
        public string organization_name { get; set; }
        public Guid department_id { get; set; }
        public string department_code { get; set; }
        public string department_name { get; set; }
        public Guid fixed_asset_category_id { get; set; }
        public string fixed_asset_category_code { get; set; }
        public string fixed_asset_category_name { get; set; }
        public DateTime increment_date { get; set; }
        #endregion
    }
}
