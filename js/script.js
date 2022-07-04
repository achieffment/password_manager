var storage;
var notifier;
var tBody;
var table;
var headerTimerField;
var headerNotifierField;
var showMoreDialog;
var showMorePinCode;
var showMoreSecretQuestions;
var showMoreSecretAnswers;
var showMoreAuthCodes;
var showMoreJobCompany;
var showMoreJobRole;
var showMoreJobLocation;
var showMoreJobIndex;
var showMoreCreated;
var showMoreUpdated;
var searchField;

$(document).ready(function() {
    storage = new Storage();
    tBody = $('.accountsTable').find('tbody');
    table = new Table(tBody);
    headerTimerField = $('.header-time');
    headerNotifierField = $('.header-notifier');
    notifier = new Notifier(headerNotifierField);
    showMoreDialog = $('#showMore-dialog');
    showMorePinCode = $('[name=pinCode]');
    showMoreSecretQuestions = $('[name=secretQuestions]');
    showMoreSecretAnswers = $('[name=secretAnswers]');
    showMoreAuthCodes = $('[name=authCodes]');
    showMoreJobCompany = $('[name=jobCompany]');
    showMoreJobRole = $('[name=jobRole]');
    showMoreJobLocation = $('[name=jobLocation]');
    showMoreJobIndex = $('[name=jobIndex]');
    showMoreCreated = $('.created');
    showMoreUpdated = $('.updated');
    searchField = $("[name=search]");

    table.createTable();
    timer();
    setInterval(timer, 1000);

    $(document).on("click", ".buttonAdd", function () {
        addAccount();
    })

    $(document).on("click", ".buttonDelete", function() {
        var id = $(this).parents('.tableRow').attr('data-id');
        deleteAccount(id);
    });

    $(document).on("click", ".buttonShowMore", function() {
        var id = $(this).parents('.tableRow').attr('data-id');
        showMore(id);
    });

    $(document).on("click", ".buttonCopy", function() {
        var id = $(this).parents('.tableRow').attr('data-id');
        copyToClipBoard(id, notifier);
    });

    $(document).on("change", "input, textarea", function() {
        var changedField = $(this);
        changeField(changedField);
    });

    $(document).on("change", "[name=search]", function() {
        var searchVal = $(this).val();
        search(searchVal);
    })

    $(document).on("click", "thead td", function () {
        var sortField = $(this).attr('data-name');
        sort(sortField);
    })
})
