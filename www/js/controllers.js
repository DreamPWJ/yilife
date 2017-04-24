angular.module('starter.controllers', [])
  .config(function ($httpProvider) { //统一配置设置
    //服务注册到$httpProvider.interceptors中  用于接口授权
    $httpProvider.interceptors.push('MyInterceptor');
    /* $httpProvider.defaults.headers.common['Authorization'] = localStorage.getItem('token');*/
    /*    $http.defaults.cache = true/false;*/
  })


  //APP首页面
  .controller('MainCtrl', function ($scope, $rootScope, CommonService, WeiXinService) {

    var getRegistrationID = function () {
      window.plugins.jPushPlugin.getRegistrationID(onGetRegistrationID);
    };

    var onGetRegistrationID = function (data) {
      try {
        console.log("JPushPlugin:registrationID is " + data);

        if (data.length == 0) {
          var t1 = window.setTimeout(getRegistrationID, 1000);
        }
        localStorage.setItem("jPushRegistrationID", data)
      } catch (exception) {
        console.log(exception);
      }
    };
    window.setTimeout(getRegistrationID, 1000);
    //扫一扫
    $scope.barcodeScanner = function () {
      CommonService.barcodeScanner();
    }
    //确认支付
    $scope.affirmPay = function (choice) {
      if (choice == "A") {//微信支付
        CommonService.platformPrompt("微信支付", "close");
        WeiXinService.getweixinPayData().success(function (data) {
          WeiXinService.weixinPay(data);
        })
      } else if (choice == "B") {//支付宝支付
        CommonService.platformPrompt("支付宝支付", "close");
        window.alipay.pay({
          tradeNo: new Date().getTime(),
          subject: "测试标题",
          body: "我是测试内容",
          price: 0.01,
          notifyUrl: "http://your.server.notify.url"
        }, function (successResults) {
          alert(successResults)
        }, function (errorResults) {
          alert(errorResults)
        });
      }

    }
   //打开第三方url
    $scope.windowOpen = function () {
      CommonService.windowOpen("http://i.ys7.com/assets/deps/shipin7.apk")
    }
    $scope.openWeb = function () {
      cordova.ThemeableBrowser.open('http://118.123.168.19:8888/shouji/indexs', '_blank', {
        statusbar: {
          color: '#ffffffff'
        },
        toolbar: {
          height: 0,
          color: '#f0f0f0ff'
        },
        title: {
          color: '#003264ff',
          showPageTitle: true
        },
        backButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
        },
        forwardButton: {
          image: 'forward',
          imagePressed: 'forward_pressed',
          align: 'left',
          event: 'forwardPressed'
        },
        closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
        },
        customButtons: [
          {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
          }
        ],
        menu: {
          image: 'menu',
          imagePressed: 'menu_pressed',
          title: 'Test',
          cancel: 'Cancel',
          align: 'right',
          items: [
            {
              event: 'helloPressed',
              label: 'Hello World!'
            },
            {
              event: 'testPressed',
              label: 'Test!'
            }
          ]
        },
        backButtonCanClose: true
      }).addEventListener('backPressed', function (e) {
        alert('back pressed');
      }).addEventListener('helloPressed', function (e) {
        alert('hello pressed');
      }).addEventListener('sharePressed', function (e) {
        alert(e.url);
      }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function (e) {
        console.error(e.message);
      }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function (e) {
        console.log(e.message);
      });
    }

  })


