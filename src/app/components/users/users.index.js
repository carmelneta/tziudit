import { LoginComponent } from './login.component';

function usersRoutes ($stateProvider, ) { 
  'ngInject';


  var indexState = {
    abstract: true,
    name: 'main.users',
    url : 'users',
    component: 'users.index'
  } 

  var loginState = {
    name: 'main.users.login',
    url : '/login',
    component: 'login.component'
  }  

  $stateProvider.state(indexState); 
  $stateProvider.state(loginState); 
}
const UsersComponent = {
  template: '<ui-view></ui-view>', 
  controller: function(){
    console.log('Users component');
  }
}

export function UsersInit(app) {
  app
    .config(usersRoutes)
    .component('login.component', LoginComponent) 
    .component('users.index', UsersComponent) 

  ;
}