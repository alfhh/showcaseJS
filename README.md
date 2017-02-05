# ShowcaseJS
A friendly script that helps you showcase your GitHubs repos on your website. The best part is that once it's installed on your website you can change the repos you want to show without the need of changing the source code of your site; you just need to "star" your own repo in order to be shown on your website.

## What you get

ShowcaseJS builds a JSON with infomartion of your own repos, that are starred by you. Then you can do whatever you want with this information, be creative!

Note: By default ShowcaseJS gets only the id, name, description and the number of stars of the repos, but you can specify the information that you want by sending a filter object (Check documentation below).

```javascript
{
    "gitUser": {
        "userName": "alfhh",
        "userId": x
    },
    "repos": [
        {
            "id": x,
            "name": "showcaseJS",
            "description": "A JavaScript script that helps you showcasing you best GitHub Repos",
            "stargazers_count": 1
        },
        {...}
    ]
}
```

## How it works
Using GitHub's API, ShowcaseJS retreives the repos that belongs to the user and that are also starred by the same user.

## Getting started

**Include showcase.min.js to your site**
```html
<script src="/showcase.min.js"></script>
```
**Call the init function of ShowcaseJS with your GitHub Username**
```javascript
$(document).ready(function () {
        showcaseInit("alfhh");
    });
```
**Optional: you can specify the fields that you want to save from the repos by sending a filter object to the init function**
```javascript
$("#myButton").click(function () {
        var filter = {
            "id" : true,
            "name": true,
            "description" : true,
            "stargazers_count" : true
        };
        showcaseInit("alfhh", filter);
    });
```
If you want to know the names of the available properties that you can get check the official documentation of the GitHub Api:  https://developer.github.com/v3/repos/#get
