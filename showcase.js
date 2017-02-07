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

/**
 * This function is the driver function for ShowcaseJS
 * @param userName of GitHub
 * @param filter OPTIONAL, the resulting objects will have the same properties that this object has
 */
function showcaseInit(userName, filter) {

    var mainDeferred = $.Deferred();

    filter = filter || undefined;

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

                            var repo = {};

                            // Include the desired properties of the repo to the object
                            if (filter != undefined) {
                                for (var property in filter) {
                                    repo[property] = obj[property];
                                }
                            } else {
                                repo.id = obj.id;
                                repo.name = obj.name;
                                repo.description = obj.description;
                                repo["stargazers_count"] = obj["stargazers_count"];
                            }

                            showcase.repos.push(repo);
                        }
                    });

                    // End of the promises, the window.showcase.repos has the resulting objects
                    window.showcase = showcase;
                    mainDeferred.resolve();
                })
        })

    return mainDeferred.promise;
}
