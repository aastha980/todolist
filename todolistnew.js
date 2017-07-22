var newtask,addbtn,clrbtn,list;

$(function () {
    // console.log("page loaded");
    newtask = $('#input-new-todo');
    addbtn = $('#btn-add-todo');
    clrbtn = $('#btn-clear-done');
    list = $('#list-todos');
    refreshtodos();
    addbtn.click(addTodo);
    clrbtn.click(clrDone);
});

function clrDone() {
    console.log("clrdone");
    $.get('/todoclr',function (req,res,next) {
        refreshtodos();
    })
}

function refreshtodos() {
    console.log("refreshtodos called");
    list.html("");
    $.get('/todo', function (data) {
        data.forEach(function (item) {
            var elem = `<li class="list-group-item" id="${item.id}">`;
            if(item.done == true){
                elem +=`<input class="col-1" type="checkbox" checked>`;
            } else {
                elem +=`<input class="col-1" type="checkbox">`;
            }

            elem +=`<span class="col-8">${item.task}</span>
            <i class="fa fa-remove col-1 delete" data-btn="del"></i>
            <i class="fa fa-chevron-up col-1 icn-move" data-btn="up"></i>
            <i class="fa fa-chevron-down col-1 icn-move" data-btn="down"></i>
            </li>`;
            list.append(elem);
        })
        // console.log("reaching dat line");
        // console.log(  $("i[data-btn='del']")   );
        $("i[data-btn='del']").click(deleteSingle);
        $("input[type='checkbox']").change(checkHandler)
    });

}

function checkHandler(ev) {
    var id = ev.target.parentNode.id;
    console.log(id);
    console.log(ev.target.checked);
    $.post('/todoupdt',{
        id: id,
        done: ev.target.checked
    },function () {
        refreshtodos();
    })
}

function deleteSingle(ev) {
    console.log("single delete called on id=",ev.target.parentNode.id);
    $.get('/todosoloclr/'+ev.target.parentNode.id, function (req,resp) {
        console.log(resp);
        refreshtodos();
    })
}

function addTodo() {
    $.post('/todo',{
        task: newtask.val(),
        done: false
    });
    console.log("add req sent");
    refreshtodos();
}