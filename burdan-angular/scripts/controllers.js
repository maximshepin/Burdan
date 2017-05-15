'use strict';

angular.module('burdan')

        .controller('MusicController', ['$scope', 'musicFactory', function($scope, musicFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            
            $scope.showMusic = false;
            $scope.message = "Loading ...";
                musicFactory.getTrack().query(
                function(response) {
                    $scope.tracks = response;
                    $scope.showMusic = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

                        
            
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {

                    //push feedback back to the REST    
                    feedbackFactory.postFeedback().save($scope.feedback);
                    
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('TrackDetailController', ['$scope', '$stateParams', 'musicFactory','$sce', function($scope, $stateParams, musicFactory, $sce) {

            $scope.track = {};
            $scope.showTrack = false;
            $scope.message="Loading ...";
            $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src)};
            $scope.track = musicFactory.getTrack().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.track = response;
                                $scope.showTrack = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );

            }])

        .controller('TrackCommentController', ['$scope', 'musicFactory', function($scope, musicFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                $scope.track.comments.push($scope.mycomment);

                musicFactory.getTrack().update({id:$scope.track.id},$scope.track);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and AboutController here
        .controller('AboutController', ['$scope', 'faceFactory', function($scope, faceFactory) {
            
            $scope.message="Loading ...";
            $scope.showFace = false;
            
            faceFactory.getFace().query(
                function(response){
                    $scope.faces = response;
                    $scope.showFace = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            
        }])
          .controller('PhotoController', ['$scope', 'musicFactory', function($scope, musicFactory) {
            
            $scope.message="Loading ...";
            $scope.showPhoto = false;
            
            musicFactory.getPhoto().query(
                function(response){
                    $scope.photos = response;
                    $scope.showPhoto = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            
        }])

        .controller('IndexController', ['$scope', 'musicFactory', 'faceFactory',  function($scope, musicFactory, faceFactory) {
            $scope.message1="Loading ...";
            $scope.showTrack = false;
            $scope.track = musicFactory.getTrack().get({id:1})
                        .$promise.then(
                            function(response){
                                $scope.track = response;
                                $scope.showTrack = true;
                            },
                            function(response) {
                                $scope.message1 = "Error: "+response.status + " " + response.statusText;
                            }
                        );

            $scope.message2="Loading ...";
            $scope.showFaces = false;
            $scope.face = faceFactory.getFace().get({id:0})
                        .$promise.then(
                            function(response){
                                $scope.face = response;
                                $scope.showFaces = true;
                            },
                            function(response) {
                                $scope.message2 = "Error: "+response.status + " " + response.statusText;
                            }
                        );
            
                        
            
            
            
            
        }])

;