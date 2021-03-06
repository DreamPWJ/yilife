// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.config', 'ngCordova'])

  .run(function ($ionicPlatform, $rootScope, $location, $ionicHistory, $cordovaToast, $cordovaNetwork, CommonService) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        //状态栏颜色设置
        if ($ionicPlatform.is('ios')) {
          StatusBar.styleDefault();
        }
        if ($ionicPlatform.is('android')) {
          StatusBar.backgroundColorByHexString("#FFFFFF");
        }

      }
      //hide splash immediately 加载完成立刻隐藏启动画面
      if (navigator && navigator.splashscreen) {
        setTimeout(function () { //延迟显示 让页面先加载 不显示不美观的加载过程
          navigator.splashscreen.hide();
        }, 500);

      }

      //主页面显示退出提示
      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();

        // Is there a page to go back to? 制定页面返回退出程序
        if ($location.path() == '/shouji/indexs') {
          if ($rootScope.backButtonPressedOnceToExit) {
            ionic.Platform.exitApp();
          } else {
            $rootScope.backButtonPressedOnceToExit = true;
            $cordovaToast.showShortCenter('再次按返回退出翼生活');
            setTimeout(function () {
              $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
          }

        } else if ($ionicHistory.backView()) {
          // Go back in history
          $ionicHistory.goBack();
        } else {
        }

        return false;
      }, 101);

      //判断网络状态以及横屏事件
      document.addEventListener("deviceready", function () {
        // listen for Online event
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
          var onlineState = networkState;
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
          var offlineState = networkState;
          //提醒用户的网络异常
          CommonService.platformPrompt("网络异常 无法连接翼生活服务器", 'close');
        })
        //添加JS 屏幕监听事件 禁止APP 横屏
        if (screenOrientation) {
          screenOrientation.setOrientation('portrait');
        }

      }, false);

      //打开外部网页
      if (window.cordova && window.cordova.InAppBrowser) {
        window.open = window.cordova.InAppBrowser.open;
      }

      //启动极光推送服务
      try {
        window.plugins.jPushPlugin.init();

      } catch (e) {
        console.log(e);
      }
      // System events
      document.addEventListener("resume", resume, false);
      function resume() {
        if (window.plugins.jPushPlugin.isPlatformIOS()) {
          window.plugins.jPushPlugin.setBadge(0);
          window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0);
        } else if (device.platform == "Android") {
          window.plugins.jPushPlugin.setLatestNotificationNum(3);
          window.plugins.jPushPlugin.clearAllNotification();
        }
      }

      //点击极光推送跳转到相应页面
      document.addEventListener("jpush.openNotification", function (data) {

      }, false)


      //调试模式，这样报错会在应用中弹出一个遮罩层显示错误信息
      //window.plugins.jPushPlugin.setDebugMode(true);

    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    /* 设置平台特性*/
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-left');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    //设置默认返回按钮的文字
    $ionicConfigProvider.backButton.previousTitleText(false).text('');

    //ion-content to have overflow-scroll='false'
    $ionicConfigProvider.scrolling.jsScrolling(false);
    //Checkbox style. Android defaults to square and iOS defaults to circle
    $ionicConfigProvider.form.checkbox('circle');
    //Toggle item style. Android defaults to small and iOS defaults to large.
    $ionicConfigProvider.form.toggle('large');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
    /*      .state('tab', {
     url: '/tab',
     abstract: true,
     templateUrl: 'templates/tabs.html'
     })*/

    // Each tab has its own nav history stack:

    //APP首页面
    /*      .state('tab.main', {
     url: '/main',
     views: {
     'tab-main': {
     templateUrl: 'templates/main.html',
     controller: 'MainCtrl'
     }
     }
     })*/

    // if none of the above states are matched, use this as the fallback
    // $urlRouterProvider.otherwise('/tab/main');

  });
