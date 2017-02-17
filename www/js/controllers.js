angular.module('starter.controllers', [])
  .config(function ($httpProvider) { //统一配置设置
    //服务注册到$httpProvider.interceptors中  用于接口授权
    $httpProvider.interceptors.push('MyInterceptor');
    /* $httpProvider.defaults.headers.common['Authorization'] = localStorage.getItem('token');*/
    /*    $http.defaults.cache = true/false;*/
  })


  //APP首页面
  .controller('MainCtrl', function ($scope, $rootScope, CommonService,WeiXinService) {
    //扫一扫
    $scope.barcodeScanner = function () {
      CommonService.barcodeScanner();
    }
    //确认支付
    $scope.affirmPay = function (choice) {
      if (choice== "A") {//微信支付
        CommonService.platformPrompt("微信支付","close");
        WeiXinService.getweixinPayData().success(function (data) {
          WeiXinService.weixinPay(data);
        })
      } else if (choice == "B") {//支付宝支付
        CommonService.platformPrompt("支付宝支付","close");
        window.alipay.pay({
          tradeNo: new Date().getTime(),
          subject: "测试标题",
          body: "我是测试内容",
          price: 0.01,
          notifyUrl: "http://your.server.notify.url"
        }, function(successResults){alert(successResults)}, function(errorResults){alert(errorResults)});
      }

    }
  })


