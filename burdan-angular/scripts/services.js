'use strict';

angular.module('burdan')
        .constant("baseURL","http://96.255.214.173:3000/")
        .service('musicFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
                this.getTrack = function(){
                    return $resource(baseURL+"tracks/:id",null,  {'update':{method:'PUT' }});
                };
                
                this.getPhoto = function () {
                    
                    return $resource(baseURL+"photos/:id",null,  {'get':{method:'GET' }});
                };
                        
        }])

        .factory('faceFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var faces = {};


                faces.getFace = function(){
                    
                    return $resource(baseURL+"faces/:id",null,  {'get':{method:'GET' }});
                    
                };
                return faces;
    
        }])
        .factory('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var feedback = {};


                feedback.postFeedback = function(){
                    
                    return $resource(baseURL+"feedback/:id",null,  {'update':{method:'PUT' }});
                    
                };
                return feedback;
    
        }])


;