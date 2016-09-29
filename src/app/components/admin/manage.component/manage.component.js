class Ctrl {
  constructor ( $firebaseArray, $state ) {
    'ngInject';
    
    console.log('List Compoennet');

    this._$firebaseArray = $firebaseArray;
    this._$state = $state;

    this.views = [
      { title: 'הזמנות', name: 'main.admin.manage.orders' },
      { title: 'ניהול מלאי', name: 'main.admin.manage.products' },
      { title: 'טבלת שליטה', name: 'main.admin.manage.control' },
    ];

  }
 
  $onInit() {
 
    var ref = firebase.database().ref().child("products");   
    this.products = this._$firebaseArray(ref);

    this.view = this._$state.$current.name;
    if(this._$state.$current.name === 'main.admin.manage') {
      this.view = 2;
    }

  }
  
  viewChange() {
    this._$state.go( this.views[this.view].name );
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