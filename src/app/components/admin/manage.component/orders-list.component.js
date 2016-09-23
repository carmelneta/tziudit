class Ctrl {
  constructor ( $firebaseArray ) {
    'ngInject';
    
    console.log('Orders List Compoennet');

    this._$firebaseArray = $firebaseArray;
  }
 
  $onInit() { } 
  
  $onChanges(change) {    
    // console.log(change)
    
    var status = change.filter.currentValue;

    var ref = firebase.database().ref().child("orders").orderByChild("status").equalTo(status);   
        
    this.orders = this._$firebaseArray(ref);
    
    // this.orders.$loaded().then( x => console.log(x) );
  } 
}


export const OrdersListComponent = {
  controller: Ctrl,
  bindings: {
    'onClick' : '&',
    'filter': '<',
    'filters': '<'
  },
  template: `
  <style>
    orders-list md-list-item .md-no-style.md-button {
      text-align: right;
    }
    orders-list md-list-item .md-list-item-inner > md-checkbox {
      margin-right:0;
      margin-left: 20px;
    }
    md-list-item, md-list-item .md-list-item-inner {
      padding: 0;
    }

    .md-datepicker-triangle-button.md-button.md-icon-button {
      right: auto;
    }
  </style>
   <md-toolbar class="md-warn">
      <div class="md-toolbar-tools">
      <h2 class="md-flex">
        הזמנות
        <strong>{{$ctrl.filters[$ctrl.filter].title}}</strong>
      </h2>
    </div>
  </md-toolbar>

  <md-content flex layout-padding>
    <md-list>    
      <md-list-item ng-repeat="order in $ctrl.orders" ng-click="$ctrl.onClick({order})">
        <p flex>{{order.name}}</p>
        <p flex>{{order.start}} | {{order.end}}</p>
        <md-icon ng-hide="$ctrl.hideEdit">mode_edit</md-icon>
      </md-list-item>

      <md-list-item ng-hide="$ctrl.orders.length">
        לא נמצאו הזמנות
      </md-list-item>
    </md-list>
  </md-content> 
  `
}