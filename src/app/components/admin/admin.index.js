import { ManangeComponent } from './manage.component/manage.component';
import { ManangeOrdersComponent } from './manage.component/orders.component';
import { ManangeProductsComponent } from './manage.component/products.component';
import { EditProductComponent } from './manage.component/edit-product.component';
import { OrdersListComponent } from './manage.component/orders-list.component';
import { EditOrderComponent } from './manage.component/edit-order.component';

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
    // data: { requiresAuth: true }
  }

  var ordersState = {
    name: 'main.admin.manage.orders',
    url: '',
    component : 'manage.orders.component',
    // data: { requiresAuth: true }
  }

  var productsState = {
    name: 'main.admin.manage.products',
    url: '',
    component : 'manage.products.component',
    // data: { requiresAuth: true }
  }

  $stateProvider.state(indexState); 
  $stateProvider.state(manageState); 
  $stateProvider.state(ordersState); 
  $stateProvider.state(productsState); 
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

  ;
}