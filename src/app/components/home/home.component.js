class HomeCtrl {
  constructor ( $firebaseObject, $filter ) {
    'ngInject';
    
    console.log('Home Compoennet');
    this._$firebaseObject = $firebaseObject;
    this._$filter = $filter;
  }
 
  $onInit() {
    this.model = {
      email: null,
      name: null,
      start: null,
      end: null
    }

    this.today = new Date();
    this.success = false;
  }
  

  prodChange(products) {
    this.products = products;
  }
  getDataObj() {

    let data = Object.assign({}, this.model);
    data.status = 0;
    data.end = this._$filter('date')( data.end, 'd/M/yyyy');
    data.start = this._$filter('date')( data.start, 'd/M/yyyy');
    data.products = this.products.map( product => {
      return {
        title: product.title,
        id: product.$id
      }
    });


    return data;

  }
  submit() {
    console.log('Submit', this.apply);

    this.apply.$setDirty();

    if( this.apply.$invalid) {
      return;
    }

    var ref = firebase.database().ref('orders').push();
    var obj = this._$firebaseObject(ref);

    
    obj.$loaded().then(
      x => {
        x.$value = this.getDataObj();
        obj.$save().then(
          () => this.success = true
        );
      }
    )
  }
}


export const HomeComponent = {
  controller: HomeCtrl, 
  template: `

<div layout="row" layout-padding layout-wrap layout-margin ng-cloak layout-align="space-around">
  <div class="padded" md-whiteframe="20" flex="100" flex-gt-sm="70" layout="column" layout-align="center center">
    <md-content ng-hide="$ctrl.success">
      <form name="$ctrl.apply" layout-padding ng-submit="$ctrl.submit()">
        
        <div layout="row" layout-align="space-between center">
        
          <md-input-container class="md-icon-float">
            <label>שם</label>
            <md-icon>person</md-icon>
            <input ng-model="$ctrl.model.name" name="name" type="text" required>
            <div ng-messages="$ctrl.apply.name.$error">
              <div ng-message="required">יש להזין שם</div>
            </div>
          </md-input-container>

          <md-input-container>
            <label>דואל</label>
            <md-icon>email</md-icon>
            <input ng-model="$ctrl.model.email" name="email" type="email" required>
            <div ng-messages="$ctrl.apply.email.$error">
              <div ng-message="required">יש להזין דואל</div>
              <div ng-message="email">דואל לא תקין</div>
              <div ng-message="pattern">דואל לא תקין</div>
            </div>
          </md-input-container>
        </div>

        <div layout="row" layout-align="space-between center">  
          <div flex>
            <md-datepicker ng-model="$ctrl.model.start" md-placeholder="תאריך התחלה" md-min-date="$ctrl.today" required></md-datepicker>
          </div>

          <div flex>
            <md-datepicker ng-model="$ctrl.model.end" md-placeholder="תאריך סיום" md-min-date="$ctrl.model.start" required></md-datepicker>
          </div>
        </div>

      </form>

      <products-list on-change="$ctrl.prodChange(products)" hide-edit="true"></products-list>
      
      <md-button class="md-raised md-primary" ng-click="$ctrl.submit()" >שליחה</md-button>
    </md-content>
    <md-content ng-show="$ctrl.success">
      <h1>הזמנתך התקבלה.</h1>
      <p>יש לקחת בחשבון שיש אפשרות שלא כל הפריטים יהיו זמינים.</p>
      <md-button class="md-primary" ng-click="$ctrl.$onInit()">הזמנה נוספת</md-button>

    </md-content>
  </div>  
</div>  

  <pre dir="ltr" style="text-align: left; display: none;" >  
  {{$ctrl.model | json}}
  {{$ctrl.products | json}}
  <pre>
  `
}