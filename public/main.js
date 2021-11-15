var ngApp = angular.module('myApp', []) // variable para crear App Angular

// Metodo que sirve para conectar capas vista y modelo
ngApp.controller('myController', function ($scope, $http) {

  //scope funciona variable de sesion, el metodo msg funciona para imprimir en pantalla
  $scope.msg = 'Inmobiliaria de Moisés y Yeison'

  // Metodo getData para conseguir informacion
  $scope.getData = function () {
    return 'qubernet';
  }

  // Metodo createToDo para hacer 'algo'
  $scope.createTodo = function () {

    $http
      .post("http://localhost:9000/insertarUsuario", $scope.formData) // Se envia la info a la '/upload'
      .then(function successCallback(response) { // Entonces el server responde
        // $scope.formData = {} -- Ya venia comentado --
        $scope.todos = response.data;
        console.log(response);
      })// Fin successCallback

    //   alert($scope.tel+" "+$scope.cedula)

  } // Fin createTodo

}) // Fin controller

// Funcion que se puede usar cuando cargue la página
onload = function () {

  document.getElementById('lbtnTest').onclick = function () {

    alert("hola")
    // Obtenga la aplicación Angular a través del controlador
    var appElement = document.querySelector('[ng-controller=myController]')
    // Obtenga la variable $ scope
    var $scope = angular.element(appElement).scope()
    // Llama a la variable msg y cambia el valor de msg
    $scope.msg = '123456'
    // La línea anterior cambió el valor de msg. Si desea sincronizar con el controlador angular, debe llamar al método $ apply ().
    $scope.$apply()
    // Llame al método getData () en el controlador
    console.log($scope.getData())
  }// Fin document.getById

} // Fin onload
