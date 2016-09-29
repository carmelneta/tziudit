import { config } from './index.config';
import { runBlock } from './index.run';
import { routerConfig } from './index.route';
import { UserServiceClass, Auth } from './components/users/user.service';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './components/home/home.component';

import { UsersInit } from './components/users/users.index';
import { AdminInit } from './components/admin/admin.index';


import { ProductListComponent } from './components/products/products-list.component';

var app = angular.module('tziudit', ['ui.router', 'ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ngMaterial', 'firebase', 'md.data.table']);

app
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  
  //  Services
  .factory('Auth', Auth)
  // .service('UserService', UserServiceClass)

  
  //  Main Views
  .component('main.component', MainComponent)
  .component('pageHome', HomeComponent)

  .component('productsList', ProductListComponent)
;

UsersInit(app);
AdminInit(app);