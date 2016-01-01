var app = angular.module('todo', []);

app.service('todosService', function() {
    this.todos = [
        {title: 'Build a todo app', done: false}
    ];
});

app.controller('TodoController', ['$scope','$filter','todosService', function($scope, $filter, todosService) {
    $scope.todoList = todosService.todos;
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

app.directive('addTodo', function() {
    return {
        restrict: 'E',
        templateUrl: 'add-todo.html',
        controller: 'TodoController'
    };
});

app.directive('clearCompleted', function() {
    return {
        restrict: 'E',
        templateUrl: 'clear-completed.html',
        controller: 'TodoController'
    };
});

app.directive('todos', function() {
    return {
        restrict: 'E',
        templateUrl: 'todo-list.html',
        controller: 'TodoController'
    };
});