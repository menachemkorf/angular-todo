var app = angular.module('todo', []);

app.service('todosService', function() {

    var loadModel = function() {
        return localStorage['todos'] ? JSON.parse(localStorage['todos']) : [];
    };

    var saveModel = function() {
        localStorage['todos'] = JSON.stringify(model);
    };

    this.getTodos = function() {
        return model;
    };

    this.addTodo = function(todo) {
        model.push({title: todo, done: false});
        saveModel();
    };

    this.markComplete = function(i, done) {
        model[i].done = done;
        saveModel();
    };

    this.deleteTodo = function(i) {
        model.splice(i, 1);
        saveModel();
    }

    this.clearCompleted = function() {
        model = model.filter(function(todo) {
            return !todo.done;
        });
        saveModel();
    };

    var model = loadModel();
});



app.controller('TodoController', ['$scope','todosService', function($scope, todosService) {
    $scope.todoList = todosService.getTodos();
    $scope.newTodo = '';

    $scope.addTodo = function() {
        todosService.addTodo($scope.newTodo);
        $scope.newTodo = '';
    };

    $scope.markComplete = function(todo, done) {
        todosService.markComplete(todo, done);
    };

    $scope.deleteTodo = function(todo) {
        todosService.deleteTodo(todo);
    };

    $scope.clearCompleted = function() {
        todosService.clearCompleted();
        $scope.todoList = todosService.getTodos();
    };

}]);

app.directive('todos', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/todo-list.html',
        controller: 'TodoController'
    };
});