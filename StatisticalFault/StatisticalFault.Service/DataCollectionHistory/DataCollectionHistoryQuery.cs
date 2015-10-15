using SqlServerDataAdapter;
using StatisticalFault.Infrastruture.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace StatisticalFault.Service.DataCollectionHistory
{
    public static class DataCollectionHistoryQuery
    {
        public static DataTable GetDataCollectionHistory(string origanizationId, string startTime, string endtime, string eventType)
        {
            string connnectionString = ConnectionStringFactory.NXJCConnectionString;
            ISqlServerDataFactory dataFactory = new SqlServerDataFactory(connnectionString);
            string mySql = @"select vDate,TypeEvents,NameEvents from system_StatusLog  
                            where OrganizationID=@organizaationID
                                 and vDate>=@time
                                 and vDate<=@time1
                                 and TypeEvents like '%'+@TypeEvent+ '%'";
            SqlParameter[] parameters ={
                            new SqlParameter("organizaationID",origanizationId),
                            new SqlParameter("time",startTime),
                            new SqlParameter("time1",endtime),
                            new SqlParameter("TypeEvent",eventType),    
                        
                          };
            DataTable table = dataFactory.Query(mySql, parameters);
            return table;
        }

    }
}
