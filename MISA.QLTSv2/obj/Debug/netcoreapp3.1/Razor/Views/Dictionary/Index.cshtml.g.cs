#pragma checksum "C:\Users\duybe\source\repos\MISA.QLTS_v2\MISA.QLTSv2\Views\Dictionary\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "9e246e90dba0f457b63028f855f6e172438e0d7a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Dictionary_Index), @"mvc.1.0.view", @"/Views/Dictionary/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\duybe\source\repos\MISA.QLTS_v2\MISA.QLTSv2\Views\_ViewImports.cshtml"
using MISA.QLTSv2;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\duybe\source\repos\MISA.QLTS_v2\MISA.QLTSv2\Views\_ViewImports.cshtml"
using MISA.QLTSv2.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9e246e90dba0f457b63028f855f6e172438e0d7a", @"/Views/Dictionary/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0347025f6a5c6216a3d0e8761a58b0674f82c8e2", @"/Views/_ViewImports.cshtml")]
    public class Views_Dictionary_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
#nullable restore
#line 2 "C:\Users\duybe\source\repos\MISA.QLTS_v2\MISA.QLTSv2\Views\Dictionary\Index.cshtml"
  
    ViewData["Title"] = "Index";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""container"">
    <div class=""row"">
        <div class=""col-md-6""></div>
        <div class=""col-md-6"">
            <div class=""m-btn"">
                <button type=""button"" class=""btn btn-success"">Thêm mới</button>
                <button type=""button"" class=""btn btn-secondary"">Làm mới</button>
                <button type=""button"" class=""btn btn-danger"">Xóa</button>
            </div>
            <div class=""clear-both""></div>
        </div>
    </div>
    <div class=""row"">
        <div class=""col-md-12"">
            <table class=""table table-hover"" id=""test"">
                <thead>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
<ul class='custom-menu'>
    <li data-action=""first"">First thing</li>
    <li data-action=""second"">Second thing</li>
    <li data-action=""third"">Third thing</li>
</ul>


");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
