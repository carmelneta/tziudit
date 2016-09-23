export function Auth( $firebaseAuth ) {
  'ngInject'; 
  return $firebaseAuth()
}

export class UserServiceClass {
  constructor ( Auth, $firebaseObject, $firebaseArray ) {
    'ngInject';    
    this._Auth = Auth;
    this._$firebaseObject = $firebaseObject;
    this._$firebaseArray = $firebaseArray;

  }  

}