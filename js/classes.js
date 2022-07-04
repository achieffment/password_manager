class Storage {
    json = new Object();

    constructor() {
        try {
            this.json = JSON.parse($('.hidden-info').text());
        } catch (e) {
            // console.log(e);
        }
    }

    writeData() {
        $.ajax({
            cache: false,
            method: "POST",
            url: "../functions/StorageFunctions.php",
            data: { 'dataWrite' : 'Y', 'data' : JSON.stringify(this.json) },
            success: function (e) {
                //
            }
        });
    }

    getCount() {
        return Object.keys(this.json).length;
    }

    addAccount() {
        var account = new Account();
        this.json[this.getCount()+1] = account;
        this.writeData();
        return account;
    }

    changeAccount(id, field, value) {
        this.json[id][field] = value;
        this.json[id]["updated"] = new Date().toLocaleString();
        this.writeData();
    }

    getAccount(id) {
        return this.json[id];
    }

    deleteAccount(id) {
        delete this.json[id];
        var i = 1;
        Object.keys(this.json).forEach(el => {
            if (el != i) {
                this.json[i] = this.json[el];
                delete this.json[el];
                this.json[i].id = i;
            }
            i++;
        });
        this.writeData();
    }

    searchByField(searchField, searchString) {
        if (searchField !== "" && searchField !== undefined && searchString != "" && searchString !== undefined) {
            var resultsIds = [];
            Object.keys(this.json).forEach(el => {
                var searchVal = storage.json[el][searchField];
                if (searchVal.length > searchString) {
                    searchVal = searchVal.substr(0, searchString.length);
                }
                searchVal = searchVal.replace(" ", "");
                if (searchVal == searchString) {
                    resultsIds.push(el);
                }
            })
            if (resultsIds.length > 0)
                return resultsIds;
            else
                return null;
        }
    }

    sortByField(sortField) {
        var accounts = [];

        var search = [];
        if (searchField.val() != "" && searchField.val() !== undefined) {
            search = this.searchByField("accountName", searchField.val())
            if (search != null && search.length > 0) {
                for (var key in search) {
                    accounts.push(this.getAccount(search[key]));
                }
            } else {
                Object.keys(this.json).forEach(el => {
                    accounts.push(this.json[el]);
                })
            }
        } else {
            Object.keys(this.json).forEach(el => {
                accounts.push(this.json[el]);
            })
        }

        accounts.sort(function (a, b) {
            if (a[sortField] > b[sortField]) {
                return 1;
            } else if (a[sortField] < b[sortField]) {
                return -1;
            }
            return 0;
        })
        var resultIds = [];
        for (var key in accounts) {
            resultIds.push(accounts[key]["id"]);
        }
        return resultIds;
    }

    copyToClipBoard(id, notifier) {
        var account = this.json[id];
        var text = "";
        Object.keys(account).forEach(el => {
            text += el + ": " + account[el] + "\n";
        });
        if (!navigator.clipboard) {
            notifier.showNotify({"code" : "warning", "msg" : "Clipboard was turned off!"});
        }
        navigator.clipboard.writeText(text).then(function() {
            notifier.showNotify({ "code" : "success", "msg" : "Copying to clipboard was successful!" });
        }, function(err) {
            notifier.showNotify({"code" : "warning", "msg" :  "Could not copy text! " + err });
        });

    }
}

class Account {
    constructor(id, accountName, link, login, password, mails, name,
                username, dob, location, index, tel, comment, pinCode, secretQuestions, secretAnswers,
                authCodes, jobCompany, jobRole, jobLocation, jobIndex, created, updated)
    {
        var curDate = new Date().toLocaleString();

        this.id = storage.getCount()+1;
        this.accountName = accountName ?? "";
        this.link = link ?? "";
        this.login = login ?? "";
        this.password = password ?? "";
        this.mails = mails ?? "";
        this.name = name ?? "";
        this.username = username ?? "";
        this.dob = dob ?? "";
        this.location = location ?? "";
        this.index = index ?? "";
        this.tel = tel ?? "";
        this.comment = comment ?? "";
        // ext info
        this.pinCode = pinCode ?? "";
        this.secretQuestions = secretQuestions ?? "";
        this.secretAnswers = secretAnswers ?? "";
        this.authCodes = authCodes ?? "";
        this.jobCompany = jobCompany ?? "";
        this.jobRole = jobRole ?? "";
        this.jobLocation = jobLocation ?? "";
        this.jobIndex = jobIndex ?? "";
        this.created = created ?? curDate;
        this.updated = updated ?? curDate;
    }
}

class Table {

    constructor(tbody) {
        this.tBody = tbody;
    }

    createTable() {
        Object.keys(storage.json).forEach(elem => {
            this.addRow(elem);
        })
    }

    clearTable() {
        var rows = this.tBody.find('tr');
        for (var i = 0; i < rows.length; i++) {
            $(rows[i]).remove()
        }
    }

    updateTable() {
        if (searchField.val() != "" && searchField.val() !== undefined) {
            search(searchField.val());
        } else if (searchField.val() != "" || searchField.val() !== undefined) {
            this.clearTable();
            this.createTable();
        }
    }

    addRow(id) {
        var tr = document.createElement('tr');
        $(tr).addClass('tableRow');
        $(tr).attr('data-id', id);
        tr = $(tr);

        var storageSkipper = ['pinCode', 'secretQuestions', 'secretAnswers', 'authCodes',
            'jobCompany', 'jobRole', 'jobLocation', 'jobIndex', 'created', 'updated'];
        var storageBigFields = ['link', 'mails', 'location', 'comment'];

        var account = storage.json[id];
        tr.append("<td><p class=\"innerId\">" + id + "</p></td>");
        Object.keys(account).forEach(elem => {
            if (elem != "id" && !storageSkipper.includes(elem)) {
                if (!storageBigFields.includes(elem))
                    tr.append("<td><input class='form-control' type='text' value='" + account[elem] + "' name='" + elem + "'></td>");
                else
                    tr.append("<td><textarea class='form-control' name=" + elem + ">" + account[elem] + "</textarea></td>");
            }
        });
        tr.append("<td><button class=\"btn btn-outline-dark buttonDelete\" data-fancybox data-src=\"#delete-dialog\">-</button></td>");
        tr.append("<td><button class=\"btn btn-outline-dark buttonShowMore\" data-fancybox data-src=\"#showMore-dialog\">More</button></td>");
        tr.append("<td><button class=\"btn btn-outline-dark buttonCopy\">Copy</button></td>");
        this.tBody.append(tr);
    }

    deleteRow(id){
        this.tBody.find('[data-id=' + id + ']').remove();
    }
}

class Notifier {
    constructor(notifierField) {
        this.notifierField = notifierField;
    }

    showNotify(resultNotify) {
        var html;
        if (resultNotify.code == "success") {
            html = "<p class='text-success'>" + resultNotify.msg + "</p>"
        } else if (resultNotify.code == "warning") {
            html = "<p class='text-warning'>" + resultNotify.msg + "</p>"
        } else {
            if (resultNotify.msg == "" || resultNotify.msg === undefined)
                resultNotify.msg = "Notifier error!";
            html = "<p class='text-danger'>" + resultNotify.msg + "</p>"
        }
        this.notifierField.html(html);
        this.notifierField.css('opacity', 1);
        setTimeout(() => this.notifierField.css('opacity', 0), 5000);
    }
}