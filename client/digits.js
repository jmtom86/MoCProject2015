/**
 * From Cannonball Web JavaScript.
 * Romain Huet
 * @romainhuet
 */


(function () {
  var config = {
    digitsConsumerKey: "CDKMugXuwQAg7HdEbndKe9tp5",
    digitsConsumerSecret: "IvdSdAP7RK0ExfOArFs4EwT9WK8ieC3JBVGnYWeKOgo0O0k3J1",
    gaTrackingId: ""
  }
  /**
   * Initialize Digits for Web as soon as the JavaScript SDK is loaded.
   */
  $('#digits-sdk').load(function () {
    // Initialize Digits using the API key.
    Digits.init({ consumerKey: config.digitsConsumerKey })
      .done(function() {
        console.log('Digits initialized.');
      })
      .fail(function() {
        console.log('Digits failed to initialize.');
      });

    // Set a click event listener on the Digits button.
    // $('#digits-button').click(onLoginButtonClick);
    $(document).on('click', '#digits-register', onRegButtonClick);
    // $(document).on('click', '#digits-login', onLoginButtonClick);
  });

  /**
   * Launch the Digits login flow.
   */
  function onRegButtonClick(event) {
    console.log('Digits login started.');
    Digits.logIn().done(onReg).fail(onFailure);
    return false;
  }
  // function onLoginButtonClick(event) {
  //   console.log('Digits login started.');
  //   Digits.logIn().done(onLogin).fail(onFailure);
  //   return false;
  // }

  /**
   * Handle the login once the user has completed the sign in with Digits.
   * We must POST these headers to the server to safely invoke the Digits API
   * and get the logged-in user's data.
   */
  function onReg(loginResponse) {
    console.log('Digits login succeeded.');
    var oAuthHeaders = parseOAuthHeaders(loginResponse.oauth_echo_headers);

    setDigitsButton('Signing In…');
    $.ajax({
      type: 'POST',
      url: '/digits',
      data: oAuthHeaders,
      success: onDigitsSuccessReg
    });
  }
  // function onLogin(loginResponse) {
  //   console.log('Digits login succeeded.');
  //   var oAuthHeaders = parseOAuthHeaders(loginResponse.oauth_echo_headers);

  //   setDigitsButton('Signing In…');
  //   $.ajax({
  //     type: 'POST',
  //     url: '/digits/login',
  //     data: oAuthHeaders,
  //     success: onDigitsSuccessLogin
  //   });
  // }

  /**
   * Handle the login failure.
   */
  function onFailure(loginResponse) {
    console.log('Digits login failed.');
    // setDigitsButton('Try Again');
  }

  /**
   * Handle the login once the user has completed the sign in with Digits.
   * We must POST these headers to the server to safely invoke the Digits API
   * and get the logged-in user's data.
   */
  function onDigitsSuccessReg(response) {
    console.log('Digits phone number retrieved.')
    $('#newUserNumber').val(response.phoneNumber);
    setDigitsNumber(response.phoneNumber);
  }
  // function onDigitsSuccessLogin(response) {
  //   console.log('Digits phone number retrieved.')
  //   setDigitsNumber(response.phoneNumber);
  // }

  /**
   * Parse OAuth Echo Headers:
   * 'X-Verify-Credentials-Authorization'
   * 'X-Auth-Service-Provider'
   */
  function parseOAuthHeaders(oAuthEchoHeaders) {
    var credentials = oAuthEchoHeaders['X-Verify-Credentials-Authorization'];
    var apiUrl = oAuthEchoHeaders['X-Auth-Service-Provider'];

    return {
      apiUrl: apiUrl,
      credentials: credentials
    };
  }

  // Set the Digits button label (and make sure it is not disabled).
  function setDigitsButton(text) {
    $('#digits-register').text(text).removeAttr('disabled');
  }

  // Set the Digits phone number (and disable the button).
  function setDigitsNumber(phoneNumber) {
    $('#digits-register').text(phoneNumber).attr('disabled', 'disabled');
  }
})();
