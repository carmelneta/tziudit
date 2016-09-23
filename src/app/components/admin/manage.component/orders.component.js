class Ctrl {
  constructor ( $firebaseArray, $state ) {
    'ngInject';
    
    console.log('Orders Compoennet');

    this._$firebaseArray = $firebaseArray;

    this.filters = [
      {title: 'עתידיות', status: 'open'},
      {title: 'בהשאלה', status: 'live'},
      {title: 'חזר', status: 'close'},
    ];
    
   this.filter = 0;
  //  this.activeOrder = '-KSLqQ31CwXBX61yA_ee';
  }

 
  $onInit() {
 
    var ref = firebase.database().ref().child("orders");   
    this.products = this._$firebaseArray(ref);
  } 

  ch(order) {
    console.log(order);
  }

}


export const ManangeOrdersComponent = {
  controller: Ctrl,
  template: `
 
  <md-content class="">
  
    <md-toolbar class="md-menu-toolbar">
      <div class="md-toolbar-tools"> 
        <h2>
          <span>ניהול הזמנות</span>
        </h2>
        <span flex></span>
        <md-button class="md-primary " ng-repeat="filter in $ctrl.filters"  ng-click="$ctrl.filter = $index">
          {{filter.title}}
        </md-button>
      </div>
    </md-toolbar>

    <div layout="row" layout-xs="column">
      <div flex>
        <orders-list filters="$ctrl.filters" filter="$ctrl.filter" on-click="$ctrl.activeOrder = order.$id"></orders-list>
      </div>
      <div flex>
        <edit-order ng-if="$ctrl.activeOrder" id="$ctrl.activeOrder" statuss="$ctrl.filters"></edit-product>
      </div>
    </div>
  </md-content> 
  `
}