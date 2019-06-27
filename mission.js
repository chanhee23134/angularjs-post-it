var missionListApp = angular.module('missionList', []);

missionListApp.controller('missionCtrl', function ($scope) {
    // 로컬스트리지에 빈값이라면 임의의 json생성
    // 로컬스트리지에 값이 있다면 가져오기
    if (window.localStorage['missionsData'] == undefined) {
        $scope.missions = [
            {
                result: 0,
                goal: 100,
                title: '투두를 작성하자!'
            },
            {
                result: 0,
                goal: 100,
                title: "투두를 '하고있는 일'로 전환하자!"
            },
            {
                result: 0,
                goal: 100,
                title: "투두를 '모두한 일'로 전환하자!"
            },
            {
                result: 0,
                goal: 100,
                title: '투두를 삭제하자!'
            }
        ];
    } else {
        $scope.missions = angular.fromJson(window.localStorage['missionsData']);
    }
});