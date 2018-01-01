﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AmmeterFaultQuery.aspx.cs" Inherits="StatisticalFault.Web.UI_AmmeterFault.AmmeterFaultQuery" %>
<%@ Register Src="~/UI_WebUserControls/OrganizationSelector/OrganisationTree.ascx" TagPrefix="uc1" TagName="OrganisationTree" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>电表通讯故障查询</title>
    <link rel="stylesheet" type="text/css" href="/lib/ealib/themes/gray/easyui.css" />
    <link rel="stylesheet" type="text/css" href="/lib/ealib/themes/icon.css" />
    <link rel="stylesheet" type="text/css" href="/lib/extlib/themes/syExtIcon.css" />
    <link rel="stylesheet" type="text/css" href="/lib/extlib/themes/syExtCss.css" />

    <link rel="stylesheet" type="text/css" href="/lib/pllib/themes/jquery.jqplot.min.css" />
    <link type="text/css" rel="stylesheet" href="/lib/pllib/syntaxhighlighter/styles/shCoreDefault.min.css" />
    <link type="text/css" rel="stylesheet" href="/lib/pllib/syntaxhighlighter/styles/shThemejqPlot.min.css" />
    <link type="text/css" rel="stylesheet" href="/css/common/charts.css" />
    <link type="text/css" rel="stylesheet" href="/css/common/NormalPage.css" />


    <script type="text/javascript" src="/lib/ealib/jquery.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="/lib/ealib/jquery.easyui.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="/lib/ealib/easyui-lang-zh_CN.js" charset="utf-8"></script>

    <script type="text/javascript" src="/lib/pllib/jquery.jqplot.min.js"></script>

    <!-- Additional plugins go here -->
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.barRenderer.min.js"></script>
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.pieRenderer.min.js"></script>
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.canvasTextRenderer.min.js"></script>
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.canvasAxisTickRenderer.min.js"></script>
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.categoryAxisRenderer.min.js"></script>
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.cursor.min.js"></script>
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.dateAxisRenderer.min.js"></script>
    <script type="text/javascript" src="/lib/pllib/plugins/jqplot.pointLabels.min.js"></script>

    <!--[if lt IE 8 ]><script type="text/javascript" src="/js/common/json2.min.js"></script><![endif]-->

    <script type="text/javascript" src="/js/common/format/DateTimeFormat.js" charset="utf-8"></script>

    <script type="text/javascript" src="js/page/AmmeterFaultQuery.js" charset="utf-8"></script>
</head>
<body>

    <div class="easyui-layout" data-options="fit:true,border:false">
        <div data-options="region:'west',split:true" style="width: 150px;">
            <uc1:OrganisationTree ID="OrganisationTree_ProductionLine" runat="server" />
        </div>
        <!-- 图表开始 -->
        <div id="toolbar_ReportTemplate" style="display: none;height:40px;padding-top:10px">
            <table>
                <tr>
                    <td>
                        <table>
                            <tr>
                                <td style="width:50px; text-align: right;">组织机构</td>
                                <td>
                                    <input id="productLineName" class="easyui-textbox" style="width: 100px;" readonly="true" /><input id="organizationId" readonly="true" style="display: none;" /></td>
                                <td style="width:58px; text-align: right;">开始时间</td>
                                <td>
                                    <%--<input id="datetime" class="easyui-datetimespinner" value="6/24/2014" data-options="formatter:formatter2,parser:parser2,selections:[[0,4],[5,7]]" style="width:180px;" />--%>
                                    <input id="startDate" type="text" class="easyui-datetimebox" required="required" style="width: 150px;" />
                                </td>
                                <td style="width:58px; text-align: right;">结束时间</td>
                                <td>
                                    <%--<input id="datetime" class="easyui-datetimespinner" value="6/24/2014" data-options="formatter:formatter2,parser:parser2,selections:[[0,4],[5,7]]" style="width:180px;" />--%>
                                    <input id="endDate" type="text" class="easyui-datetimebox" required="required" style="width: 150px;" />
                                </td>
                                <td><a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'"
                                    onclick="query();">查询</a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>

        <div id="reportTable" class="easyui-panel" data-options="region:'center', border:true, collapsible:false, split:false">
            <table id="Windows_Report"></table>
        </div>
        <!-- 图表结束 -->
    </div>
</body>
</html>
