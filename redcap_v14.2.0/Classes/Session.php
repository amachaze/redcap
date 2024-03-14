<?php

/**
 * SESSION HANDLING: DATABASE SESSION STORAGE
 * Adjust PHP session configuration to store sessions in database instead of as file on web server
 */
class Session
{
	const cookie_samesite = 'Lax';

	public static function start($savePath, $sessionName)
	{
		return true;
	}

	public static function end()
	{
		return true;
	}

	public static function read($key)
	{
        return self::getData($key);
	}

	public static function write($key, $val)
	{
		// Force session_id to only have 32 characters (for compatibility issues)
		$key = db_escape(substr($key, 0, 32));
		$val = db_escape($val);

		if (session_name() == "survey") {
			// For surveys, set expiration time as 1 day (i.e. arbitrary long time)
			$expiration = date("Y-m-d H:i:s", mktime(date("H"),date("i"),date("s"),date("m"),date("d")+1,date("Y")));
		} else {
			// For non-survey pages (all else), set expiration time using value defined on System Config page
			global $autologout_timer;
			$expiration = date("Y-m-d H:i:s", mktime(date("H"),date("i")+$autologout_timer,date("s"),date("m"),date("d"),date("Y")));
		}
		
		// If PREVENT_SESSION_EXTEND is defined, then do not update the session expiration (so it doesn't interfere with auto-logout)
		if (defined("PREVENT_SESSION_EXTEND")) {
			$sql = "UPDATE redcap_sessions SET session_data = '$val' WHERE session_id = '$key'";
		} else {
			$sql = "REPLACE INTO redcap_sessions (session_id, session_data, session_expiration) VALUES ('$key', '$val', '$expiration')";
		}
		// Return boolean on success
		return (db_query($sql) !== false);
	}

	public static function destroy($key)
	{
		// Force session_id to only have 32 characters (for compatibility issues)
		$key = substr($key, 0, 32);

		$sql = "DELETE FROM redcap_sessions WHERE session_id = '$key'";
		return (db_query($sql) !== false);
	}

	public static function gc($max_lifetime)
	{
        return self::manualGarbageCollection();
	}
	
	public static function writeClose()
	{
		@session_write_close();
	}

    // Function that performs the garbage collection process
	public static function manualGarbageCollection()
	{
        // Delete all sessions more than 1 day old, which is the session expiration time used by surveys (ignore the system setting $max_lifetime)
        $max_session_time = date("Y-m-d H:i:s", mktime(date("H"),date("i"),date("s"),date("m"),date("d")-1,date("Y")));

        $sql = "DELETE FROM redcap_sessions WHERE session_expiration < '$max_session_time'";
        return (db_query($sql) !== false);
	}

    // Function that retrieves the session data from the table
    public static function getData($key)
    {
        if ($key == null) return false;

        // Force session_id to only have 32 characters (for compatibility issues)
        $key = db_escape(substr($key, 0, 32));

        $sql = "SELECT session_data FROM redcap_sessions WHERE session_id = '$key' AND session_expiration > '" . NOW . "'";
        $sth = db_query($sql);
        return ($sth ? (string)db_result($sth, 0) : $sth);
    }

    // Return the current session ID (return only first 32 characters, if longer)
    public static function sessionId($id=null)
    {
        if ($id === null) {
            $session_id = session_id();
        } else {
            $session_id = session_id($id);
        }
        return ($session_id !== false) ? substr($session_id, 0, 32) : false;
    }

	// Initialize the PHP session (and set session name, but only if specified)
	public static function init($name="PHPSESSID")
	{
		// Session has started already, then do nothing and return true
		if (self::sessionId() != '') return true;
        // If a specific global variable is defined during a redirectAsPost() event, set it as the session_id
        if (isset($GLOBALS[System::POST_REDIRECT_SESSION_ID])) {
            Session::sessionId($GLOBALS[System::POST_REDIRECT_SESSION_ID]);
            unset($GLOBALS[System::POST_REDIRECT_SESSION_ID]);
        }
		// Set session name? If not specified, the session name and associated cookie name will be PHPSESSID
        session_name($name);
		// Start session and return success
		return session_start();
	}

