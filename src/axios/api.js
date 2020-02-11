import {api} from "./fetch";

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
