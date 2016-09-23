export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  const mainState = {
    name: 'main',
    abstract: true,
    url: '/',
    component: 'main.component'
  }
  
  const homeState = {
    name: 'main.home',
    url: '',
    component: 'pageHome'
  }; 
 

  $stateProvider.state(mainState);
  $stateProvider.state(homeState); 

  // $urlRouterProvider.otherwise('/');
}
