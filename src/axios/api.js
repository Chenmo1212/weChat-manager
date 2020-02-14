import {api1, api2} from "./fetch";

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
  return api2.post('/wxpy/material', params)
}

// 获取关键词列表
export function getKeywordLists() {
  return api2.get('/keyword/get')
}

// 添加关键词
// item 就是去掉row的关键词json
export function addKeywords(item) {
  let data = {item};
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase()
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api2.post('/keyword/insert', params)
}

// 删除关键词
export function delKeywords(id) {
  let data = {id};
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase();
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api2.post('/keyword/del', params)
}

// 更新关键词
export function updateKeywords(id, keywords, content, news) {
  let data = {id, keywords, content, news};
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase();
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api2.post('/keyword/update', params)
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
