angular.module('myApp', []);


angular.module('myApp').factory('apiService', ['$http', function($http) {
    return {
        getData: function(apiUrl) {
            return $http.get(apiUrl)
                .then(function(response) {
                    return response.data;
                });
        }
    }
}]);

angular.module('myApp').controller('myController', ['apiService', function(apiService) {
    var vm = this;
    vm.data = [];
    vm.currentWeekData = [];
    vm.allUsersData = [];
    vm.lastWeekCountryCodesData = [];
    vm.lastWeekLeaderboardData = [];
    vm.displayedData = [];
    vm.loading = false;

    vm.fetchCurrentWeekData = function() {
        vm.loading = true;
        apiService.getData('https://api-backend-cmqd.onrender.com/api/currentweek/')
            .then(function(data) {
                vm.currentWeekData = data;
                vm.displayedData = vm.currentWeekData;
                vm.loading = false;
            });
    };

    vm.fetchAllUsersData = function() {
        vm.loading = true;
        apiService.getData('https://api-backend-cmqd.onrender.com/api/alluids/')
            .then(function(data) {
                vm.allUsersData = data;
                vm.displayedData = vm.allUsersData;
                vm.loading = false;
            });
    };

    vm.fetchLastWeekCountryCodesData = function() {
        vm.loading = true;
        apiService.getData('https://api-backend-cmqd.onrender.com/api/lastweek/countrycodes/')
            .then(function(data) {
                vm.lastWeekCountryCodesData = data;
                vm.displayedData = vm.lastWeekCountryCodesData;
                vm.loading = false;
            });
    };
   
    vm.fetchLastWeekLeaderboardData = function(countryCode) {
        if (!countryCode) {
            alert('Please enter a country code.');
            return;
        }
    
        vm.loading = true;
        console.log('Fetching last week leaderboard data for country code:', countryCode);
        apiService.getData('https://api-backend-cmqd.onrender.com/api/lastweek/' + encodeURIComponent(countryCode))
            .then(function(data) {
                vm.lastWeekLeaderboardData = data;
                vm.displayedData = vm.lastWeekLeaderboardData;
                console.log('Last week leaderboard data fetched successfully:', vm.lastWeekLeaderboardData);
                vm.loading = false;
            })
            .catch(function(error) {
                console.log('Error fetching last week leaderboard data:', error);
                alert('Error fetching data for the given country code.');
                vm.loading = false;
            });
    };
    
    
    
    
    
    
    
    vm.fetchUserRank = function(userID) {
        if (!userID) {
            alert('Please enter a user ID.');
            return;
        }
    
        vm.loading = true;
        apiService.getData('https://api-backend-cmqd.onrender.com/api/userrank/' + userID)
            .then(function(data) {
                vm.displayedData = data; // Assign the received data directly to displayedData
                vm.loading = false;
            })
            .catch(function(error) {
                console.log('Error fetching user rank data:', error);
                if (error.response && error.response.status === 404) {
                    alert('Invalid user ID. Please enter a valid user ID.');
                } else {
                    alert('INVALID userid.');
                }
                vm.loading = false;
            });
    };
    
    
    
    
    
    
    
}]);