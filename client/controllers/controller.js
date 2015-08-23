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
            $location.path('/userdashboard/'+data._id)
        });
    }

    $scope.login = function () {
        mainFactory.loginUser($scope.logUser, function (data) {
            $scope.logUser = {};
            if (data) {
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
