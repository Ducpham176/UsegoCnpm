//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DoAnCSN.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ug_users
    {
        public int id { get; set; }
        public string fullName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public Nullable<int> coin { get; set; }
        public string token { get; set; }
        public string activeToken { get; set; }
        public string forgotToken { get; set; }
        public string firstLogin { get; set; }
        public Nullable<int> status { get; set; }
        public string avatar { get; set; }
        public string describes { get; set; }
        public Nullable<int> ug_type { get; set; }
        public Nullable<System.DateTime> createAt { get; set; }
    }
}
