angular.module('burdan.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout,  $ionicPlatform, $cordovaImagePicker) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  //$scope.loginData = $localStorage.getObject('userinfo','{}');
  $scope.reservation = {};
  $scope.registration = {};

  // Create the reserve modal that we will use later
  $ionicModal.fromTemplateUrl('templates/review.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reserveform = modal;
  });

  // Triggered in the reserve modal to close it
  $scope.closeReview = function() {
    $scope.reserveform.hide();
  };

  // Open the reserve modal
  $scope.review = function() {
    $scope.reserveform.show();
  };

  // Perform the reserve action when the user submits the reserve form
  $scope.doReview = function() {
    console.log('Doing reviewing', $scope.reservation);

    // Simulate a reservation delay. Remove this and replace with your reservation
    // code if using a server system
    $timeout(function() {
      $scope.closeReserve();
    }, 1000);
  }; 
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);
        $localStorage.storeObject('userinfo',$scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  // Create the registration modal that we will use later
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.registerform = modal;
    });

    // Triggered in the registration modal to close it
    $scope.closeRegister = function () {
        $scope.registerform.hide();
    };

    // Open the registration modal
    $scope.register = function () {
        $scope.registerform.show();
    };

    // Perform the registration action when the user submits the registration form
    $scope.doRegister = function () {
        // Simulate a registration delay. Remove this and replace with your registration
        // code if using a registration system
        $timeout(function () {
            $scope.closeRegister();
        }, 1000);
    };

    // $ionicPlatform.ready(function() {
    //     var options = {
    //         quality: 50,
    //         destinationType: Camera.DestinationType.DATA_URL,
    //         sourceType: Camera.PictureSourceType.CAMERA,
    //         allowEdit: true,
    //         encodingType: Camera.EncodingType.JPEG,
    //         targetWidth: 100,
    //         targetHeight: 100,
    //         popoverOptions: CameraPopoverOptions,
    //         saveToPhotoAlbum: false
    //     };
    //      $scope.takePicture = function() {
    //         $cordovaCamera.getPicture(options).then(function(imageData) {
    //             $scope.registration.imgSrc = "data:image/jpeg;base64," + imageData;
    //         }, function(err) {
    //             console.log(err);
    //         });

    //         $scope.registerform.show();

    //     };

    //     var options_gallery = {
    //        maximumImagesCount: 10,
    //        width: 800,
    //        height: 800,
    //        quality: 80
    //       };

    //     $scope.selectPicture = function(){
    //         $cordovaImagePicker.getPictures(options_gallery)
    //         .then(function (results) {
    //           for (var i = 0; i < results.length; i++) {
    //             console.log('Image URI: ' + results[i]);
    //           }
    //         }, function(error) {
    //           // error getting photos
    //         });
   

    //     };


    // });
})
        .controller('TracksController', ['$scope', 'tracks', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function ($scope, tracks, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

            $scope.baseURL = baseURL;
            $scope.tracks = tracks;

            
        }])

        

.controller('TrackDetailController', [
  '$scope', '$stateParams', 'track', 'tracksFactory',  'baseURL', '$sce',
  '$ionicPopover', '$ionicModal','$timeout', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast',
  function ($scope, $stateParams, track, tracksFactory, baseURL, $sce,
    $ionicPopover, $ionicModal, $timeout, $ionicPlatform, $cordovaLocalNotification, $cordovaToast) {

    $scope.baseURL = baseURL;
    $scope.track = track;

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
      }
    
    
    // Handle track detail popover.
      
    $ionicPopover.fromTemplateUrl('templates/track-detail-popover.html', {
      scope: $scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
    
    $scope.openPopover = function ($event) {
      $scope.popover.show($event);
    };
    

    
    $scope.addComment = function () {
      $scope.popover.hide();
      $scope.showCommentForm();
    };
    
    // Handle track comment modal, commentForm.
  
    $scope.comment = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };

    $ionicModal.fromTemplateUrl('templates/track-comment.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.commentForm = modal;
    });
  
    $scope.closeCommentForm = function() {
      $scope.commentForm.hide();
    };
  
    $scope.showCommentForm = function() {
      $scope.popover.hide();
      //timeout is a trick needed for proper showing after submitting
      $timeout(function(){
            $scope.commentForm.show();
        }, 0);
      
    };
  
    $scope.submitComment = function() {
      $scope.comment.date = new Date().toISOString();
      console.log('Submit comment', $scope.comment);
      
      $scope.track.comments.push($scope.comment);
      tracksFactory.getMusic().update({
        id: $scope.track.id
      }, $scope.track);
      
      // TODO: This always fails.
      // $scope.commentForm.$setPristine();

      $scope.comment = {
        rating: 5,
        comment: "",
        author: "",
        date: ""
      };
      
      $scope.closeCommentForm();
    };


  }
])

        .controller('TrackCommentController', ['$scope', 'tracksFactory', function($scope, tracksFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.track.comments.push($scope.mycomment);
                tracksFactory.getMusic().update({id:$scope.track.id},$scope.track);
                $scope.commentForm.$setPristine();
                //$scope.modal.close();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }
        }])

        // implement the IndexController and About Controller here

        .controller('IndexController', ['$scope', 'track', 'face', 'photo', 'baseURL', function($scope, track, face, photo, baseURL) {

                        $scope.baseURL = baseURL;
                        $scope.face = face;
                        $scope.track = track;
                        $scope.photo = photo;
                        
      }])
        .controller('AboutController', ['$scope', 'faces', 'baseURL', function($scope, faces, baseURL) {
                    $scope.baseURL = baseURL;
                    $scope.faces = faces;
                    //console.log($scope.people);
            
      }])

        .controller('PhotosController', ['$scope', 'photos', 'baseURL','$ionicListDelegate', function($scope, photos, baseURL, $ionicListDelegate) {
                    $scope.baseURL = baseURL;
                    $scope.photos = photos;
                    
            
      }])

        

;

