/**
 * Created by pwj on 2017/26/17.
 * 系统接口常量配置
 */
var configMod = angular.module("starter.config", []);

configMod.constant("YiLife", {
  'name': 'YiLife', //项目名称
  'debug': false, //调试标示 暂无使用
  'api': 'http://a.yilife.com',//接口服务地址  使用
  'siteUrl': 'http://a.yilife.com',//仓库地址 暂无使用
  'imgUrl': 'http://f.yilife.com',//图片地址 暂无使用
  'mobApi': 'http://m.yilife.com',//手机端服务  使用（分享链接展示等调用）
  'version': '1.0.0' //当前版本号
});

