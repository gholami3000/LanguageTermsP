﻿// Initialize app
var myApp = new Framework7({
  material: true
  // domCache: true
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView(".view-main", {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

function MakeCall(e) {
  document.location.href = "tel:" + "09357144541";
}

var ToastOptions = {
  // Callback gets called when toast is hidden
  onHide: function() {
    console.log("hidden");
  },
  duration: 3000 // Hide toast after 2 seconds
};

// Handle Cordova Device Ready Event
$$(document).on("deviceready", function() {
  console.log("Device is ready!");

  getScope("MainAppId").getItem();

  document.addEventListener("backbutton", callbackFunction, false);
  // alert("backbutton");
  function callbackFunction() {
    if (mainView.activePage.name === "index") {
      myApp.modal({
        title: "خروج",
        text: "آیا می خواهید ازبرنامه  خارج شوید؟",
        buttons: [
          {
            text: "خروج از برنامه",
            onClick: function() {
              navigator.app.exitApp();
            }
          },

          {
            text: "بی خیال",
            onClick: function() {}
          }
        ]
      });
    } else if (mainView.activePage.name === "registerEdit") {
      RefreshMyList();
      mainView.router.back();
      //ajaxRequest.abort();
      myApp.hidePreloader();
    } else {
      mainView.router.back();
      //ajaxRequest.abort();
      myApp.hidePreloader();
    }
  }
});

var TermApp = angular.module("TermApp", []);
//var APP = APP || {};

function getScope(divId) {
  return angular.element(document.getElementById(divId)).scope();
}

function Compile(divId) {
  getScope(divId).compileDOM("#" + divId);
}

TermApp.controller("MainCtrl", function($scope, $compile, $http) {
  $scope.getItem = function() {
    myApp.showPreloader("لطفا کمی صبر کنید");

    $http({
      method: "GET",
      url: "http://www.ho3000.ir/mobile/Idioms//TermList"
      // headers: { 'Content-Type': undefined },
      //data:data
    }).then(
      function mySucces(response) {
        $scope.myData = response.data;
        console.log(response.data);
        myApp.hidePreloader();
      },
      function myError(error) {
        console.log(error);
        myApp.hidePreloader();
      }
    );
  };

  $scope.term = "";
  $scope.translate = "";
  $scope.tag = "";
  $scope.registerItem = function() {
    // alert();
    // $scope.term="hi";
    // $scope.translate="hi2";

    // var term=  angular.element('#term').val();
    //var translate= angular.element('#translate').val();
    //alert(term);
    myApp.showPreloader("لطفا کمی صبر کنید");

    $http({
      method: "post",
      url: "http://www.ho3000.ir/mobile/Idioms/Create",
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      // headers: { 'Content-Type': application/json },
      data: { term: $scope.term, translate: $scope.translate,tag: $scope.tag }
    }).then(
      function mySucces(response) {
//alert(response.data.Success);
        if (response.data.Success==true) {
          var toast = myApp.toast(response.data.Message, "", ToastOptions);
          toast.show();
          $scope.term = "";
          $scope.translate = "";
          $scope.tag = "";

        } else {
          var toast = myApp.toast("لطفا دوباره سعی کنید", "خطا", ToastOptions);
          toast.show();
        }
        myApp.hidePreloader();
      },
      function myError(error) {
        console.log(error);
        myApp.hidePreloader();
      }
    );
  };

  $scope.compileDOM = function($el) {
    $compile($el)($scope);
    $scope.$apply();
  };
  //$scope.compile = function () {
  //    //  $scope.items.push({ name: 'item ' + (new Date().getTime()) });
  //    $scope.compileDOM("#dest");
  //};
});

function LoadNewContent(divId) {
  $("#dest").html(
    '<p>Name : <input type="text" ng-model="family"></p><h1>Hello {{family}}</h1>'
  );
  getScope(divId).compileDOM("#" + divId);

  // angular.element('#dest').scope().compileDOM("#dest");
} //

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit("registerTerm", function(page) {
  // Do something here for "about" page
  // getScope("TermAppContainer").apply();
});

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on("pageInit", function(e) {
  // $scope.digest();

  // Get page data from event data
  var page = e.detail.page;

  if (page.name === "registerTerm") {
    // Following code will be executed for page with data-page attribute equal to "about"
    // myApp.alert('Here comes About page');
    //$("#compile").trigger("click");
  }
});

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on("pageInit", '.page[data-page="registerTerm"]', function(e) {
  //کامپایل دوباره DOM
  //کامپایل بر اساس id
  Compile("frmRegister");
});

//$("#registerTerm").on("click", function () {
//       mainView.router.loadPage('registerTerm.html');
//});

//var termApp = angular.module("TermApp", ['ngValidate']);

//var termApp = angular.module("TermApp", []);
//termApp.directive('dynamic', function ($compile) {
//    return {
//        restrict: 'A',
//        replace: true,
//        link: function (scope, ele, attrs) {
//            scope.$watch(attrs.dynamic, function (htmlvar) {
//                ele.html(htmlvar);
//                $compile(ele.contents())(scope);
//            });
//        }
//    };
//});

//function MainController($scope, $http) {
////$scope.getItem = function () {
////            myApp.showPreloader("لطفا کمی صبر کنید");

////            $http({
////                method: "GET",
////                url: "http://www.gholami3000.com/Translate/Api/TermList",
////                // headers: { 'Content-Type': undefined },
////                //data:data
////            }).then(function mySucces(response) {
////                $scope.myData = response.data;
////                console.log(response.data);
////                myApp.hidePreloader();
////            }, function myError(error) {
////                console.log(error);
////                myApp.hidePreloader();
////            });
////        }

//$scope.htmlvar = '';

//    $(document).on('click', '#compile', function () {

//        alert("click");
//        $scope.htmlvar = $("#appDiv").html();
//        $scope.$digest();

//    });

//}

//termApp.controller('MainController', function ($scope, $http) {
//    $scope.getItem = function () {
//        myApp.showPreloader("لطفا کمی صبر کنید");

//        $http({
//            method: "GET",
//            url: "http://www.gholami3000.com/Translate/Api/TermList",
//            // headers: { 'Content-Type': undefined },
//            //data:data
//        }).then(function mySucces(response) {
//            $scope.myData = response.data;
//            console.log(response.data);
//            myApp.hidePreloader();
//        }, function myError(error) {
//            console.log(error);
//            myApp.hidePreloader();
//        });
//    }

//});
