angular.module('alurapic').controller('FotoController', function($scope, $http, $routeParams){

	$scope.foto = {};
	$scope.mensagem = '';

	if($routeParams.fotoId) {
		$http.get('v1/fotos/' + $routeParams.fotoId)
		.success(function(foto) {
			$scope.foto = foto;
		})
		.error(function(erro){
			console.log(erro);
			$scope.mensagem = "Não foi possível obter a foto";
		});
	}

	$scope.submeter = function() {
		if($scope.formulario.$valid){
			if($scope.foto._id){
				$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
				.success(function(){
					console.log($scope.foto._id, $scope.foto);
					$scope.mensagem = "Foto editada com sucesso";
					$scope.formulario.$setPristine();
				})
				.error(function(erro){
					$scope.mensagem = "Não foi possível editar a foto " + $scope.foto.titulo;
					console.log(erro);
				});
			}else{
				$http.post('v1/fotos', $scope.foto)
				.success(function(){
					console.log($scope.foto);
					$scope.foto = {};
					$scope.mensagem = "Foto incluída com sucesso";
					$scope.formulario.$setPristine();
				})
				.error(function(erro){
					$scope.mensagem = "Não foi possível incluir a foto";
					console.log(erro);
				});
			}
		}
	};

});