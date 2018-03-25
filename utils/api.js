/**
 * 
 * API 调用配置文件
 */
'use strict';
// var HOST_URI = 'https://api.500px.com/v1/';
var HOST_URI = 'http://localhost:8080/';

//登录接口
var LOGIN = 'login';
//查询群组列表接口
var orgList = 'org/list';
//查询群组内容列表接口
var getCon= 'org/con/list';
//查询群组用户列表接口
var getUser= 'org/user/list';
//查询用户详情接口
var userDetail= 'user/detail';
//用户编辑个人信息infoFirst 第一步接口
var userEditFirst= 'user/edit/first';
//用户编辑个人信息infoSecond 第二步接口
var userEditSecond= 'user/edit/second';

//上传用户图片接口
var userImgUpload= 'user/img/upload';


var CKEY = 'pd67OURWTmXMy6X1E3DL5jmr9aBAZ9VLjZp4jLvz';

//登录验证URL
function _getLogin(){
  return HOST_URI + LOGIN;
}


//getOrg  URL
function _getOrgList(){
  return HOST_URI + orgList;
}

//get org con
function _getCon(){
  return HOST_URI + getCon;
}

//get org user
function _getUser(){
  return HOST_URI + getUser;
}

//get user detail
function _userDetail(){
  return HOST_URI + userDetail;
}

function _userEditFirst(){
  return HOST_URI + userEditFirst;
}

function _userEditSecond(){
  return HOST_URI + userEditSecond;
}

function _userImgUpload(){
    return HOST_URI + userImgUpload;

}

function _isNone(s){
  return s == '' || s == null || s == undefined;
}

module.exports = {
  getLogin: _getLogin,
  getOrgList:_getOrgList,
  getCon:_getCon,
  getUser:_getUser,
  userDetail:_userDetail,
  userEditFirst:_userEditFirst,
  userEditSecond:_userEditSecond,
  userImgUpload:_userImgUpload
};