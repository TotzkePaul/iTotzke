using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using iTotzke.Composites;
using itotzke.Database;

namespace iTotzke.Utilites
{
    public class Logger
    {
        private readonly DynamicDb db;
        public Logger(DynamicDb db =null)
        {
                this.db = db ?? new DynamicDb();
        }

        public bool Add(Exception ex, string message, string location, string username = null)
        {
            Debugger.Break();
            var log = new Log( ex.GetType().FullName ?? "default", ex.Message,  location,  ex.StackTrace + " end");
            /**
                @logId INT,       
	            @type VARCHAR(64),       
	            @message VARCHAR(64),  
	            @location VARCHAR(256),
	            @fullMessage VARCHAR(1024),
	            @userId INT,
	            @isVisible BIT
             */
            try
            {
                return db.RunListProcedure<Log>("InsertLog", new {    type = log.Type, message = log.Message,
                                                            location = log.Location, fullMessage = log.FullMessage, isVisible = true, }).Count >0;
            }
            catch (Exception)
            {
                return false;
            }
            
        }

        public bool Add(string error, string stackTrace, string message, string location, string username = null)
        {
            var log = new Log(error ?? "default", message, location, stackTrace + " end");
            /**
                @logId INT,       
	            @type VARCHAR(64),       
	            @message VARCHAR(64),  
	            @location VARCHAR(256),
	            @fullMessage VARCHAR(1024),
	            @userId INT,
	            @isVisible BIT
             */
            try
            {
                return db.ExcuteQuery("InsertLog", new
                {
                    type = log.Type,
                    message = log.Message,
                    location = log.Location,
                    fullMessage = log.FullMessage,
                    isVisible = true,
                });
            }
            catch (Exception)
            {
                return false;
            }

        }

        public static List<Log> Recent()
        {
            return new List<Log>();
        }

    }
}