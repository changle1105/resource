import request from '@/utils/request'

export function getStatistic() {
  return request({
    url: '/mostech/statistic',
    method: 'get'
  })
}
export function getCourseList(dept_name) {
  return request({
    url: '/mostech/courseList',
    method: 'get',
    params: { dept_name }
  })
}
export function getList(query) {
  return request({
    url: '/mostech/list',
    method: 'post',
    params: query
  })
}
export function getDeptList() {
  return request({
    url: '/mostech/deptList',
    method: 'get'
  })
}
