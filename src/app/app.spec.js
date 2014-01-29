describe('mainCtrl', function(){
	describe('isCurrentUrl', function(){
		var mainCtrl, $location, $scope;
		beforeEach(module('todoApp'));

		beforeEach(inject(function($controller, _$location_, $rootScope){
			$location = _$location_;
			$scope = $rootScope.$new();
			mainCtrl = $controller('mainCtrl', {$scope: $scope, $location: $location});
		}));

		it('should pass a dummy test', inject(function(){
			expect(mainCtrl).toBeTruthy();
		}));
	});
});
