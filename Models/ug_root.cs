using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DoAnCSN.Models
{
    public class ug_root
    {
        public ug_power_point PowerPoint { get; set; }
        public ug_users User { get; set; }
        public ug_follow Follow { get; set; }
        public ug_archive Archive { get; set; }
    }
}