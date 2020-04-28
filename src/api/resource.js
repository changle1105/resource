import request from '@/utils/request'

export function getStatistic() {
  return request({
    url: '/resource/statistic',
    method: 'get'
  })
}
export function getTypeList() {
  return request({
    url: '/resource/typelist',
    method: 'get'
  })
}
export function getStatistic_Detail() {
  return request({
    url: '/resource/sta_detaill', // 最终要被typelist接口替换掉
    method: 'get'
  })
}
export function getResourceList(query) {
  return request({
    url: '/resource/list',
    method: 'post',
    params: query
  })
}
export function getManageList(query) {
  return request({
    url: '/resource/manage_list',
    method: 'post',
    params: query
  })
}
export function getCollectList(query) {
  return request({
    url: '/resource/collect_list',
    method: 'post',
    params: query
  })
}
export function getHistoryList(query) {
  return request({
    url: '/resource/history_list',
    method: 'post',
    params: query
  })
}
export function getSubjectList(type_id) {
  return request({
    url: '/resource/statistic_subject',
    method: 'post',
    params: { type_id }
  })
}
export function getCourseList(query) {
  return request({
    url: '/resource/statistic_course',
    method: 'post',
    params: query
  })
}

export function getDetail(resource_id) {
  return request({
    url: '/resource/detail',
    method: 'post',
    params: { resource_id }
  })
}
export function deleteResource(query) {
  return request({
    url: '/resource/delete',
    method: 'post',
    params: query
  })
}
export function addResource(query) {
  return request({
    url: '/resource/add',
    method: 'post',
    params: query
  })
}
export function updateResource(query) {
  return request({
    url: '/resource/edit',
    method: 'post',
    params: query
  })
}
export function deleteCollect(collect_id) {
  return request({
    url: '/resource/delete_collect',
    method: 'post',
    params: { collect_id }
  })
}
export function addCollect(resource_id) {
  return request({
    url: '/resource/addCollect',
    method: 'post',
    params: { resource_id }
  })
}
export function directoryList() {
  return request({
    url: '/resource/directory_list',
    method: 'get'
  })
}
export function userList() {
  return request({
    url: '/resource/user_list',
    method: 'get'
  })
}
export function updateDirectory(query) {
  return request({
    url: '/resource/edit_directory',
    method: 'post',
    params: query
  })
}
