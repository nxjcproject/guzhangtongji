using SqlServerDataAdapter;
using StatisticalFault.Infrastruture.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace StatisticalFault.Service.AmmeterFault
{
    public class AmmeterFaultService
    {

        public static DataTable GetAmmeterErrorData(string organizationId, string startTime, string endTime)
        {
            string connectionString = ConnectionStringFactory.NXJCConnectionString;
            ISqlServerDataFactory dataFactory = new SqlServerDataFactory(connectionString);
//            string mySql = @"select A.OrganizationID,A.vDate, A.Description
//                                from system_Error A
//                                where A.vDate>=@startTime
//                                and A.vDate<=@endTime
//                                and A.OrganizationID=@organizationId";
//            SqlParameter[] parameters = { new SqlParameter("startTime", startTime), new SqlParameter("endTime", endTime),
//                                        new SqlParameter("organizationId", organizationId)};
            string mySql = @"select top(1000) A.vDate, A.Description,A.OrganizationID
                                from system_Error A
                                where A.vDate>=@startTime
                                and A.vDate<=@endTime
                                and A.OrganizationID=@organizationId
                                order by A.vDate desc";
            SqlParameter[] parameters = { new SqlParameter("startTime", startTime), new SqlParameter("endTime", endTime), new SqlParameter("organizationId", organizationId) };
            DataTable table = dataFactory.Query(mySql, parameters);
            return table;
        }

    }
}
