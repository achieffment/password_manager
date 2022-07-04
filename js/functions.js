function timer() {
    $.ajax({
        cache: false,
        method: "POST",
        url: "../functions/TimerFunctions.php",
        success: function(html) {
            headerTimerField.html(html);
        }
    })
}

function addAccount() {
    var account = storage.addAccount();
    table.addRow(account['id']);
}

function deleteAccount(id) {
    $(document).on("click", ".buttonDeleteConfirm", function() {
        storage.deleteAccount(id)
        table.updateTable();
        Fancybox.close();
    });
}

function showMore(id) {
    var account = storage.json[id];
    showMoreDialog.attr('data-id', id);
    showMorePinCode.val(account.pinCode);
    showMoreSecretQuestions.val(account.secretQuestions);
    showMoreSecretAnswers.val(account.secretAnswers);
    showMoreAuthCodes.val(account.authCodes);
    showMoreJobCompany.val(account.jobCompany);
    showMoreJobRole.val(account.jobRole);
    showMoreJobLocation.val(account.jobLocation);
    showMoreJobIndex.val(account.jobIndex);
    showMoreCreated.html(account.created);
    showMoreUpdated.html(account.updated);
}

function copyToClipBoard(id, notifier) {
    storage.copyToClipBoard(id, notifier);
}

function changeField(changedField) {
    if (changedField.attr('name') != 'search') {
        var id = changedField.parents('.tableRow').attr('data-id');
        if (id === undefined) {
            id = $('#showMore-dialog').attr('data-id');
        }
        var name = changedField.attr('name');
        var val = changedField.val();
        storage.changeAccount(id, name, val);
    }
}

function search(searchVal) {
    if (searchVal == "") {
        table.clearTable();
        table.createTable();
    } else {
        var result = storage.searchByField('accountName', searchVal);
        if (result == null)
            notifier.showNotify({'code' : 'warning', 'msg' : 'Can not find results!'})
        else {
            table.clearTable();
            for (var i = 0; i < result.length; i++)
                table.addRow(result[i]);
        }
    }
}

function sort(sortField) {
    var result = storage.sortByField(sortField);
    table.clearTable();
    for (var key in result) {
        table.addRow(result[key]);
    }
}

function fillTestData() {
    Object.keys(storage.json).forEach(el => {
        var account = storage.json[el];
        Object.keys(account).forEach(elem => {
            if (elem == "created" || elem == "updated")
                storage.json[el][elem] = new Date().toLocaleString();
            else
                storage.json[el][elem] = el + " " + elem;
        })
    })
    table.updateTable();
}