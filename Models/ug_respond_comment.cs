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
    
    public partial class ug_respond_comment
    {
        public int id { get; set; }
        public Nullable<int> id_cmt { get; set; }
        public Nullable<int> userId { get; set; }
        public Nullable<int> idPost { get; set; }
        public string content { get; set; }
        public Nullable<System.DateTime> createAt { get; set; }
    }
}
