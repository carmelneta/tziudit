class Ctrl {
  constructor ( $firebaseArray, $state ) {
    'ngInject';
    
    console.log('List Compoennet');

    this._$firebaseArray = $firebaseArray;
    this._$state = $state;

    this.views = [
      { title: 'הזמנות', name: 'orders' },
      { title: 'ניהול מלאי', name: 'products' }
    ];
  }
 
  $onInit() {
 
    var ref = firebase.database().ref().child("products");   
    this.products = this._$firebaseArray(ref);
    this.view = 0;
  }
  
  viewChange() {
    this._$state.go( 'main.admin.manage.' + this.views[this.view].name);
  }

}


export const ManangeComponent = {
  controller: Ctrl,
  template: `
  <md-content class="">
    <md-tabs class="md-accent" md-stretch-tabs md-selected="$ctrl.view"> 
      <md-tab ng-repeat="view in $ctrl.views" label="{{view.title}}" md-on-select="$ctrl.viewChange()"></md-tab>  
    </md-tabs>
    
    <ui-view flex></ui-view>
  </md-content>
 
  `
}