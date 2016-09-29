class Ctrl {
  constructor ( $firebaseArray, $firebaseObject ) {
    'ngInject';
    this._$firebaseArray = $firebaseArray;
    this._$firebaseObject = $firebaseObject;

    
  }
  
  //  Check if products is in order, return 0 | 1
  productInOrder(productId, order){
    if(!order.products) { return 0 }
    return order.products.filter( x => x.id === productId ).length;
  }

  $onInit() {   
    this.selected = null; 
  } 
 

  $onChanges(change) {    

    var ref = firebase.database().ref().child("orders").orderByChild('start');
    var productsRef = firebase.database().ref().child('products');

    this.products = this._$firebaseArray(productsRef);
    this.orders = this._$firebaseArray(ref);

    // this.products.$loaded(x => this.products.map(x => console.log(x)));
    // this.orders.$loaded(x => this.orders.map(x => console.log(x)));
  } 
}


export const ManangeControlComponent = {
  controller: Ctrl,
  bindings: {
  },
  template: `
  <style>
  table.md-table td.md-cell, table.md-table th.md-column { 
    text-align: right;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
  }
  </style>
   <md-toolbar class="md-warn">
      <div class="md-toolbar-tools">
      <h2 class="md-flex">טבלת שליטה</h2>
    </div>
  </md-toolbar>

  <md-content flex layout-padding ng-if="$ctrl.orders">
     
    <!-- exact table from live demo -->
    <md-table-container ng-if="$ctrl.products">
      <table md-table md-row-select="true" ng-model="$ctrl.selected">
        <thead md-head >
          <tr md-row>
            <th md-column><span>מוצרים | הזמנות</span></th>
            <th md-column ng-repeat="order in $ctrl.orders">
              <a ui-sref="main.admin.manage.orders.edit({id: order.$id})">{{order.name}}</a>
              <br>
              {{order.start}}
            </th>
          </tr>
        </thead>
        <tbody md-body>
          <tr md-row md-select="product" md-select-id="name" md-auto-select ng-repeat="product in $ctrl.products">
            <td md-cell>{{product.title}}</td>
            <td md-cell ng-repeat="order in $ctrl.orders">
              <md-icon ng-show="$ctrl.productInOrder(product.$id, order)">
                done
              </md-icon>
            </td> 
          </tr>
        </tbody>
      </table>
    </md-table-container>
    
  </md-content> 
  `
}