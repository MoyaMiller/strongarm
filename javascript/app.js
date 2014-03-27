angular.module('notesApp', ['ngRoute', 'ngAnimate', 'firebase'])

.value('fbURL', 'https://drewtestapp.firebaseio.com/')

.factory('Notes', function($firebase, fbURL) {
  return $firebase(new Firebase(fbURL));
})

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'newCtrl',
      templateUrl:'detail.html'
    })
    .when('/edit/:noteId', {
      controller:'updateCtrl',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'newCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('noteCtrl', function($scope, Notes) {
  $scope.notes = Notes;

  var search = $('input.searchquery');
  var icon = $('i.fa-search');
  search.on("focus", function() {
    icon.hide();
  });
  search.on("blur", function() {
    if (search.val() == 0) {
      icon.show();
    }
  });
})

.controller('newCtrl', function($scope, $location, $timeout, Notes) {
  $scope.save = function() {
    Notes.$add($scope.note, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
})

// 
.controller('updateCtrl',
  function($scope, $location, $routeParams, $firebase, fbURL) {
    var noteUrl = fbURL + $routeParams.noteId;
    $scope.note = $firebase(new Firebase(noteUrl));

    $scope.destroy = function() {
      $scope.note.$remove();
      $location.path('/');
    };

    $scope.save = function() {
      $scope.note.$save();
    };
});

