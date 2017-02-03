/**
 * ShowcaseJS developed by Alfredo Hinojosa
 * Version 0.1 Feb/2017
 * MIT License
 */


showcase = {}; // Object where the user repositories are stored
showcaseUtilities = {}; // Utilities that ShowcaseJS uses

/**
 * Setup the required variables for ShowcaseJS to work, it also generates the specific
 * service URLs for the GitHub user.
 * @param userName of the GitHub user
 */
function setupShowcase(userName) {

    // Creation of variables
    showcaseUtilities.gitServices = {};
    showcase.gitUser = {};
    showcase.repos = [];

    // Save the userName
    showcase.gitUser.userName = userName;

    // Generate the service URL depending of the userName
    showcaseUtilities.gitServices.getUserServiceURL = "https://api.github.com/users/" + showcase.gitUser.userName;
    showcaseUtilities.gitServices.getUserReposServiceURL = "https://api.github.com/users/"
        + showcase.gitUser.userName + "/starred";

}

/**
 * Call the specified GitHub service
 * @param serviceURL
 * @returns {*} returns a promise
 */
function callGithubService(serviceURL) {

    var deferred = $.Deferred(); // Create a promise
    var promise = $.get(serviceURL); // Make the API Call

    $.when(promise).done(function (result) {
        deferred.resolve(result); // Return the JSON response
    });

    return deferred.promise();

}

function showcaseInit(userName) {
    setupShowcase(userName);

    // Get the GitHub ID of the user
    callGithubService(showcaseUtilities.gitServices.getUserServiceURL)
        .then(function (userJSON) {

            // Save the userId
            showcase.gitUser.userId = userJSON.id;

            // Get the starred repos by user
            callGithubService(showcaseUtilities.gitServices.getUserReposServiceURL)
                .then(function (reposJSON) {

                    $.each(reposJSON, function (index, obj) {

                        // Check if the owner of the repo is the GitHub user
                        if (obj.owner.id === showcase.gitUser.userId) {
                            showcase.repos.push(obj);
                        }
                    });

                    console.log(showcase.repos);

                })
        })

}
