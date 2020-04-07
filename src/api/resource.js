import request from '@/utils/request'

export function getStatistic() {
  return request({
    url: '/resouce/statistic',
    method: 'get'
  })
}
export function getStatistic_Detail() {
  return request({
    url: '/resouce/sta_detaill',
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
