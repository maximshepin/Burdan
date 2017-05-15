// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('burdan', ['ionic', 'ngCordova', 'burdan.controllers','burdan.services'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // $timeout(function(){
    //             $cordovaSplashscreen.hide();
    //   },2000);
  });
    $rootScope.$on('loading:show', function () {
        $ionicLoading.show({
            template: '<ion-spinner></ion-spinner> Loading ...'
        })
    });

    $rootScope.$on('loading:hide', function () {
        $ionicLoading.hide();
    });

    $rootScope.$on('$stateChangeStart', function () {
        console.log('Loading ...');
        $rootScope.$broadcast('loading:show');
    });

    $rootScope.$on('$stateChangeSuccess', function () {
        console.log('done');
        $rootScope.$broadcast('loading:hide');
    });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller: 'IndexController',
        resolve: {
          track: ['tracksFactory', function (tracksFactory) {
            return tracksFactory.get({id: 1});
          }],
          face: ['facesFactory', function (facesFactory) {
            return facesFactory.get({id: 0});
          }],
          photo: ['photosFactory', function (photosFactory) {
            return photosFactory.get({id: 4});
          }]
        }
      }
    }
  })

  .state('app.aboutme', {
    url: '/aboutme',
    views: {
      'mainContent': {
        templateUrl: 'templates/aboutme.html',
        controller: 'AboutController',
        resolve: {
          faces: ['facesFactory', function (facesFactory) {
            return facesFactory.query();
          }]
        }
      }
    }
  })
  .state('app.contactme', {
      url: '/contactme',
      views: {
        'mainContent': {
          templateUrl: 'templates/contactme.html'
        }
      }
    })

    .state('app.tracks', {
      url: '/tracks',
      views: {
        'mainContent': {
          templateUrl: 'templates/music.html',
          controller: 'TracksController',
          resolve: {
            tracks: ['tracksFactory', function (tracksFactory) {
              return tracksFactory.query();
            }]
          }
        }
      }
    })

    .state('app.photos', {
      url: '/photos',
      views: {
        'mainContent': {
          templateUrl: 'templates/photos.html',
          controller: 'PhotosController',
          resolve: {
            photos: ['photosFactory', function (photosFactory) {
              return photosFactory.query();
            }]
          }
        }
      }
    })


  .state('app.trackdetails', {
    url: '/tracks/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/trackdetail.html',
        controller: 'TrackDetailController',
        resolve: {
            track: ['$stateParams','tracksFactory', function($stateParams, tracksFactory){
                return tracksFactory.get({id:parseInt($stateParams.id, 10)});
            }]
        }
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
