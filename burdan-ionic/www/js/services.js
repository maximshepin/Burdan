'use strict';

angular.module('burdan.services',['ngResource'])
        .constant("baseURL","http://96.255.214.173:3000/")
        

        .factory('tracksFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
            return $resource(baseURL + "tracks/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });

        }])

        
    
        .factory('facesFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
    
            return $resource(baseURL+ "faces/:id");
    
        }])

        .factory('feedbacksFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
    
            return $resource(baseURL+ "feedbacks/:id");
    
        }])

        .factory('photosFactory', ['$resource', 'baseURL', function($resource, baseURL) {
    
    
            return $resource(baseURL+ "photos/:id");
    
        }])

        

        

;
