class Ctrl {
  constructor ( $firebaseArray, $firebaseObject ) {
    'ngInject';
    this._$firebaseArray = $firebaseArray;
    this._$firebaseObject = $firebaseObject;
  }
 
  $onInit() { } 

  save() {
    this.product.$save().then(

      () => {
        //  After Save, If its creating mode, lets add another one
        if( this.productId === 'new') {
          this.$onChanges({
            productId : {
              currentValue : 'new'
            }
          });
        }
      }
    );


  } 

  delete() {
    this.product.$remove().then(
      //  After Delete, Remove Form display
      () => this.productId = null
    );
  }
  $onChanges(change) {    

    var base = firebase.database().ref().child("products"),
        ref;

    //  Editing Or Creating?
    if( change.productId.currentValue === 'new') {
      ref = base.push();    
    }else {
      ref = base.child(this.productId);
    }
    
    
    this.product = this._$firebaseObject(ref);
    
    // this.product.$loaded().then( x => console.log(x) );
  } 
}


export const EditProductComponent = {
  controller: Ctrl,
  bindings: {
    'productId': '<'
  },
  template: `
  <style> 
  </style>
   <md-toolbar class="md-warn">
      <div class="md-toolbar-tools">
      <h2 ng-show="$ctrl.productId !== 'new'" class="md-flex">עריכת פריט: {{$ctrl.product.title}}</h2>
      <h2 ng-show="$ctrl.productId === 'new'" class="md-flex">הוספת פריט</h2>
    </div>
  </md-toolbar>

  <md-content flex layout-padding ng-if="$ctrl.productId">
    <form ng-submit="$ctrl.save()">
      <md-input-container class="md-block">
        <label>שם</label>
        <input ng-model="$ctrl.product.title">
      </md-input-container>
      <div layout="row" layout-align="space-between center">
      
      <md-button type="submit" class="md-primary md-raised">שמירה</md-button> 
      
      <md-button ng-click="$ctrl.delete()" ng-show="$ctrl.productId !== 'new'" class="md-warn md-raised">מחיקה</md-button>
    </form> 
  </md-content> 
  `
}