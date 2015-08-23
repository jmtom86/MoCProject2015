ourApp.controller('usersController', function ($scope, $location, $routeParams, mainFactory) {
    var userdata = {};
    mainFactory.getUserInfo(function(data) {
        $scope.userdata = data;
        console.log($scope.userdata);
    })

    $scope.addUser = function() {
        $scope.newUser.number = $('#newUserNumber').val();
        console.log($scope.newUser);
        mainFactory.addUser($scope.newUser, function(data) {
            $scope.newUser = {};
            $('#login-modal').modal('hide');
            mainFactory.setUser(data);
            $location.path('/userdashboard/'+data._id)
        });
    }

    $scope.login = function () {
        mainFactory.loginUser($scope.logUser, function (data) {
            $scope.logUser = {};
            if (data) {
                mainFactory.setUser(data);
                $('#login-modal').modal('hide');
                $location.path('/userdashboard/'+data._id)
            }
            else {
                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
            }
        })
    }

    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function() {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
      }, $msgShowTime);
    }

    function msgFade ($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

  /**
   * Initialize Digits for Web as soon as the JavaScript SDK is loaded.
   */
  $('#digits-sdk').load(function () {

    // Set a click event listener on the Digits button.
    // $('#digits-button').click(onLoginButtonClick);
    $(document).on('click', '#digits-login', onLoginButtonClick);
  });

  /**
   * Launch the Digits login flow.
   */
  function onLoginButtonClick(event) {
    console.log('Digits login started.');
    Digits.logIn().done(onLogin).fail(onFailure);
    return false;
  }

  /**
   * Handle the login once the user has completed the sign in with Digits.
   * We must POST these headers to the server to safely invoke the Digits API
   * and get the logged-in user's data.
  */
  function onLogin(loginResponse) {
    console.log('Digits login succeeded.');
    var oAuthHeaders = parseOAuthHeaders(loginResponse.oauth_echo_headers);

    setDigitsButton('Signing In…');
    $.ajax({
      type: 'POST',
      url: '/digits/login',
      data: oAuthHeaders,
      success: onDigitsSuccessLogin
    });
  }

  /**
   * Handle the login failure.
   */
  function onFailure(loginResponse) {
    console.log('Digits login failed.');
    setDigitsButton('Try Again');
  }

  /**
   * Handle the login once the user has completed the sign in with Digits.
   * We must POST these headers to the server to safely invoke the Digits API
   * and get the logged-in user's data.
   */
  var onDigitsSuccessLogin = function(data) {
    console.log('Digits phone number retrieved.')
    if (!data) {
        console.log('But no user was found with this number');
        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
    }
    else if (data.error) {
        console.log('Just kidding, an error occurred');
        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
    }
    else {
        console.log('Success!', data);
        mainFactory.setUser(data);
        $('#login-modal').modal('hide');
        // console.log($scope);
        // console.log($location);
        $location.path('/userdashboard/'+data._id);
        $scope.$apply();
    }
    // setDigitsNumber(response.phoneNumber);
  }

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
})
ourApp.controller('charityController', function ($scope, mainFactory) {
    $scope.charities = [];

    mainFactory.getCharities(function(data) {
        for (i in data) {
            data[i].count = 0
            for (x in data[i].tasks) {
                if (data[i].tasks[x].completion == false) {
                    data[i].count++;
                }
            }
        }
        $scope.charities = data;
    })
})
ourApp.controller('tasksController', function($scope, $location, $routeParams, mainFactory) {
    $scope.charityCompleted = [];
    $scope.charityUpcoming = [];
    $scope.charityInfo = {};
    $scope.taskId = [];
    mainFactory.getOneCharity($routeParams.id, function(data) {
        $scope.charityInfo = data;
        for (i of data.tasks) {
            if (i.completion == false) {
                $scope.charityUpcoming.push(i);
            } else {
                $scope.charityCompleted.push(i)
            }

        }
        // $scope.charityCompleted = data;
    })
    $scope.volClicked = function(id) {
        $scope.taskId = id;
    }
    $scope.volPage = function(id) {
        console.log("volPAGE: ", id);
        $location.path('/volunteers/'+id);
    }
})

ourApp.controller('taskController', function($scope, $location, $routeParams, mainFactory){
    $scope.taskId = $routeParams.id;
    $scope.task = {};
    $scope.volunteers = [];
    console.log($scope.taskId);
    mainFactory.getTask($routeParams.id, function(data){
        $scope.task = data;
        console.log($scope.task);
        mainFactory.getVolunteers($routeParams.id, function(data){
            $scope.volunteers = data;
            console.log("VOLUNTEERS", data);
        })
    })

})
