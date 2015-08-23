ourApp.controller('usersController', function($scope, $routeParams, mainFactory) {
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

    mainFactory.getUserInfo(function(data) {
        $scope.userdata = data;
        mainFactory.getAllTasks($scope.userdata._id, function(data){
            console.log(data);
            for(x of data){
                if(x.completion == false)
                    $scope.tasksUpcoming.push(x);
                else
                    $scope.tasksCompleted.push(x);
            }
            console.log($scope.tasksCompleted);
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
        // console.log($scope.newUser);
        mainFactory.addUser($scope.newUser, function(data) {
            $scope.newUser = {};
        });
    }

})
ourApp.controller('charityController', function($scope, mainFactory) {
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
        console.log($scope.upcomingMessage);
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
    console.log($scope.taskId);
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



})
