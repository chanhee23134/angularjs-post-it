// 투두의 상태 상수
const completed = {
    todo: 'todo',
    doing: 'doing',
    done: 'done'
}

var mainApp = angular.module('main', ['ngAnimate']);
var missionApp = angular.module('mission', []);

mainApp.controller('todoCtrl', function ($scope) {
    $scope.getIdx = function (todo) {
        return $scope.todos.findIndex(function (item) {
            return item === todo;
        });
    }
    // 투두 파트
    // 로컬스트리지에 빈값이라면 임의의 json생성
    // 로컬스트리지에 값이 있다면 가져오기
    if (window.localStorage['todosData'] == undefined) {
        $scope.todos = [];
    } else {
        $scope.todos = angular.fromJson(window.localStorage['todosData']);
    }

    // 로컬스트리지에 json 전송
    $scope.sendTodoJson = function () {
        window.localStorage['todosData'] = angular.toJson($scope.todos);
    }

    // 미션 파트
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

    $scope.missionClear = function (idx, cnt) {
        $scope.missions[idx].result += cnt;

    }

    // 로컬스트리지에 json 전송
    $scope.sendMissionJson = function () {
        window.localStorage['missionsData'] = angular.toJson($scope.missions);
    }

    // ng-filter를 위한 변수 입력
    $scope.searchBtn = function (searchData) {
        $scope.searchData = searchData;
    }

    // ng-filter 초기화
    $scope.returnBtn = function () {
        $scope.search = '';
        $scope.searchData = '';
    }

    // json추가 -> 투두 추가
    $scope.addBtn = function (newTitle, newContent, newHashTag) {
        if (!angular.isUndefined(newTitle) && !angular.isUndefined(newContent) && !angular.isUndefined(newHashTag)
        && newTitle != '' && newContent != '' && newHashTag != '') {
            var newTodo = {
                title: newTitle,
                content: newContent,
                completed: completed.todo,
                hashTag: '#' + newHashTag,
                date: Date.now(),
                fixed: false,
                checked: 'off'
            };

            $scope.newTitle = undefined;
            $scope.newContent = undefined;
            $scope.newHashTag = undefined;
            $scope.todos.push(newTodo);

            $scope.sendTodoJson();
            $scope.missionClear(0, 1);
            $scope.sendMissionJson();
        } else {
            alert('내용을 확인해주세요.');
        }
    }

    // 투두 단계 전환
    $scope.changeCompletedBtn = function (todo) {
        var idx = $scope.getIdx(todo);

        if (idx > -1) {
            if ($scope.todos[idx].completed == 'todo') {
                $scope.todos[idx].completed = completed.doing;
                $scope.missionClear(1, 1);
            } else {
                $scope.todos[idx].completed = completed.done;
                $scope.missionClear(2, 1);
            }
            $scope.sendTodoJson();
            $scope.sendMissionJson();
        }
    }

    // 고정 기능
    $scope.fixingBtn = function (todo) {
        var idx = $scope.getIdx(todo);

        if ($scope.todos[idx].fixed) {
            $scope.todos[idx].fixed = false;
        } else {
            $scope.todos[idx].fixed = true;
        }
        
        $scope.sendTodoJson();
    }

    // 체크기능
    $scope.checkingBtn = function(todo) {
        var idx = $scope.getIdx(todo);

        if($scope.todos[idx].checked == 'off') {
            $scope.todos[idx].checked = 'on';
        } else {
            $scope.todos[idx].checked = 'off';
        }

        $scope.sendTodoJson();
    }

    // 투두를 json에서 삭제
    $scope.removeBtn = function (todo) {
        var idx = $scope.getIdx(todo);
        
        if (idx > -1) {
            $scope.todos.splice(idx, 1);
            $scope.sendTodoJson();
            $scope.missionClear(3, 1);
            $scope.sendMissionJson();
        }
    }

    // 체크된 투두를 json에서 삭제
    $scope.removeCheckedBtn = function() {
        $scope.todos.forEach(todo => {
            console.log(todo);
            
            if(todo.checked == "on") {
                var idx = $scope.getIdx(todo);
                $scope.todos.splice(idx,1);
                $scope.missionClear(3, 1);
            }
        });

        //for(var idx = 0;)
        $scope.sendTodoJson();
    }

    // 모든 투두를 json에서 삭제
    $scope.removeAllBtn = function () {
        $scope.missionClear(3, Object.keys($scope.todos).length);
        $scope.todos.splice(0, Object.keys($scope.todos).length);
        $scope.sendTodoJson();
        $scope.sendMissionJson();
    }
});

missionApp.controller('missionCtrl', function ($scope) {
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