	/**
	 * modify the cookie params if needed
	 *
	 * @param array $cookieParams
	 * @return void
	 */
	private static function visitCookie(&$cookieParams=[]) {
		$browser = new Browser();
		// If user agent is Epic's Hyperdrive then exlpicitly set cookie samesite policy to None
		if( preg_match('/Hyperdrive/i', $browser->getUserAgent()) === 1 ) {
			$cookieParams['samesite'] = 'None';
			$cookieParams['secure'] = true;
		}
	}

	// Set session handlers and session cookie params
	public static function preInit()
	{
		// Set session handler functions
		session_set_save_handler('Session::start', 'Session::end', 'Session::read', 'Session::write', 'Session::destroy', 'Session::gc');

		// Set session cookie parameters to make sure that HttpOnly flag is set as TRUE for all cookies created server-side
		$cookie_params = session_get_cookie_params();
		$new_cookie_params = array(
			'lifetime' => 0,
			'path' => '/',
			'domain' => '',
			'secure' => ($cookie_params['secure']===true), // Use the server's default value for 'Secure' cookie attribute to allow it to be set to TRUE via PHP.INI
			'httponly' => true,
			'samesite' => self::getCookieSamesiteAttribute()
		);
        // Keep samesite attribute?
        if (self::removeCookieSamesiteAttribute()) {
            unset($new_cookie_params['samesite']);
        }
		self::visitCookie($new_cookie_params);
        // Return
        return session_set_cookie_params($new_cookie_params);
	}

	// Store a cookie by name, value, and expiration (0=will expire when session ends)
	public static function savecookie($name, $value='', $expirationInSeconds=0, $isSessionCookie=false)
	{
		if ($name == '') return;
		$cookie_params = session_get_cookie_params();
		$new_cookie_params = array(
			'expires' => ($isSessionCookie ? '0' : time() + (int)$expirationInSeconds),
			'path' => $cookie_params['path'],
			'domain' => $cookie_params['domain'],
			'secure' => $cookie_params['secure'],
			'httponly' => $cookie_params['httponly'],
			'samesite' => self::getCookieSamesiteAttribute() // Add this manually in case we're on <PHP 7.3.0, in which it won't be returned from session_get_cookie_params()
		);
		// Keep samesite attribute?
		if (self::removeCookieSamesiteAttribute()) {
			unset($new_cookie_params['samesite']);
		}
		if ($name == 'fileDownload') {
		    $value = $value ? 'true' : 'false';;
            $header_cookie_string = "$name=".$value."; Path={$new_cookie_params['path']}; "
                . "Domain={$new_cookie_params['domain']}; SameSite=".($new_cookie_params['samesite']??"").";";
            header("Set-Cookie: " . $header_cookie_string);
        } else {
			// Set cookie using array of params
			setcookie($name, $value, $new_cookie_params);
		}
	}

	// Delete a cookie by name
	public static function deletecookie($name)
	{
		// Set cookie's expiration to a time in the past to destroy it
		self::savecookie($name, '', 0);
		// Unset the cookie
		unset($_COOKIE[$name]);
	}

    private static function getAdminSessionIdCrypto() {
        global $__SALT__;
        return \Crypto::init("blob_".$__SALT__."_admin_session", "hmac_".$__SALT__."_admin_session"); 
    }

    public static function getEncryptedAdminSessionId() {
        $sess_id = isset($_COOKIE["PHPSESSID"]) ? $_COOKIE["PHPSESSID"] : false;
        if (!$sess_id) return "NO_SESSION";
        $crypto = self::getAdminSessionIdCrypto();
        return $crypto->encrypt($sess_id);
    }

    public static function decryptAdminSessionId($encrypted_id) {
        $crypto = self::getAdminSessionIdCrypto();
        try {
            return $crypto->decrypt($encrypted_id);
        }
        catch (\Throwable $ex) {
            // Ignore
        }
        return null;
    }

