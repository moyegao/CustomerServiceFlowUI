
function approve(data) {
    
    var form = getData(".datafield");
    var taskId = sessionStorage.getItem('taskId');
    var id = sessionStorage.getItem('id');
    var template = sessionStorage.getItem('processKey');
    var endDate = sessionStorage.getItem('endDate');
    // console.log(taskId, id, template);
    $.extend(data, { taskid: taskId, id: id, template: template }, form);
    data.form = { endDate: endDate }
    var dlg = dialog({
        title : "数据提交中",
        content : "处理中"
    });
    // console.log(data);
    dlg.showModal();
    

    $.ajax({
        url : "/api/supervise/workflow/test.api",
        dataType : "JSON",
        data : {'json' : JSON.stringify(data)},
        type : "POST",
        traditional : true,
        success: function (message) {
            
            if (message.code == 0) {
                dlg.content(message.description);
                setTimeout(function () {
                    // debugger
                    //index页面获取，刷新待办任务列表
                    // localStorage.setItem("refresh", "true");
                    eventBus.$emit('approvalClose', 'true');
                    dlg.remove();
                }, 2000);
            } else {
                dlg.content(message.description);
                setTimeout(function() {
                    dlg.remove();
                    
                }, 2000);
                
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            eventBus.$emit('approvalClose', 'true');
            dlg.content(textStatus);
            setTimeout(function() {
                dlg.remove();
            }, 2000);
        }
    }
    );
    
    // commitData('http://localhost:8080/supervise/workflow/test.api', {josn : JSON.stringify(data)}, {
    // success : function(message) {
    //     if (message.code == 0) {
    //         dlg.content(message.description);
    //         setTimeout(function() {
    //             window.reload();
    //         }, 2000);
    //     } else {
    //         dlg.content(message.description);
    //         setTimeout(function() {
    //             dlg.remove();
    //         }, 2000);
    //     }
    // },
    // error : function(XMLHttpRequest, textStatus, errorThrown) {
    //     dlg.content(textStatus);
    //     setTimeout(function() {
    //         dlg.remove();
    //     }, 2000);
    //     }
    // });
}