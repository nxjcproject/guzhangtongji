
$(function () {
    //InitDate();
    loadDataGrid("first");
    settime();
});

//定时器 定时刷新
function settime() {
    window.setInterval(query, 1000);  //循环执行 第一个为到时间执行的方法 第二个为500ms 时间 
}

//初始化日期框
function InitDate() {
    var nowDate = new Date();
    var beforeDate = new Date();
    beforeDate.setDate(nowDate.getDate() - 1);
    var nowString = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate() + " " + nowDate.getHours() + ":" + nowDate.getMinutes() + ":" + nowDate.getSeconds();
    var beforeString = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate() + " 00:00:00";
    $('#startDate').datetimebox('setValue', beforeString);
    $('#endDate').datetimebox('setValue', nowString);
}


function loadDataGrid(type, myData) {
    if ("first" == type) {                 //first 在初始化页面的时候写上了 类型为first 此处判断是不是初始化页面 最下边写的last（手写） 来和first区分
        $("#Windows_Report").datagrid({
            striped: true,
            rownumbers: true,
            singleSelect: true,
            fit: true,
            toolbar: '#toolbar_ReportTemplate',
            columns: [[

		                { field: 'Name', title: '组织机构', width: 150 },
                        { field: 'Servers', title: '服务/服务器名', width: 200 },
                        { field: 'IP', title: 'IP地址', width: 150 },
                        { field: 'Timestamp', title: '状态更新时间', width: 150 },
                        { field: 'Status', title: '状态', width: 150 }
            ]]
        });
        query();
    }
    else {
        $("#Windows_Report").datagrid("loadData", myData);
    }
}

function onOrganisationTreeClick(node) {

    // 仅能选中分厂级别
    // 即组织机构ID的层次码 = 5

    //if (node.id.length != 5) {
    //    $.messager.alert('提示', '仅能选择分厂级别。');
    //    return;
    //}

    // 设置组织机构ID
    // organizationId为其它任何函数提供当前选中的组织机构ID

    $('#organizationId').val(node.OrganizationId);

    // 设置组织机构名称
    // 用于呈现，在界面上显示当前的组织机构名称

    //$('#productLineName').textbox('setText', node.text);
}


function query() {
    // 获取组织机构ID

    //var organizationId = $('#organizationId').val();

    //if (organizationId == '') {
    //    $.messager.alert('提示', '请先选择需要分析的组织机构。');
    //    return;
    //}

    // 获取起止时间段
    //var startTime = $('#startDate').datebox('getValue');
    //var endTime = $('#endDate').datebox('getValue');


    $.ajax({
        type: "POST",
        url: "StatusQuery.aspx/GetStatusInfo",
        //data: "{organizationid:'" + organizationId + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var m_msg = JSON.parse(msg.d);
            if (m_msg.total == 0)
            { alert("没有查询的数据") }
            else
            {
                loadDataGrid("last", m_msg);
            }
        }
    });
}