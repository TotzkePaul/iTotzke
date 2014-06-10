using System.Web.Optimization;

namespace iTotzke.App_Start
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.Add(new Bundle("~/bundles/jquery").Include(
                        "~/Scripts/jQuery/jquery-{version}.js",
                        //"~/Scripts/jQuery/jquery-ui-{version}.js",
                        //"~/Scripts/jquery-1.10.2.js",
                        //"~/Scripts/jquery-ui-1.10.4.js",
                        "~/Scripts/jQuery/DataTables/js/jquery.dataTables{version}.js",
                        "~/Scripts/lib/backbone{version}.js",
                        //"~/Scripts/jQuery/Dash-{version}.js",
                        "~/Scripts/bootstrap/js/bootstrap.js",
                        "~/Scripts/jQuery/it.js",
                        //add bootstrap editable
                        "~/Scripts/it/Core.js"));
            /**
            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/dataTables").Include(
                        "~/Scripts/DataTables-1.9.4/media/js/jquery.dataTables.min.js"));*/

            bundles.Add(new ScriptBundle("~/bundles/unobtrusive").Include("~/Scripts/jQuery/validate/jquery.*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include("~/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/Scripts/admin").Include("~/Scripts/it/admin.js"));

            bundles.Add(new Bundle("~/bundles/tools").Include(
                        "~/Scripts/jQuery/jquery.markitup.js",
                        "~/Scripts/CodeMirror/Countable.js",
                        "~/Scripts/CodeMirror/codemirror.js",
                        "~/Scripts/tools.js" ));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/it/site.css"));


            bundles.Add(new StyleBundle("~/Content/tools").Include(
                "~/Content/it/tools.css",
                "~/Scripts/CodeMirror/codemirror.css"
                ));

            bundles.Add(new StyleBundle("~/Content/chat").Include("~/Content/it/chat.css"));

            bundles.Add(new StyleBundle("~/Content/markitup").Include("~/Content/style.markitup.css",
                "~/Content/default.markitup.css"
                ));

            bundles.Add(new StyleBundle("~/Scripts/bootstrap/css/bootstrap").Include(
                        "~/Scripts/bootstrap/css/bootstrap-theme.css",
                        "~/Scripts/bootstrap/css/bootstrap.css"));

            bundles.Add(new StyleBundle("~/Content/font-awesome/fa/css").Include("~/Content/font-awesome/css/font-awesome.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Scripts/jQuery/DataTables/css/jquery.dataTables.css",
                        "~/Scripts/jQuery/DataTables/css/jquery.dataTables_themeroller.css",
                        "~/Content/it/iTotzke.css"
                        ));
        }
    }
}