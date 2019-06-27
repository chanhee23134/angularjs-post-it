// 투두의 상태 상수
const completed = {
    todo: 'todo',
    doing: 'doing',
    done: 'done'
}

var todoListApp = angular.module('todoList',[]);

todoListApp.controller('todoCtrl', function($scope) {
    // json index값 추출
    $scope.getIdx = function (todo) {
        return $scope.todos.findIndex(function (item) {
            return item === todo;
        });
    }

    // todos
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

    // json에 새 ToDo 추가
    $scope.addBtn = function (newTitle, newContent, newHashTag) {
        // 입력값 체크 후 새 ToDo 추가
        if (!angular.isUndefined(newTitle) && !angular.isUndefined(newContent) && !angular.isUndefined(newHashTag)
        && newTitle != '' && newContent != '' && newHashTag != '') {
            // 새 ToDo odject
            var newTodo = {
                title: newTitle,
                checked: 'off',
                content: newContent,
                hashTag: '#' + newHashTag,
                fixed: false,
                completed: completed.todo,
                date: Date.now()
            };
            
            $scope.todos.push(newTodo);

            // Input Element 초기화
            $scope.newTitle = undefined;
            $scope.newContent = undefined;
            $scope.newHashTag = undefined;
            
            // 저장
            $scope.sendTodoJson();
            $scope.missionClear(0, 1);
            $scope.sendMissionJson();
        } else {
            alert('내용을 확인해주세요.');
        }
    }

    // 검색 데이터
    $scope.searchBtn = function (searchData) {
        $scope.searchData = searchData;
    }

    // 검색 데이터 삭제
    $scope.returnBtn = function () {
        $scope.search = '';
        $scope.searchData = '';
    }

    // 체크기능
    $scope.checkingBtn = function(todo) {
        var idx = $scope.getIdx(todo);

        // checked값 전환
        if($scope.todos[idx].checked == 'off') {
            $scope.todos[idx].checked = 'on';
        } else {
            $scope.todos[idx].checked = 'off';
        }

        $scope.sendTodoJson();
    }

    // 고정 기능
    $scope.fixingBtn = function (todo) {
        var idx = $scope.getIdx(todo);

        // fixed값 전환
        if ($scope.todos[idx].fixed) {
            $scope.todos[idx].fixed = false;
        } else {
            $scope.todos[idx].fixed = true;
        }
        
        $scope.sendTodoJson();
    }

    // 투두 단계 전환
    $scope.changeCompletedBtn = function (todo) {
        var idx = $scope.getIdx(todo);

        // 예외처리
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

    // 삭제 기능
    $scope.removeBtn = function (todo) {
        var idx = $scope.getIdx(todo);
        
        // 예외처리
        if (idx > -1) {
            $scope.todos.splice(idx, 1);
            $scope.sendTodoJson();
            $scope.missionClear(3, 1);
            $scope.sendMissionJson();
        }
    }

    // 체크된 아이템 삭제 기능
    $scope.removeCheckedBtn = function() {
        for(var idx = 0; idx < $scope.todos.length; i++) {
            if($scope.todos[idx].checked == 'on') {
                $scope.todos.splice(idx,1);
                $scope.missionClear(3, 1);
            }
        }

        $scope.sendTodoJson();
    }

    // missions
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

    // 로컬스트리지에 json 전송
    $scope.sendMissionJson = function () {
        window.localStorage['missionsData'] = angular.toJson($scope.missions);
    }

    // 미션 카운트
    $scope.missionClear = function (idx, cnt) {
        $scope.missions[idx].result += cnt;

    }
});