using SqlServerDataAdapter;
using StatisticalFault.Infrastruture.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;




namespace StatisticalFault.Service.DataCollectionStatus
{
    public class DataCollectionStatus
    {
        public static DataTable GetDataInfo(string[] levelCodes)
        {
            string connectionString = ConnectionStringFactory.NXJCConnectionString;
            ISqlServerDataFactory dataFactory = new SqlServerDataFactory(connectionString);
            string mySql = @"select O.Name,Servers,A.IP,A.Timestamp as Timestamp,A.Status
                            from system_StatusNet A,
							  (
								SELECT A.OrganizationID,A.Name FROM   system_Organization  as  A WHERE {0}
							   )  AS   O
                            where  A.BranchFactory=O.OrganizationID
							order by A.BranchFactory,A.Servers DESC";
            //SqlParameter parameter = new SqlParameter("organizationId", organizationId);

            StringBuilder levelCodesParameter = new StringBuilder();
            foreach (var levelCode in levelCodes)
            {
                levelCodesParameter.Append("A.LevelCode like ");
                levelCodesParameter.Append("'");
                levelCodesParameter.Append(levelCode + "%");//这用的右like 只要左边的符合条件 就查出所有的 组织机构分厂是O2 下边产线 都是O2开头
                levelCodesParameter.Append("'");
                levelCodesParameter.Append(" OR "); //这个or这儿 左右两边各加了一个空格符 所以下一句去除的时候 去了四个字符 A。levecode like ‘levelcode "%" ' or A.levelcode... or .
            }
            levelCodesParameter.Remove(levelCodesParameter.Length - 4, 4);

            DataTable table = dataFactory.Query(string.Format(mySql, levelCodesParameter.ToString()));

            //DataTable table = dataFactory.Query(mySql, parameter);

            //DataRow row = table.NewRow();     //创建与此表相同架构的 新的行
            if (table.Rows.Count > 0)
            {
                foreach (DataRow dr in table.Rows)
                {
                    DateTime columntime = Convert.ToDateTime(dr["Timestamp"]);
                    TimeSpan timespan = DateTime.Now - columntime;//时间间隔类型
                    double secondtimespan = timespan.TotalSeconds;
                    if (secondtimespan > 30)
                    {
                        dr["Status"] = "不能连接";
                        string ip = Convert.ToString(dr["IP"]);
                        DateTime time1 = DataLog.GetLogTime(ip);//寻找失联时间
                        dr["Timestamp"] = time1;
                    }
                }
            }
            return table;
        }
    }
}