	/**
	 * When in a noauth space (e.g. survey), check if user has a session cookie that belongs to an active logged-in session for an administrator
	 * This returns false for non-admins or a string (PHPSESSID)
	 * @return boolean|string 
	 */
	public static function hasAdminSessionCookie()
	{
        $session_id = isset($_COOKIE['PHPSESSID']) ? $_COOKIE['PHPSESSID'] : null;
        // In case of a different survey base url, check $_GET for an admin session id
        global $redcap_base_url, $redcap_survey_base_url;
        if ($session_id == null && $redcap_survey_base_url != "" && $redcap_base_url !== $redcap_survey_base_url && isset($_GET["__PHPSESSID"])) {
            $encr_sess_id = $_GET["__PHPSESSID"];
            $session_id = self::decryptAdminSessionId($encr_sess_id);
        }
        // Has cookie?
        if (empty($session_id)) return false;
        // Make sure the session is real and active
        $this_autologout_timer = empty($GLOBALS['autologout_timer']) ? 30 : $GLOBALS['autologout_timer'];
        $autoLogoutWindow = date("Y-m-d H:i:s", mktime(date("H"),date("i")-$this_autologout_timer,date("s"),date("m"),date("d"),date("Y")));
        $sql = "select 1 from redcap_sessions s, redcap_log_view l, redcap_user_information i
                where s.session_id = ? and s.session_expiration > ? and s.session_id = l.session_id
                and l.ts > ? and l.user = i.username and i.super_user = 1
                order by l.log_view_id desc limit 1";
        $q = db_query($sql, [$session_id, NOW, $autoLogoutWindow]);
        // Return boolean if user's session is active AND they are a super user
        return db_num_rows($q) > 0 ? $session_id : false;
	}

	// Should the cookie "SameSite" attribute be removed from cookies and cookie params?
	private static function removeCookieSamesiteAttribute()
	{
		$cookie_params = session_get_cookie_params();
		// Don't add samesite if cookie secure attribute !==true
		if ($cookie_params['secure'] !== true) return true;
		// Don't add samesite if not compatible with certain browsers
		$browser = new Browser();
		// If IE (incompatible)
		if ($browser->getBrowser() == Browser::BROWSER_IE) return true;
		// If Chrome 51-66 (incompatible)
		if ($browser->getBrowser() == Browser::BROWSER_CHROME && intval($browser->getVersion()) >= 51 && intval($browser->getVersion()) <= 66) return true;
		// If Edge <80 (incompatible)
		if ($browser->getBrowser() == Browser::BROWSER_EDGE && intval($browser->getVersion()) < 80) return true;
		// If Android UCBrowser <12.13.2 (incompatible)
		if ($browser->getBrowser() == Browser::BROWSER_UCBROWSER && $browser->getVersion() < '12.13.2') return true;
		// If Safari on MacOS 10.14 Mojave (will mistakenly set as Strict when specifying it to be None, so remove so that it applies the browser's default value)
		if ($browser->getPlatform() == Browser::PLATFORM_APPLE && $browser->getBrowser() == Browser::BROWSER_SAFARI
			&& stripos($_SERVER['HTTP_USER_AGENT'], 'Mac OS X 10_14') !== false) return true;
		// If any browser on iOS 12 (will mistakenly set as Strict when specifying it to be None, so remove so that it applies the browser's default value)
		if (in_array($browser->getPlatform(), array(Browser::PLATFORM_IPAD, Browser::PLATFORM_IPOD, Browser::PLATFORM_IPHONE))
			&& stripos($_SERVER['HTTP_USER_AGENT'], ' OS 12_') !== false) return true;
		// If we got this far, then return false
		return false;
	}

	// Get the value of the cookie "SameSite" attribute: "None", "Lax", or "Strict".
	// Can use override in database.php. Otherwise, defaults to "Lax".
	private static function getCookieSamesiteAttribute()
	{
		if (isset($GLOBALS['cookie_samesite'])) {
			return $GLOBALS['cookie_samesite'];
		} else {
			return self::cookie_samesite;
		}
	}
}
