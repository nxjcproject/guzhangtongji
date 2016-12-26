
$(function () {
    InitDate();
    loadDataGrid("first");
});
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
    if ("first" == type) {
        $("#Windows_Report").datagrid({
            striped: true,
            rownumbers: true,
            singleSelect: true,
            fit: true,
            toolbar: '#toolbar_ReportTemplate',
            columns: [[
                          //{ field: 'OrganizationID', title: '组织机构', width: 150 },
                          { field: 'vDate', title: '时间', width: 150 },
                          { field: 'TypeEvents', title: '事件类型', width: 150 },
                          { field: 'NameEvents', title: '事件名称', width: 300 }
            ]]
        });
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

    $('#productLineName').textbox('setText', node.text);
}


function query() {
    // 获取组织机构ID
    var organizationId = $('#organizationId').val();//获取内容

    if (organizationId == '') {
        $.messager.alert('提示', '请先选择需要分析的组织机构。');
        return;
    }

    // 获取起止时间段
    var startTime = $('#startDate').datebox('getValue');
    var endTime = $('#endDate').datebox('getValue');
    var type = $('#eventType').combobox('getValue');

    var win = $.messager.progress({
        title: '请稍后',
        msg: '数据载入中...'
    });
    $.ajax({
        type: "POST",
        url: "DataCollectionHistoryQuery.aspx/GetDataHistory",
        data: "{organizationId:'" + organizationId + "',time:'" + startTime + "',time1:'" + endTime + "',type:'" + type + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $.messager.progress('close');
            var m_msg = JSON.parse(msg.d);
            if (m_msg.total == 0) {
                alert("没有查询的数据")
            }
            else { loadDataGrid("last", m_msg); }
        },
        beforeSend: function (XMLHttpRequest) {
            win;
        }
    });
}