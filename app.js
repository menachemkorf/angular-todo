var app = angular.module('todo', []);

app.controller('TodoController', ['$scope','$filter', function($scope, $filter) {
    $scope.todoList = [
        {title: 'Build a todo app', done: false}
    ];
    $scope.newTodo = '';
    $scope.addTodo = function() {
        $scope.todoList.push({
            title: $scope.newTodo,
            done: false
        });
        $scope.newTodo = '';
    };

    $scope.clearCompleted = function() {
        //filter 'todolist' to only contain objects with property 'done' set to false.
        $scope.todoList = $filter('filter')($scope.todoList, {done: false});
    };

}]);