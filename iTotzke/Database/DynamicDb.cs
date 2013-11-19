using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.IO;
using System.Data;
using System.Net.Configuration;
using System.Runtime.CompilerServices;
using System.Web.Caching;
using System.Web.DynamicData;
using System.Web.Routing;
using Dapper;
using System.Collections;
using System.Reflection;
using System.Dynamic;
using System.ComponentModel;
using iTotzke.Utilites;
using Microsoft.CSharp.RuntimeBinder;

namespace itotzke.Database
{

    public class DynamicDb
    {
        public DynamicDb()
        {
            
        }

        public SqlConnection GetOpenConnection()
        {
            SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString);
            connection.Open();
            return connection;
        }


        public enum Db
        {
            Select,
            Update,
            Delete,
            Insert
        }

        public bool ExcuteQuery(string procedureName, Object args, string schema = "dbo")
        {
            RouteValueDictionary dbArgsDictionary = new RouteValueDictionary(args);
            var dbArgs = new DynamicParameters();
            foreach (var pair in dbArgsDictionary)
            {
                dbArgs.Add(pair.Key, pair.Value);
            }
            dynamic dapperArgs = dbArgs;
            procedureName = schema + "." + procedureName;
            try
            {
                using (SqlConnection connection = GetOpenConnection())
                {
                    Debugger.Break();
                    return connection.Execute(procedureName, dbArgs, commandType: CommandType.StoredProcedure) > 0;
                }
            }
           catch (Exception ex)
            {

                // return ex.Message;
                throw;
            }
        }

        public List<T> RunQuery<T>(Db type, string tableName, string[] args, string[] cols = null, string schema = "dbo")
        {
            string sql = "";
            string argsString = string.Join(",", args.ToArray());
            string colString =(cols !=null)? string.Join(",", cols.ToArray()) : null ;
            tableName = schema + "." + tableName;
            string whereClause = (args.Length != 0) ? " WHERE " + string.Join(" AND ", args.ToArray()) : "";
            switch (type)
            {
                case(Db.Select):
                    // SELECT args FROM tableName;
                    
                    sql = "SELECT " + colString + "FROM " + tableName + whereClause;
                    break;
                case(Db.Update):
                    /**
                        UPDATE table_name
                        SET column1=value1,column2=value2,...
                        WHERE some_column=some_value;
                     */

                    sql = "UPDATE " + tableName + " SET " + colString + whereClause;
                    break;
                case (Db.Insert):
                    string optionalCols;
                    optionalCols = (colString != null) ? " (" + colString + ") " : optionalCols = " ";

                    /**INSERT INTO table_name (column1,column2,column3,...)
                                        VALUES (value1,value2,value3,...); */
                    sql = "INSERT INTO " + tableName + optionalCols+ "VALUES(" + argsString +")";
                    break;
                case (Db.Delete):
                    /**DELETE FROM table_name
                    WHERE some_column = some_value;*/
                    sql = "DELETE FROM " + tableName + whereClause;
                    break;
            }
            try
            {
                using (SqlConnection connection = GetOpenConnection())
                {
                    return connection.Query<T>(sql).ToList();
                }
            }
            catch (Exception ex)
            {
                // return ex.Message
                throw;
            }
        }

        public T RunProcedure<T>(string procedureName, Object args, string schema = "dbo")
        {
            RouteValueDictionary dbArgsDictionary = new RouteValueDictionary(args);
            var dbArgs = new DynamicParameters();
            foreach (var pair in dbArgsDictionary)
            {
                dbArgs.Add(pair.Key, pair.Value);
            }

            procedureName = schema + "." + procedureName;
            try
            {
                using (SqlConnection connection = GetOpenConnection())
                {
                    return connection.Query<T>(procedureName, args, commandType: CommandType.StoredProcedure).First();
                }
            }
            catch (Exception ex)
            {
                
                // return ex.Message;
                throw;
            }
        }

        
        public List<T> RunListProcedure<T>(string procedureName, Object args, string schema = "dbo")
        {
            RouteValueDictionary dbArgsDictionary = new RouteValueDictionary(args);
            var dbArgs = new DynamicParameters();
            foreach (var pair in dbArgsDictionary)
            {
                dbArgs.Add(pair.Key, pair.Value);
            }

            procedureName = schema + "." + procedureName;
            try
            {
                using (SqlConnection connection = GetOpenConnection())
                {
                    return connection.Query<T>(procedureName, args, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                // return ex.Message;
                throw;
            }
        }

        public List<T> CachedRunListProcedure<T>(string procedureName, Object args, string schema = "dbo")
        {
            RouteValueDictionary dbArgsDictionary = new RouteValueDictionary(args);
            var dbArgs = new DynamicParameters();
            foreach (var pair in dbArgsDictionary)
            {
                dbArgs.Add(pair.Key, pair.Value);
            }

            procedureName = schema + "." + procedureName;
            try
            {
                using (SqlConnection connection = GetOpenConnection())
                {
                    return connection.Query<T>(procedureName, args, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                // return ex.Message;
                throw;
            }
        }

        public void AsyncQuery(string procedureName, Object args, string schema = "dbo")
        {
            RouteValueDictionary dbArgsDictionary = new RouteValueDictionary(args);
            var dbArgs = new DynamicParameters();
            foreach (var pair in dbArgsDictionary)
            {
                dbArgs.Add(pair.Key, pair.Value);
            }

            procedureName = schema + "." + procedureName;
            try
            {
                using (SqlConnection connection = GetOpenConnection())
                {
                    connection.Execute(procedureName, args, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                // return ex.Message;
                throw;
            }
        }
    }
}