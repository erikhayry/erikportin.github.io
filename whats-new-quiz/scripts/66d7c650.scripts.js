"use strict";angular.module("whatsNewQuizApp",["ngRoute"]).config(["$routeProvider","$locationProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"GameCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("whatsNewQuizApp").controller("GameCtrl",["$scope","$route","$timeout","$location","$window","gameFactory",function(a,b,c,d,e,f){function g(){return Math.random()<.5?f.getRandomDesigner(a.products[0].manufacturer,n.designers):a.products[0].manufacturer}function h(){a.isLoading=!0,e.ga("send","event","gameActions","start new round"),a.isGameOver=!1,a.lives=[1,2,3],c(function(){a.result=""},o),m=0,f.buildGame().then(function(b){a.version=b.version,a.isLoading=!1,n=b;for(var c=0;5>c;c++)n.products[m+c]&&(a.products[c]=n.products[m+c]);a.question=g(),a.score=m,a.total=n.products.length})}function i(){c(function(){a.result=""},o),m++,a.score=m,a.products.splice(0,1),m<a.total?(n.products[m+5]&&a.products.push(n.products[m+5]),a.question=g()):l()}function j(){return a.result="right",c(function(){i()},o),!0}function k(){return a.result="wrong",a.lives.splice(0,1),0==a.lives.length?(e.ga("send","event","gameActions","game over","",a.score),c(function(){a.isGameOver=!0},o),!1):(c(function(){i()},o),!1)}function l(){e.ga("send","event","gameActions","success"),a.result="",a.isGameOver=!0}var m,n=[],o=1e3;a.isLoading=!0,a.showHelp=!1,a.isGameOver=!1,a.products=[],a.lives=[1,2,3],h(),a.checkAnswer=function(a,b,c){return a===b===c?j():k()},a.restart=function(){h()},a.reload=function(){location.reload()},a.htmlEncode=function(a){return String(a).replace("&amp;","&").replace("&quot;",'"').replace("&#39;","'")},a.toggleHelp=function(){a.showHelp=!a.showHelp},a.pluralize=function(a){return 1==a?"point":"points"},a.getUrl=function(){return d.absUrl()},a.getClass=function(b){switch(b){case"help":return a.showHelp?"is-visible":"is-hidden";case"result":return"is-"+a.result}},a.getText=function(b){switch(b){case"help":return a.showHelp?"x":"?";case"result":return"right"===a.result?String.fromCharCode(10004):"x"}}}]),angular.module("whatsNewQuizApp").factory("productFactory",["$http",function(a){return{getProducts:function(){return a.get("./data/data.json")}}}]),angular.module("whatsNewQuizApp").factory("gameFactory",["$q","productFactory",function(a,b){function c(a){for(var b,c,d=a.length;0!==d;)c=Math.floor(Math.random()*d),d-=1,b=a[d],a[d]=a[c],a[c]=b;return a}function d(a,b){return Math.floor(Math.random()*(b-a+1))+a}function e(a){var b=[];return a.forEach(function(a){-1===b.indexOf(a.manufacturer)&&b.push(a.manufacturer)}),b}function f(){var d=a.defer();return b.getProducts().success(function(a){var b={designers:e(a.products),products:c(a.products),version:a.version};d.resolve(b)}),d.promise}return{buildGame:function(){return f()},getRandomDesigner:function(a,b){for(var c=a;a===c;)c=b[d(0,b.length-1)];return c}}}]),angular.module("whatsNewQuizApp").directive("wnqDraggable",["$document","$window",function(){return navigator.vibrate=navigator.vibrate||navigator.webkitVibrate||navigator.mozVibrate||navigator.msVibrate,{restrict:"E",scope:{product:"=",result:"=",hasTouch:"=",leftAfter:"&wnqDraggableLeftAfter",rightAfter:"&wnqDraggableRightAfter"},replace:!0,template:'<div class="m-image"><img/><button ng-click="rightAfter()" ng-show="!result" class="m-image-true">&#10004</button><button ng-click="leftAfter()" ng-show="!result" class="m-image-false">x</button></div>',link:function(a,b){function c(a){k={x:a.changedTouches[0].pageX}}function d(b){if(b.preventDefault(),!a.result){var c=b.changedTouches[0].pageX-k.x;h&&i&&(0>c?(h.style.opacity=Math.abs(.01*c),h.style.marginLeft=Math.abs(.5*c)+"px",i.style.opacity=0,i.style.marginRight=0):c>0&&(i.style.opacity=Math.abs(.01*c),i.style.marginRight=Math.abs(.5*c)+"px",h.style.opacity=0,h.style.marginLeft=0)),this.style.left=c+"px"}}function e(b){if(!a.result){var c=b.changedTouches[0].pageX-k.x,d=100,e=!0;c>d?a.$apply(function(){e=a.rightAfter()}):-d>c&&a.$apply(function(){e=a.leftAfter()}),e||navigator.vibrate&&navigator.vibrate(500),this.style.left=0,i&&h&&(i.style.opacity=0,h.style.opacity=0,i.style.marginRight=0,h.style.marginLeft=0)}}var f=new Image,g=b[0].querySelectorAll("img")[0],h=b[0].querySelectorAll(".m-image-false")[0],i=b[0].querySelectorAll(".m-image-true")[0],j="http://cache.net-a-porter.com/images/products/"+a.product+"/"+a.product;f.onload=function(){g.src=j+"_e1_xl.jpg"},f.onerror=function(){g.src=j+"_in_xl.jpg"},g.src=j+"_in_xl.jpg";var k=null;g.addEventListener("touchstart",c),g.addEventListener("touchmove",d),g.addEventListener("touchend",e)}}}]),angular.module("whatsNewQuizApp").directive("wngDetect",["$rootScope",function(a){return{restrict:"A",link:function(b,c){"ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0?(c[0].classList.add("has-touch"),a.hasTouch=!0):a.hasTouch=!1}}}]),angular.module("whatsNewQuizApp").directive("twitter",[function(){return{link:function(a,b,c){setTimeout(function(){twttr.widgets.createShareButton(document.URL,b[0],function(){},{count:"none",text:c.text})})}}}]);