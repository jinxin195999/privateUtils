/**
 返回结果 200 但是含有错误信息的 JSON
 */
function isJsonError(code) {
    keywords = /"data": {"show": false}|"successful":false|"message":"参数不允许为空!"|"data":{"source":\[\]}|"data":\[\]|"data":0|"data":false|"data":null|"message":"rpc_500|"message":"rpc_404|"message":"没有操作权限!"|"message":"_tb_token_ is required."|"code":"PERMISSION_DENIED"|"code":"error_unknow"|"message":"csrf token is invalid."|"message":"Invalid order number"|"hasError":true|"message":"empty parameter"|"code":"error"|"errorMessage":"csrfToken check error"|"message":"csrf token is required."/i.test(code)
    return keywords ;
};

/**
 页面返回错误代码信息400/500/401/
 */
function isPageError(code){
    return code == '' || / jscontent="errorCode" jstcache="\d+"|diagnoseConnectionAndRefresh|dnserror_unavailable_header|id="reportCertificateErrorRetry"|400 Bad Request|403 Forbidden|404 Not Found|500 Internal Server Error|502 Bad Gateway|503 Service Temporarily Unavailable|504 Gateway Time-out/i.test(code);
}
/**
 页面跳转到icbu的登陆页面
 */
function isICBULoginPage(code){
    return code = /alibaba-login-box/i.test(code)
}
/**
 页面跳转到1688的登陆页面
 */
function isCBULoginPage(code){
    return code = /TPL_username_1/i.test(code)
}

function isLoginPage(site,code){
    if(site === 'icbu'){
        return isICBULoginPage(code) ;
    }else if(site == 'cbu'){
        return isCBULoginPage(code) ;
    }
}

/**
 自定义过滤关键字
 */
function userDefinedFilterError(code){
    var x=/We suggest you switch to a different payment method and try again|<body>404|您的PayPal账户信息已提交审核|HTB1oxpANpXXXXaIaFXX760XFXXXg.png|ERROR_INVLID_PARAM|>null<\/pre><\/body>|Service is unavailable|Sorry, page not found|Loading...|邵君测试公司/i.test(code)
    return x;
}
/**
 无权限关键字过滤
 */
function isPrivilegeError(code){
    var x=/申请失败，该客户已经申请|系统错误,当前页面无法打开|系统打酱油去啦，请联系管理员|您未授权访问本系统，请联系管理员|您的账号没有入驻一达通|失败原因: 参数异常|您所查看的页面未找到|NOT_MATCH_MOBILE_CASHIER|ERROR_INVLID_SIGN|The order does not match the user|您无权访问|您访问越界了，不能偷窥哦|您在使用一达通金融服务前，需完成以下操作|您没有权限|你无权限访问该页面|you are unable to complete the payment through this link at the present|this page cannot be located|该子账号目前没有使用自助操作平台的权限|邵君测试公司|您输入的网址在我们的网站上无法正常显示|您尚未开通权限，请开通此权限后再试|当前访问页面不存在|您没有权限访问该页面/i.test(code)
    return x;
}

function weakPrivilegeError(code){
    var x = /您的账号没有入驻一达通/i.test(code)
    return x
}

function hasPrivilageControl(code){
    return isJsonError(code) == false && isPageError(code) == false && isPrivilegeError(code) == false  && weakPrivilegeError(code) == false  && userDefinedFilterError(code) == false
}

exports.isJsonError = isJsonError
exports.isPageError = isPageError
exports.isICBULoginPage = isICBULoginPage
exports.isCBULoginPage = isCBULoginPage
exports.isLoginPage = isLoginPage
exports.userDefinedFilterError = userDefinedFilterError
exports.isPrivilegeError = isPrivilegeError
exports.weakPrivilegeError = weakPrivilegeError
exports.hasPrivilageControl = hasPrivilageControl
