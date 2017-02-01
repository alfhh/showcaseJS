function init() {

    var gitServices = {};
    var repos = [];
    var gitUser = {};

    window.gitServices = gitServices;
    window.repos = repos;
    window.gitUser = gitUser;

    gitUser.userName = "alfhh";

    gitServices.getUserServiceURL = "https://api.github.com/users/" + gitUser.userName;
    gitServices.getUserReposServiceURL = "https://api.github.com/users/" + gitUser.userName + "/starred";

    // Get the id of the user
    $.get(gitServices.getUserServiceURL, function (data) {

        gitUser.id = data.id;
        getUserRepos();

    });

}

function getUserRepos() {

    // Get the id of the user
    $.get(gitServices.getUserReposServiceURL, function (data) {

        console.log(data);

    });

}