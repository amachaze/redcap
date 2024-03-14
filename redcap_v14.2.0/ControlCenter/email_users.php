<?php


// Config for non-project pages


require_once dirname(dirname(__FILE__)) . "/Config/init_global.php";

//If user is not a super user, go back to Home page
if (!ACCOUNT_MANAGER) redirect(APP_PATH_WEBROOT);



## DISPLAY PAGE
include 'header.php';
?>

<h4 id='email_users_header' style='margin-top: 0;'><i class="fas fa-envelope"></i> <?= $lang['email_users_02'] ?></h4>

<p><?= $lang['email_users_03']." ".$lang['email_users_29']?></p><br>


<div class="card card-body bg-light">
	<div class="my-2">
		<div id="email-users"></div>
	</div>
</div>

<style>
@import url('<?= APP_PATH_JS ?>vue/components/dist/style.css');
</style>

<script type="module">
import {EmailUsers} from '<?= getJSpath('vue/components/dist/lib.es.js') ?>'

EmailUsers('#email-users')

</script>

<?php
include 'footer.php';
