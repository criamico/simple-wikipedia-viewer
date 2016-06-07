(function(){
    angular.module('wikipediaViewer', ['ngSanitize']) /*, 'ngAnimate'*/
    .controller('viewerController', function($scope, $http){
        $scope.userQuery = '';
        $scope.language = 'en';

        $scope.changeLang = function(){
            return $scope.randomArticle = 'https://'+ $scope.language +'.wikipedia.org/wiki/Special:Random';
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