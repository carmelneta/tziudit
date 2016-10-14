class Ctrl {
  constructor ( $firebaseArray ) {
    'ngInject';
    
    console.log('List Compoennet');

    this._$firebaseArray = $firebaseArray;
  }
 
  $onInit() {
    
  }
  
  
  $onChanges(change) {

    //  The Compoennet can be initiated with product list  
    let initProducts = change.products.currentValue;
        
    var ref = firebase.database().ref().child("products");   
    this.products = this._$firebaseArray(ref);

    //  Loop Active products list, set items to selected
    if(initProducts) {
      if(!this.showOthers) {
        this.products = initProducts;
        this.products.map(pr =>  pr.selected = true);
      }else {
        this.products.$loaded().then( products => {
          products.map(pr =>  pr.selected = initProducts.filter(p => p.id === pr.$id).length ? true : false );
        });
      }
    } 
  }

  change() {
    let products = this.products.filter( product => product.selected );
    this.onChange({products});
  }

  click(product) {
    this.onClick({product});
  }
}


export const ProductListComponent = {
  controller: Ctrl,
  bindings: {
    'onChange' : '&',
    'onClick' : '&',
    'hideSelect': '<',
    'hideEdit' : '<',
    'hidePrice' : '<',
    'title' : '<',
    'products': '<',
    'showOthers' : '<',
    'orderBy' : '<'
  },
  template: `
  <style>
    products-list md-list-item .md-no-style.md-button {
      text-align: right;
    }
    products-list md-list-item .md-list-item-inner > md-checkbox {
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
        <span ng-hide="$ctrl.title">פריטים להשאלה</span>
        <span>{{$ctrl.title}}</span>
      </h2>
    </div>
  </md-toolbar>

  <md-content flex layout-padding>
    <md-list>    
      <md-list-item ng-repeat="product in $ctrl.products | orderBy: $ctrl.orderBy" ng-click="$ctrl.click(product)">
        <md-checkbox ng-if="!$ctrl.hideSelect" ng-model="product.selected" ng-change="$ctrl.change()"></md-checkbox>
        <p>{{product.title}}</p>
        <md-icon ng-hide="$ctrl.hideEdit">mode_edit</md-icon>
        <small ng-hide="$ctrl.hidePrice">
          {{ product.price || 0 }} ₪
        </small>
      </md-list-item>
    </md-list>
  </md-content> 
  `
}