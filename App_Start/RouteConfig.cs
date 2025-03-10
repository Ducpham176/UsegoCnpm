﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace DoAnCSN
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               name: "ProfileWithId",
               url: "profile/profile/{id}",
               defaults: new { controller = "Profile", action = "Profile", id = UrlParameter.Optional },
               constraints: new { id = @"\d*" }
           );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}",
                defaults: new { controller = "Admin", action = "Admin", id = UrlParameter.Optional }
            );

        }
    }
}
