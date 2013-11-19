using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using itotzke.Database;

namespace itotzke.Utilites
{
    public class Carly
    {
        public static string response(string input)
        {
            Random rnd = new Random();
            string[] strArr = new string[] {"It is certain",
                                            "It is decidedly so",
                                            "Without a doubt",
                                            "Yes definitely",
                                            "You may rely on it",
                                            "As I see it yes",
                                            "Most likely",
                                            "Outlook good",
                                            "Yes",
                                            "Signs point to yes",
                                            "Reply hazy try again",
                                            "Ask again later",
                                            "Better not tell you now",
                                            "Cannot predict now",
                                            "Concentrate and ask again",
                                            "Don't count on it",
                                            "My reply is no" };
            try
            {
                return strArr[rnd.Next(0, strArr.Length)];
            }
            catch (Exception ex)
            {
                return ex.Message + " :: " + ex.ToString();

            }
            
        }
    }
}