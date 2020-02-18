import {api} from "./fetch";

// api.js
// 签名算法
// cnpm install crypto-js -s
var CryptoJS = require("crypto-js");


// 获取素材列表
export function getArticleLists(type, offset, count) {
  const data = {type, offset, count};
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase()
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api.post('/wxpy/material', params)
}

// 获取关键词列表
export function getKeywordLists() {
  return api.get('/keyword/get')
}

// 添加关键词
// item 就是去掉row的关键词json
export function addKeywords(item) {
  let data = {item};
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase()
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api.post('/keyword/insert', params)
}

// 删除关键词
export function delKeywords(id) {
  let data = {id};
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase();
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api.post('/keyword/del', params)
}

// 更新关键词
export function updateKeywords(item) {
  let data = {item};
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase();
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api.post('/keyword/update', params)
}


// 上传添补excel
export function addExcel(file) {
  let param = new FormData();
  param.append('excel', file);
  return api.put('/excel/add', param, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 上传重置excel
export function resetExcel(file) {
  let param = new FormData();
  param.append('excel', file);
  return api.put('/excel/reset', param, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}

// 获取关键词列表
export function downloadExcel() {
  return api.get('/excel/getaddr')
}

// 获取关键词列表
export function getToken() {
  return api.get('token?grant_type=client_credential&appid=wx2186b63dad75fd21&secret=26a895a874615a7c112d056cc1094a80')
}

// 获取关键词列表
export function getNewsList(TYPE, OFFSET, COUNT) {

  const key = localStorage.getItem("access_token");

  let params={
    "type":TYPE,
    "offset":OFFSET,
    "count":COUNT
  }

  return api.post('material/batchget_material?access_token=' + key, params)
}

