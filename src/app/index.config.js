export function config ($logProvider, $mdThemingProvider, $mdDateLocaleProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);


  $mdDateLocaleProvider.formatDate = function(date) {
    if(!date) { return ''; }
    return  date.getDate() + '/' + ( date.getMonth() +1 )  + '/' + date.getFullYear();
  };

  
}
