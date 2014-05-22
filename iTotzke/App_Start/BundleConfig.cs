using System.Web.Optimization;

namespace iTotzke.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = true;

            bundles.Add(new Bundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js",
                        "~/Scripts/jquery-ui-{version}.js",
                        //"~/Scripts/jquery-1.10.2.js",
                        //"~/Scripts/jquery-ui-1.10.4.js",
                        "~/Scripts/DataTables-1.9.4/media/js/jquery.dataTables.js",
                        //"~/Scripts/Dash-0.2.0/Dash.js",
                        "~/Scripts/Dash-0.3.1.js",
                        "~/Scripts/bootstrap-3.1.1.js",
                        "~/Scripts/Core.js"));
            /**
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/dataTables").Include(
                        "~/Scripts/DataTables-1.9.4/media/js/jquery.dataTables.min.js"));*/

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new Bundle("~/bundles/tools").Include(
                        "~/Scripts/jquery.markitup.js",
                        "~/Scripts/tools.js"
                        ));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/tools").Include("~/Content/tools.css"));

            bundles.Add(new StyleBundle("~/Content/chat").Include("~/Content/chat.css"));

            bundles.Add(new StyleBundle("~/Content/markitup").Include("~/Content/style.markitup.css",
                "~/Content/default.markitup.css"
                ));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui-1.10.4.css",
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css",
                        "~/Content/font-awesome/css/font-awesome.css",
                        "~/Content/DataTables-1.9.4/media/css/jquery.dataTables.css",
                        "~/Content/DataTables-1.9.4/media/css/jquery.dataTables_themeroller.css",
                        "~/Content/iTotzke.css"
                        
                        ));
        }
    }
}