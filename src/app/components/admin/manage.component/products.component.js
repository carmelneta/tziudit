class Ctrl {
  constructor ( $firebaseArray, $state ) {
    'ngInject';
    
    console.log('Products Compoennet');

    this._$firebaseArray = $firebaseArray; 
  }
 
  $onInit() {
 
    var ref = firebase.database().ref().child("products");   
    this.products = this._$firebaseArray(ref);
    this.editProduct = null;
  } 

  
  selectProduct(product) {
    // console.log(product);
    this.editProduct = product.$id;
  }

  add() {
    this.editProduct = 'new';
  }
}


export const ManangeProductsComponent = {
  controller: Ctrl,
  template: `
  <md-content class="">
  
    <md-toolbar class="md-menu-toolbar">
      <div class="md-toolbar-tools"> 
        <h2>
          <span>ניהול מלאי</span>
        </h2>
        <span flex></span>
        <md-button class="md-fab md-primary md-mini" aria-label="Favorite" ng-click="$ctrl.add()">
          <md-icon>add</md-icon>
        </md-button>
      </div>
    </md-toolbar>

    <div layout="row" layout-xs="column">
      <div flex>
        <products-list hide-select="true" on-click="$ctrl.selectProduct(product)"></products-list>
      </div>
      <div flex>
        <edit-product ng-if="$ctrl.editProduct" product-id="$ctrl.editProduct"></edit-product>
      </div>
    </div>
  </md-content> 
  `
}