import { ManangeComponent } from './manage.component/manage.component';
import { ManangeOrdersComponent } from './manage.component/orders.component';
import { ManangeProductsComponent } from './manage.component/products.component';
import { EditProductComponent } from './manage.component/edit-product.component';
import { OrdersListComponent } from './manage.component/orders-list.component';
import { EditOrderComponent } from './manage.component/edit-order.component';
import { ManangeControlComponent } from './manage.component/control/control.component';

function AdminRoutes ($stateProvider) { 
  'ngInject';



  var indexState = {
    abstract: true,
    name: 'main.admin',
    url : 'admin',
    component: 'admin.index'
  } 

  var manageState = {
    name: 'main.admin.manage',
    url: '',
    component : 'manage.component',
    data: { requiresAuth: true }
  }

  var ordersState = {
    name: 'main.admin.manage.orders',
    url: '/orders', 
    component : 'manage.orders.component'
  }

  var ordersEditState = {
    name: 'main.admin.manage.orders.edit',
    url: '/{id}', 
    component : 'manage.orders.component'
  }

  var productsState = {
    name: 'main.admin.manage.products',
    url: '/products',
    component : 'manage.products.component'
  }

  var controlState = {
    name: 'main.admin.manage.control',
    url: '/control',
    component : 'manage.control.component'
  }

  $stateProvider.state(indexState); 
  $stateProvider.state(manageState); 
  $stateProvider.state(ordersState); 
  $stateProvider.state(ordersEditState); 
  $stateProvider.state(productsState); 
  $stateProvider.state(controlState); 
}
const AdminComponent = {
  template: '<ui-view></ui-view>', 
  controller: () => { console.log('Admin component'); }
}

export function AdminInit(app) {
  
  app
    .config(AdminRoutes)
    
    .component('editProduct', EditProductComponent)
    .component('ordersList', OrdersListComponent)
    .component('editOrder', EditOrderComponent)

    .component('admin.index', AdminComponent) 
    .component('manage.component', ManangeComponent) 
    .component('manage.orders.component', ManangeOrdersComponent) 
    .component('manage.products.component', ManangeProductsComponent) 
    .component('manage.control.component', ManangeControlComponent) 

  ;
}