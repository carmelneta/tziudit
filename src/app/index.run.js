export function runBlock ($log, $transitions, Auth, $q) {
  'ngInject';
  console.log(Auth);
  $log.debug('runBlock end');
  
  var requiresAuthCriteria = {
    to: state =>  state.data && state.data.requiresAuth 
  }

  var addAuthTest = transition => {
      var auth = transition.injector().get('Auth');
      return auth.$requireSignIn();        
  };
  
  var unAuth = transition => {

    var $mdBottomSheet = transition.injector().get('$mdBottomSheet');

    $mdBottomSheet.show({  
      controllerAs: 'vm',
      controller: function($mdBottomSheet, $state) {
        this.click = action => {
          $state.go(action);
          $mdBottomSheet.hide();
        };
      },
      template: `
        <md-bottom-sheet class="md-grid" layout="column">
          <div layout="row" layout-align="center center" ng-cloak>
            <h4>This action require login</h4>
            <md-button class="md-primary md-raised" ng-click="vm.click('main.users.login')">
                LOGIN
            </md-button> 
          </div> 
        </md-bottom-sheet>
        `
    });

    return transition.router.stateService.go('main.home');

  };

  $transitions.onBefore(requiresAuthCriteria, addAuthTest, { priority: 10 });
  $transitions.onError(requiresAuthCriteria,  unAuth);


  
  var adminsCriteria = {
    to: state =>  state.data && state.data.adminOnly 
  }

  
  var adminTest = transition => {
    var q = transition.injector().get('$q');
     var deferred = q.defer();

      // return auth.$requireSignIn();
      deferred.resolve('s');
      
      return deferred.promise; 
  };
  
  $transitions.onBefore(adminsCriteria, adminTest, { priority: 10 });
  $transitions.onError(adminsCriteria,  unAuth);
}
