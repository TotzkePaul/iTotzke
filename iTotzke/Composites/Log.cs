using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iTotzke.Composites
{
    public class Log
    {
        public int? LogId { get; set; }
        public string Type { get; set; }
        public string Message { get; set; }
        public string Location { get; set; }
        public string FullMessage { get; set; }
        public int? UserId { get; set; }
        public DateTime? LogTime { get; set; }
        public bool IsVisible { get; set; }

        public Log()
        {
            
        }
        public Log(string type, string message, string location, string fullMessage, int? logId = null, int? userId =null, DateTime? logTime = null, bool isVisible = true)
        {
            this.LogId = logId;
            this.Type = type;
            this.Message = message;
            this.Location = location;
            this.FullMessage = fullMessage;
            this.UserId = userId;
            this.LogTime = logTime;
            this.IsVisible = isVisible;
        }
    }
}