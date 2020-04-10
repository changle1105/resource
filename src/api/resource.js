import request from '@/utils/request'

export function getStatistic() {
  return request({
    url: '/resouce/statistic',
    method: 'get'
  })
}
export function getTypeList() {
  return request({
    url: '/resouce/typelist',
    method: 'get'
  })
}
export function getStatistic_Detail() {
  return request({
    url: '/resouce/sta_detaill', // 最终要被typelist接口替换掉
    method: 'get'
  })
}
export function getResourceList(query) {
  return request({
    url: '/resouce/list',
    method: 'post',
    params: query
  })
}

export function getSubjectList(query) {
  return request({
    url: '/resouce/subjectlist',
    method: 'post',
    params: { query }
  })
}
export function getCourseList(query) {
  return request({
    url: '/resouce/courselist',
    method: 'post',
    params: { query }
  })
}

export function getDetail(query) {
  return request({
    url: '/resouce/detail',
    method: 'post',
    params: { query }
  })
}
export function deleteResource(query) {
  return request({
    url: '/resouce/delete',
    method: 'post',
    params: query
  })
}
export function addCollect(query) {
  return request({
    url: '/resouce/addCollect',
    method: 'post',
    params: { query }
  })
}
