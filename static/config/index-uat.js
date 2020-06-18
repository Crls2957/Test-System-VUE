/**
 * 验收环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://192.168.238.131:9527/demo';
   window.SITE_CONFIG['baseUrl'] = 'http://localhost:8080/demo';
  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://47.98.151.93:8080/demo';

  // api接口请求地址
  //window.SITE_CONFIG['baseUrl'] = 'http://192.168.238.151:9001/demo';
  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
