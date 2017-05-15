'use strict';

angular.module('burdan', ['ui.router','ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutme page
            .state('app.aboutme', {
                url:'aboutme',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutme.html',
                        controller  : 'AboutController'                  
                    }
                }
            })
        
            // route for the contactme page
            .state('app.contactme', {
                url:'contactme',
                views: {
                    'content@': {
                        templateUrl : 'views/contactme.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

            // route for the music page
            .state('app.tracks', {
                url: 'tracks',
                views: {
                    'content@': {
                        templateUrl : 'views/tracks.html',
                        controller  : 'MusicController'
                    }
                }
            })

            // route for the photos page
            .state('app.photos', {
                url: 'photos',
                views: {
                    'content@': {
                        templateUrl : 'views/photo.html',
                        controller  : 'PhotoController'
                    }
                }
            })

            // route for the trackdetail page
            .state('app.trackdetails', {
                url: 'tracks/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/trackdetail.html',
                        controller  : 'TrackDetailController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;