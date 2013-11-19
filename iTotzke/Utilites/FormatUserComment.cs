﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI.WebControls;

namespace iTotzke.Utilites
{
    public class FormatUserComment
    {
        protected TextBox MarkdownSource;
        protected DropDownList OutputOptions;
        protected Button Convert;
        protected TextBox HtmlSource;
        protected PlaceHolder PlhHtmlsource;
        protected Label Preview;
        protected DropDownList FilterOptions;
        protected PlaceHolder PlhHtmlPreview;

        public FormatUserComment()
        {
            this.PlhHtmlsource = new PlaceHolder();
            this.PlhHtmlPreview = new PlaceHolder();
        }

        public string FormatMarkdownComment(string markdownSource)
        {
            Markdown md = new Markdown();
            SmartyPants sm = new SmartyPants();
            string htmlSource = null;
            markdownSource = Sanitize(markdownSource); //.Replace("<", "&lt;").Replace(">", "&gt;");

            switch (/**FilterOptions.SelectedIndex*/0)
            {
                case 0: htmlSource = md.Transform(markdownSource); break;
                case 1: htmlSource = sm.Transform(markdownSource, ConversionMode.EducateDefault); break;
                default: htmlSource = sm.Transform(md.Transform(markdownSource), ConversionMode.EducateDefault); break;
            }

            //HtmlSource.Text = htmlSource;
            //Preview.Text = htmlSource;

            switch (/**OutputOptions.SelectedIndex*/2)
            {
                case 0: PlhHtmlsource.Visible = true; PlhHtmlPreview.Visible = false; break;
                case 1: PlhHtmlsource.Visible = false; PlhHtmlPreview.Visible = true; break;
                default: PlhHtmlsource.Visible = true; PlhHtmlPreview.Visible = true; break;
            }
            //htmlSource = htmlSource.Replace("<", "&lt;").Replace(">", "&gt;").Replace("&lt;code&gt;", "<code>").Replace("&lt;/code&gt;", "</code>");
            return (htmlSource);
        }

        /**Start */
        private static Regex _tags = new Regex("<[^>]*(>|$)",
    RegexOptions.Singleline | RegexOptions.ExplicitCapture | RegexOptions.Compiled);
        private static Regex _whitelist = new Regex(@"
    ^</?(b(lockquote)?|code|d(d|t|l|el)|em|h(1|2|3)|i|kbd|li|ol|p(re)?|s(ub|up|trong|trike)?|ul)>$|
    ^<(b|h)r\s?/?>$",
            RegexOptions.Singleline | RegexOptions.ExplicitCapture | RegexOptions.Compiled | RegexOptions.IgnorePatternWhitespace);
        private static Regex _whitelist_a = new Regex(@"
    ^<a\s
    href=""(\#\d+|(https?|ftp)://[-a-z0-9+&@#/%?=~_|!:,.;\(\)]+)""
    (\stitle=""[^""<>]+"")?\s?>$|
    ^</a>$",
            RegexOptions.Singleline | RegexOptions.ExplicitCapture | RegexOptions.Compiled | RegexOptions.IgnorePatternWhitespace);
        private static Regex _whitelist_img = new Regex(@"
    ^<img\s
    src=""https?://[-a-z0-9+&@#/%?=~_|!:,.;\(\)]+""
    (\swidth=""\d{1,3}"")?
    (\sheight=""\d{1,3}"")?
    (\salt=""[^""<>]*"")?
    (\stitle=""[^""<>]*"")?
    \s?/?>$",
            RegexOptions.Singleline | RegexOptions.ExplicitCapture | RegexOptions.Compiled | RegexOptions.IgnorePatternWhitespace);


        /// <summary>
        /// sanitize any potentially dangerous tags from the provided raw HTML input using 
        /// a whitelist based approach, leaving the "safe" HTML tags
        /// CODESNIPPET:4100A61A-1711-4366-B0B0-144D1179A937
        /// </summary>
        public static string Sanitize(string html)
        {
            if (String.IsNullOrEmpty(html)) return html;

            string tagname;
            Match tag;

            // match every HTML tag in the input
            MatchCollection tags = _tags.Matches(html);
            for (int i = tags.Count - 1; i > -1; i--)
            {
                tag = tags[i];
                tagname = tag.Value.ToLowerInvariant();

                if (!(_whitelist.IsMatch(tagname) || _whitelist_a.IsMatch(tagname) || _whitelist_img.IsMatch(tagname)))
                {
                    html = html.Remove(tag.Index, tag.Length);
                    System.Diagnostics.Debug.WriteLine("tag sanitized: " + tagname);
                }
            }

            return html;
        }
        /**END */
    }
}