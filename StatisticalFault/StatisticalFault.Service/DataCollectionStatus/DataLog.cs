using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using StatisticalFault.Infrastruture.Configuration;
using SqlServerDataAdapter;
using System.Data.SqlClient;


namespace StatisticalFault.Service.DataCollectionStatus
{
    public static class DataLog
    {
        public static DateTime GetLogTime(string Ip)
        {
            string connnectionString = ConnectionStringFactory.NXJCConnectionString;//类下边的一个属性 返回连接字符串
            ISqlServerDataFactory dataFactory = new SqlServerDataFactory(connnectionString);//定义一个接口 
            string mySql = @"select A.IP,  max(convert(varchar(19),A.vDate,20)) as vDate
                           from system_StatusLog A   
                           where   A.IP=@ip 
                           and A.TypeEvents='正常通知'
                           group by A.IP";
            SqlParameter parameter = new SqlParameter("ip", Ip);
            DataTable table1 = dataFactory.Query(mySql, parameter);

            DateTime lastTime = Convert.ToDateTime(table1.Rows[0]["vDate"]);
            return lastTime;
        }
    }
}

