class Ctrl {
  constructor ( $firebaseArray, $firebaseObject ) {
    'ngInject';
    this._$firebaseArray = $firebaseArray;
    this._$firebaseObject = $firebaseObject;
    
  }
 
  $onInit() {    } 

  save() {
    this.order.$save().then();
  } 

  delete() {
    this.order.$remove().then(
      //  After Delete, Remove Form display
      () => this.id = null
    );
  }

  updateStatus($index) {
    this.order.status = $index;
    this.order.$save();
  }

  $onChanges(change) {    

    var ref = firebase.database().ref().child("orders").child(this.id);
        
    this.order = this._$firebaseObject(ref);
    
    // this.product.$loaded().then( x => console.log(x) );
  } 
}


export const EditOrderComponent = {
  controller: Ctrl,
  bindings: {
    'id': '<',
    'statuss': '<'
  },
  template: `
  <style> 
  </style>
   <md-toolbar class="md-warn">
      <div class="md-toolbar-tools">
      <h2 ng-show="$ctrl.productId !== 'new'" class="md-flex">עריכת השאלה: {{$ctrl.order.name}}</h2>
    </div>
  </md-toolbar>

  <md-content flex layout-padding ng-if="$ctrl.id">
    <form ng-submit="$ctrl.save()">
      
      <p flex>{{$ctrl.order.start}} | {{$ctrl.order.end}}</p>


      <div layout="row" layout-align="space-between center">
      
        <md-menu md-position-mode="target-right target" >
          סטאטוס: {{$ctrl.statuss[$ctrl.order.status].title}}
          <md-button class="md-raised" ng-click="$mdOpenMenu($event)">
             עדכן
          </md-button>
          <md-menu-content width="4" >
            <md-menu-item ng-repeat="status in $ctrl.statuss">
              <md-button ng-click="$ctrl.updateStatus($index)">
                  <div layout="row" flex>
                    <p flex>{{status.title}}</p>
                  </div>
              </md-button>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
        <md-button ng-click="$ctrl.delete()" class="md-warn md-raised">מחיקה</md-button>

      </div>
    </form>

    <products-list ng-if="$ctrl.order.products" hide-select="true" hide-edit="true" products="$ctrl.order.products" title="'פריטים'"></products-list> 
  </md-content> 
  `
}