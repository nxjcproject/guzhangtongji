using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using StatisticalFault.Service.DataCollectionStatus;
using StatisticalFault.Service.DataCollectionStatus;

namespace StatisticalFault.Web.UI_AmmeterFault
{
    public partial class StatusQuery : WebStyleBaseForEnergy.webStyleBase
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            base.InitComponts();
            if (!IsPostBack)
            {
#if DEBUG
                ////////////////////调试用,自定义的数据授权
                List<string> m_DataValidIdItems = new List<string>() { "zc_nxjc_byc_byf", "zc_nxjc_ychc_ndf", "zc_nxjc_ychc_yfcf", "zc_nxjc_qtx_tys"};
                AddDataValidIdGroup("ProductionOrganization", m_DataValidIdItems);
#elif RELEASE
#endif
                //this.OrganisationTree_ProductionLine.Organizations = GetDataValidIdGroup("ProductionOrganization");                 //向web用户控件传递数据授权参数
                //this.OrganisationTree_ProductionLine.PageName = "AmmeterFaultQuery.aspx";                                       //向web用户控件传递当前调用的页面名称
                //this.OrganisationTree_ProductionLine.LeveDepth = 5;
            }
        }

        [WebMethod]
        public static string GetStatusInfo()
        {
            List<string> oganizationIds = WebStyleBaseForEnergy.webStyleBase.GetDataValidIdGroup("ProductionOrganization");
            IList<string> levelCodes = WebUserControls.Service.OrganizationSelector.OrganisationTree.GetOrganisationLevelCodeById(oganizationIds);
           
            DataTable table = DataCollectionStatus.GetDataInfo(levelCodes.ToArray());
            return EasyUIJsonParser.DataGridJsonParser.DataTableToJson(table);
        }
    }
}
