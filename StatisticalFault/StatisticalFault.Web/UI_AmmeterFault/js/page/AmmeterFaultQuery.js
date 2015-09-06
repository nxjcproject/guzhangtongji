

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
    var beforeString = beforeDate.getFullYear() + '-' + (beforeDate.getMonth()+1) + '-' + beforeDate.getDate() + " 00:00:00";
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
            pagination: true,
            pageSize: 50,
            toolbar:'#toolbar_ReportTemplate',
            columns: [[
                        { field: 'vDate', title: '故障时间', width: 150 },
		                { field: 'Description', title: '故障描述', width: 500 }
            ]]
        });
    }
    else {
        $("#Windows_Report").datagrid({ loadFilter: pagerFilter }).datagrid('loadData', myData["rows"]);
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
    var organizationId = $('#organizationId').val();

    if (organizationId == '') {
        $.messager.alert('提示', '请先选择需要分析的组织机构。');
        return;
    }

    // 获取起止时间段
    var startTime = $('#startDate').datebox('getValue');
    var endTime = $('#endDate').datebox('getValue');


    $.ajax({
        type: "POST",
        url: "AmmeterFaultQuery.aspx/GetReportData",
        data: "{organizationId:'" + organizationId + "',startTime:'" + startTime + "',endTime:'" + endTime + "'}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            var m_msg = JSON.parse(msg.d);
            if (m_msg.total == 0) {
                alert("没有查询的数据");
            } else {
                loadDataGrid("last", m_msg);
            }
            
        }
    });
}

//datagrid最下面分页栏使用
function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') {	// is array
        data = {
            total: data.length,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}