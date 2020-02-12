import {api} from "./fetch";

// api.js
// 签名算法
// cnpm install crypto-js -s
var CryptoJS = require("crypto-js");


// 获取token
export function getToken() {
  //获取token
  const key = "wx2186b63dad75fd21" + "&secret=" + "26a895a874615a7c112d056cc1094a80";

  return api.get('/token?grant_type=client_credential&appid=' + key )
}

// 获取素材总数
export function getArticleCount() {
  //获取token
  const token = localStorage.getItem('token');

  return api.get('/material/get_materialcount?access_token=' + token)
}

// 获取素材总数
export function getArticleLists(type, offset, count) {
  //获取token
  const token = localStorage.getItem('token');

  const form = {
    "type": type,
    "offset":offset,
    "count": count
  };

  return api.post('/material/batchget_material?access_token=' + token, form)
}

// 获取关键词列表（获取整个列表）
export function getKeywordLists() {
  return api.get('/keyword/get')
}

// 添加关键词
// item 就是去掉row的关键词json
export function addKeywords(item) {
  let data = { item }
  data.sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g, "'")).toString().toUpperCase()
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api.post('/keyword/insert', params)
}

// index 就是关键词的index
export function delKeywords(id) {
  let data = { id }
  let sign = CryptoJS.MD5(JSON.stringify(data).replace(/\"/g,"'")).toString().toUpperCase();
  data.sign = sign
  let params = new URLSearchParams();
  params.append('data', JSON.stringify(data));
  return api.post('/keyword/del', params)
}

// 上传新的关键词列表（excel格式）
export function uploadNewKeyowordsLists(file) {   // file excel文件
  return api.post('', file)
}

// 下载新的关键词列表（返回excel文件格式）
export function downloadNewKeyowordsLists() {
  return api.get('')
}
