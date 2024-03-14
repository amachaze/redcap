# REDCap #

REDCap is a secure web application for building and managing online surveys and databases.
The REDCap source code is available to all REDCap consortium partner institutions who have 
signed the REDCap license agreement with Vanderbilt University. [https://projectredcap.org](https://projectredcap.org/)

The [latest version](https://community.projectredcap.org/custom/download.php) may be downloaded from the [REDCap Community site](https://community.projectredcap.org/).

The REDCap Development Team can release new versions of REDCap to the consortium by installing and running the
[redcap_version_release](https://github.com/vanderbilt/rc_plugins/tree/redcap_version_release) plugin, which is a branch of the _rc_plugins_ GitHub repository.

**Developer notes regarding coding standards:**
 - **Database queries:**
   - **db_query()** - For querying the database, you should use `db_query()` and other `db_*` global functions. These functions are merely aliases for PHP's `mysqli_*` procedural functions. It is recommended that you use parameterized queries, which can be constructed by passing an array of query parameters as the function's second parameter - e.g., `$q = db_query("select * from redcap_metadata where project_id = ? and field_name = ?", [$pid, $field]);`.
   - **"redcap_data" table** - When querying the redcap_dataX table for a project, you should use `REDCap::getData()` and `REDCap::saveData()`. But if you need to write a direct query to the data table, you should never use "redcap_data" literally in the query because each project's data may be in any one of the data tables, so you should instead use `REDCap::getDataTable()` to retrieve the data table name for a project to use in the query - e.g., `$q = db_query("select * from ".REDCap::getDataTable($pid)." where project_id = ?", [$pid]);`.
 - **Language text:** All stock/UI text should never be hardcoded in PHP and JavaScript files but should instead be added as a uniquely-named language variable in `LanguageUpdater/English.ini`.
   - **RCView::tt()** - To reference language variables inside PHP files, you should use `RCView::tt($lang_var)` for outputting text onto a webpage - e.g., `print RCView::div(['class'=>'m-2'], RCView::tt('global_01') );`. If the language string contains placeholder values, seen as a number inside curly brackets, then you should use `RCView::tt_i()` with an array of the values to be inserted. For example, assuming the language variable "config_03" to be "As a user in DAG {0} and Role {1}...", you might have `print RCView::tt_i('config_03', [$group_name, $role_name]);`.
   - **addLangToJS()** - To reference language variables inside JavaScript files, you should first output the language strings via the PHP function `addLangToJS($lang_vars_array)`. For example, `addLangToJS(['report_190', 'report_191']);` will output the language strings as the JavaScript object attributes `lang.report_190` and `lang.report_190` on the webpage. Then your JavaScript code can reference the language strings as such: `simpleDialog(lang.report_190, lang.report_191);`.
   - NOTE: It is no longer recommended that developers output text using the global array `$lang` directly - e.g., `print "<div>".$lang['global_01']."</div>";`. This is an older convention, and the newer convention using `RCView::tt()` and other  `RCView::tt_*()` methods should be utilized instead.
