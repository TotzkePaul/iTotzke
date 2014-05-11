using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Serialization;
using Microsoft.Ajax.Utilities;

namespace iTotzke.Database
{
    public class FileDb
    {
        public static string ReadText(string path)
        {
            return File.ReadAllText(path);
        }

        public static bool WriteText(string path, string data)
        {
            try
            {
                File.WriteAllText(path, data);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            
        }

        public static T ReadObj<T>(string path)
        {
            T obj = default(T);
            XmlSerializer serializer = new XmlSerializer(typeof(T));
            StreamReader reader = new StreamReader(HttpRuntime.AppDomainAppPath + "Database/" +path);
            obj = (T)serializer.Deserialize(reader);
            reader.Close();
            return obj;
        }

        public static bool WriteObj<T>(string path, Object obj)
        {
            try
            {
                TextWriter writer = File.CreateText(HttpRuntime.AppDomainAppPath  + "Database/"+path);

                System.Xml.Serialization.XmlSerializer x = new System.Xml.Serialization.XmlSerializer(obj.GetType());
                x.Serialize(writer, obj);
                writer.Close();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
                return false;
            }
            
        }
    }
}