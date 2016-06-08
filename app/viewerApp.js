(function(){
    angular.module('wikipediaViewer', ['ngSanitize']) /*, 'ngAnimate'*/
    .controller('viewerController', function($scope, $http, $timeout){
        $scope.userQuery = '';
        $scope.language = 'en';
        $scope.autocompleteList = [];

        $scope.changeLang = function(){
            return $scope.randomArticle = 'https://'+ $scope.language +'.wikipedia.org/wiki/Special:Random';
        }

        $scope.autoComplete = function(){
            if ($scope.userQuery === '')
                $scope.autocompleteList = [];

            var openSearchURL = "http://" + $scope.language +".wikipedia.org/w/api.php?action=opensearch&search=" + $scope.userQuery + '&format=json&callback=JSON_CALLBACK';
             $http({url: openSearchURL, callback: "JSON_CALLBACK", method: "JSONP"})
                .then(function(LoadedData, status, error){
                    LoadedData.data[1].forEach(function(element, i){
                        $scope.autocompleteList.push(element);
                    });

                }, function(LoadedData, status, error){
                        alert("Sorry the wikipedia opensearch was not successful -status: ", status);

                });

        }


        $scope.getWikiArticles = function(){
            var wikidata = {};
            var wikiq = '';
            $scope.articlesList = [];
            wikiq = escape($scope.userQuery);


            var wikiUrl = 'http://'+ $scope.language +'.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + wikiq + '&format=json&callback=JSON_CALLBACK';

            $http({url: wikiUrl, callback: "JSON_CALLBACK", method: "JSONP"})
                .then(function(LoadedData, status, error){
                        LoadedData.data.query.search.forEach(function(element, i){
                            wikidata.title = element.title; //LoadedData.data.query.search[i].title;
                            wikidata.url = "https://"+ $scope.language + ".wikipedia.org/wiki/" + wikidata.title.replace(/\s/g, "_");
                            wikidata.content = element.snippet + '...'; //LoadedData.data.query.search[i].snippet;

                            $scope.articlesList.push(wikidata);
                            wikidata = {};
                        });

                }, function(LoadedData, status, error){
                        alert("Sorry the wikipedia Query was not successful -status: ", status);

                });

            };




    });







})();