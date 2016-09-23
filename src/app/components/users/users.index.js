// import { UserProfileComponent } from './profile/profile.component';

function usersRoutes ($stateProvider) { 
  'ngInject';


  var indexState = {
    abstract: true,
    name: 'main.users',
    url : 'users',
    component: 'users.index'
  } 

  // var profileState = {
  //   name: 'main.users.profile',
  //   url: '/profile',
  //   component : 'userProfile',
  //   data: { requiresAuth: true }
  // }

  $stateProvider.state(indexState); 
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
    .component('users.index', UsersComponent) 

  ;
}