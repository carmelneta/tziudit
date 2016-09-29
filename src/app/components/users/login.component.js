class Ctrl {
  constructor ( $firebaseArray, Auth, $firebaseAuth ) {
    'ngInject';
    
    console.log('Login Compoennet');
    this._Auth = Auth;
    this.user = {
      email: null,
      password: null
    }

    this.backErrMsgs = {
      'auth/user-not-found' : 'לא קיים משתמש עם הדוא"ל הזה',
      'auth/invalid-email': 'דוא"ל לא תקין',
      'auth/wrong-password': 'סיסמה לא נכונה'
    }
    this.activeUser = null;
    Auth.$onAuthStateChanged( firebaseUser => this.activeUser = firebaseUser );

  }

  login() {
    this._Auth.$signInWithEmailAndPassword(this.user.email, this.user.password);
  }
 
  register() {
    this._Auth.$createUserWithEmailAndPassword(this.user.email, this.user.password);
  }

  $onInit() {
    
  }
  
  
  $onChanges() {
 
  } 
}


export const LoginComponent = {
  controller: Ctrl,
  bindings: {  },
  template: ` 
    <style> 
    #login-component {
      min-height: calc(100% - 100px); 
    }
    #login-component md-input-container { 
      width : 100%;
    }
    </style>
    <md-content layout-padding layout="row" layout-align="center center" id="login-component">
      <md-whiteframe class="md-whiteframe-24dp" flex-sm="45" flex-gt-sm="35" flex-gt-md="25" layout="column" layout-align="center center"  ng-if="!$ctrl.activeUser">
        <form ng-submit="$ctrl.login()" name="$ctrl.form" novalidate>
          <div class="md-block"> 

            <md-input-container>
              <label>דוא"ל</label>
              <input ng-model="$ctrl.user.email" name="email" type="email" required>
              
              <div ng-messages="$ctrl.form.email.$error" role="alert">
                <div ng-message="required">יש להזין אימייל</div>
                <div ng-message="email">אימייל לא תקין</div>
              </div>
            </md-input-container>

            <md-input-container>
              <label>ססימא</label>
              <input ng-model="$ctrl.user.password" name="password" type="password" required>
              
              <div ng-messages="$ctrl.form.password.$error" role="alert">
                <div ng-message="required">יש להזין סיסמא</div>
              </div>

            </md-input-container>

          </div>
        </form>
        
        <div layout="row" layout-align="space-between center">
          {{$ctrl.backErrMsgs[$ctrl.backErr]}} 
        </div>

        <div layout="row" layout-align="space-between center" style="width:100%;">
          <md-button ng-click="$ctrl.login()"    ng-disabled="$ctrl.form.$invalid" class="md-raised md-warn">כניסה</md-button>
          <md-button ng-click="$ctrl.register()" ng-disabled="$ctrl.form.$invalid" class="md-raised md-primary">הרשמה</md-button>
        </div>
    </md-whiteframe>
    
    <md-whiteframe class="md-whiteframe-24dp" flex-sm="45" flex-gt-sm="35" flex-gt-md="25" layout="column" layout-align="center center" ng-if="$ctrl.activeUser">
      <p>משתמש רשום</p>
    </md-whiteframe>
  </md-content> 
  
  `
}