ourApp.controller('usersController', function ($scope, $location, $routeParams, mainFactory) {
    var userdata = {};

    $scope.mainpageUsers = {};
    mainFactory.getallUsers(function(data) {
        $scope.mainpageUsers = data;
    })

    $scope.tasksCompleted = [];
    $scope.completedMessage = '';
    $scope.upcomingMessage = '';
    $scope.tasksUpcoming = [];
    $scope.totalHours = {};

    $scope.topVolunteers = {};
    mainFactory.getTopVolunteers(function(data){
        $scope.topVolunteers = data;
        console.log("TOP", $scope.topVolunteers);
    })


    mainFactory.getUserInfo(function(data) {
        $scope.userdata = data;
        mainFactory.getAllTasks($scope.userdata._id, function(data){
            // console.log(data);
            for(x of data){
                if(x.completion == false)
                    $scope.tasksUpcoming.push(x);
                else
                    $scope.tasksCompleted.push(x);
            }
            // console.log($scope.tasksCompleted);
            if($scope.tasksUpcoming.length == 0)
                $scope.upcomingMessage = "No Upcoming Tasks!";
            if($scope.tasksCompleted.length == 0)
                $scope.completedMessage = "No Tasks Completed!";
        })
        mainFactory.getHoursId($scope.userdata._id, function(data){
            $scope.totalHours = data;
        })
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
    // setDigitsButton('Try Again');
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
    $('#digits-login').text(text).removeAttr('disabled');
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
    $scope.completedMessage = '';
    $scope.upcomingMessage = '';
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
        if($scope.charityUpcoming.length == 0)
            $scope.upcomingMessage = "No Upcoming Tasks!";
        if($scope.charityCompleted.length == 0)
            $scope.completedMessage = "No Tasks Completed!";
        // console.log($scope.upcomingMessage);
    })
    $scope.volClicked = function(id) {
        $scope.taskId = id;
    }
    $scope.donClicked = function(id) {
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
    $scope.message = '';
    $scope.allDonations = [];

    $scope.user_taskID = [];
    console.log($scope.taskId);

    mainFactory.getTask($routeParams.id, function(task){
        $scope.task = task;
        // console.log($scope.task);
        mainFactory.getVolunteers($routeParams.id, function(volunteers){
            $scope.volunteers = volunteers;
            // console.log("GET VOLUNTEERS", volunteers);
            if(volunteers.length == 0){
                // console.log("NONE");
                $scope.message = "No Volunteers Yet!";
                // console.log($scope.message);
            }
            console.log("VOLUNTEERS", $scope.volunteers);
            for(var i = 0; i < volunteers.length; i++){
                volunteers[i].total = 0;
                mainFactory.getTotal(volunteers[i]._id, volunteers[i], function(totals){
                });


            }
            $scope.volunteers = volunteers;

                console.log("AFTER LOOP", $scope.volunteers);

            }
            // for(x of volunteers){
            //     console.log("X", x);
            //     x.total = 0;
            //     mainFactory.getTotal(x._id, function(totals){
            //         console.log("GET TOTAL DATA", totals);
            //         for(y in totals){
            //             console.log("HOURS", x.hours, "PLEDGE - ", totals[y] );
            //             console.log("MULTIPLICATION", x.hours * totals[y].pledge);
            //             x.total += x.hours * totals[y].pledge;
            //         }

            //     })
            // }
            //console.log("VOLUNTEERS", $scope.volunteers);

        })

    })
    $scope.donateClicked = function(id) {
        $scope.user_taskID = id;
    }
    $scope.donationPage = function(id) {
        console.log("usertask: ", id);
        console.log($scope.newDonation);
        $scope.newDonation.user_taskID = id;
        mainFactory.addDonation($scope.newDonation, function(data) {
                mainFactory.getTask($routeParams.id, function(task){
        $scope.task = task;
        console.log($scope.task);
        mainFactory.getVolunteers($routeParams.id, function(volunteers){
            $scope.volunteers = volunteers;
            if(volunteers.length == 0){
                // console.log("NONE");
                $scope.message = "No Volunteers Yet!";
                console.log($scope.message);
            }
            console.log("VOLUNTEERS", $scope.volunteers);
            for(var i = 0; i < $scope.volunteers.length; i++){
                console.log($scope.volunteers[i]);
                $scope.volunteers[i].total = mainFactory.getTotal($scope.volunteers[i]._id, $scope.volunteers[i], function(totals){
                    // for(var y = 0; y < totals.length; y++){
                    //     console.log("VOLUNTEER - ", volunteers[i])
                    //     $scope.volunteers[i].total += $scope.volunteers[i].hours * total[y].pledge;
                    // }
                });
                console.log("AFTER LOOP", $scope.volunteers);

            }



        })

    })
        })
    }




})
