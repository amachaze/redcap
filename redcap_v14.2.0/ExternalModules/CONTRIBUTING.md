## Contributing Additions/Changes to the External Module Framework
If you have any colleagues that need access to this repo, please email their GitHub username to `mark.mcever@vumc.org`.

[Pull requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests) are always welcome.  Unless explicitly stated upfront, all changes in approved pull requests will be supported by Vanderbilt (not the code's original author).

### How to set up a EM Framework development environment

To override the version of the EM Framework bundled with REDCap for development, clone this repo into a directory named **external_modules** under your REDCap web root (e.g., /www/external_modules/).  

### Adding to or modifying the EM Framework

- To add a new method for calling from modules, add it to the [Framework](https://github.com/vanderbilt/redcap-external-modules/blob/testing/classes/framework/Framework.php) class.  Depending on the context, it may make sense to add new methods to one of the helper classes ([Project](https://github.com/vanderbilt/redcap-external-modules/blob/testing/classes/framework/Project.php), [Form](https://github.com/vanderbilt/redcap-external-modules/blob/testing/classes/framework/Form.php), [User](https://github.com/vanderbilt/redcap-external-modules/blob/testing/classes/framework/User.php), etc.) returned by their respective getter methods (e.g. `$module->getProject()`).  Please also include [documentation](docs/methods/README.md) for your new method in your pull request.  To reference REDCap versions in code or documentation, simply specify "TBD" as a placeholder.  This will be detected and the appropriate version will be inserted when the changes make it into a REDCap release.

- Partial pull requests (with placeholders, pseudocode, etc.) are also welcome if you have an idea but are not sure how to fully implement it!

### Here is Mark's personal strategy for contributing back to the framework:
- Prototype any new or modified framework methods inside whatever module for which you need the changes.
- Try to write them so that they would work if copy pasted into the framework
- Once they're mature & well tested, create a pull request.
- Simply leave them duplicated in your module for now.  I typically just add a comment saying: _"A pull request has been created to merge this method into the module framework.  This method can be removed once the PR is merged and this module's minimum REDCap version is updated accordingly."_