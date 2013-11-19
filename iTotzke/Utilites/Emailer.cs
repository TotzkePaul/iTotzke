using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace iTotzke.Utilites
{
    public class Emailer
    {
        public static bool Send(string mailto, string subject, string body)
        {
            string mailfrom = ConfigurationManager.AppSettings["mail.1"];
            string password = ConfigurationManager.AppSettings["maildaemon.Key"];
            MailMessage mail = new MailMessage(mailfrom, mailto);
            SmtpClient client = new SmtpClient
            {
                Port = 80,
                Timeout = 10000,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Host = "smtpout.secureserver.net",
                Credentials = new System.Net.NetworkCredential(mailfrom, password)
            };
            mail.Subject = subject;
            mail.Body = body;
            client.Send(mail);
            return true;
        }
    }
}