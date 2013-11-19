using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace iTotzke.Utilites
{
    public class Security
    {
        static readonly Random Random = new Random();
        private const string AlphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

        public static string GenerateResetKey(string pwdHash, int newLength)
        {
            for (int i = pwdHash.Length; i < newLength; i++)
            {
                pwdHash = RandomChar() + pwdHash;
            }

            return pwdHash;
        }

        public static char RandomChar()
        {
            
            int num = Random.Next(0, AlphaNumeric.Length); // Zero to 25
            return AlphaNumeric.ToCharArray()[num];
        }

        public static string Sha256Encrypt(string password)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(bytes);
            string hashString = string.Empty;
            foreach (byte x in hash)
            {
                hashString += String.Format("{0:x2}", x);
            }
            return hashString;
        }
    }
}