
export default [
  {
    url: '/resouce/info',
    type: 'get',
    response: config => {
      const token = config.body
      console.log(token)
      if (!token) {
        return {
          code: 5008,
          data: {}
        }
      }
      return {
        code: 20000,
        data: {
          'username': 'admin',
          'role-id|1': '00',
          'role-name': 'admin',
          'roles': ['admin']
        }
      }
    }
  },
  {
    url: '/resouce/statistic',
    type: 'get',
    response: config => {
    // const type = config.body
      return {
        'code': 20000,
        'data': {
          'files_num|1000-2000': 1,
          'visit_num|1000-2000': 1,
          'collect_num|1000-2000': 1,
          'type': 222
        }
      }
    }
  },
  {
    url: '/resouce/sta_detaill',
    type: 'get',
    response: config => {
      return {
        'code': 20000,
        'type': 111,
        'data': {
          'files|8': [
            {
              'type_id|5-6': '',
              'type_name': '@first',
              'number|100-1000': 1
            }
          ],
          'visits|8': [
            {
              'type_id|5-6': '',
              'type_name': '@first',
              'number|100-1000': 1
            }
          ],
          'collects|8': [
            {
              'type_id|5-6': '',
              'type_name': '@first',
              'number|100-1000': 1
            }
          ]
        }
      }
    }
  },
  {
    url: '/resouce/list',
    type: 'post',
    response: config => {
    // const type = config.body
      return {
        'code': 20000,
        'data': {
          'total': 100,
          'items|10': [
            {
              'resource_id|6-8': '',
              'resource_name': '@title(5, 10)',
              'course_id|6-8': '',
              'course_name': '@first',
              'type_id|6-8': '',
              'type_name': '@first',
              'subject_id|6-8': '',
              'subject_name': '@first',
              'upload_date': '@datetime',
              'description|6-8': '',
              'scan_count': '@integer(1, 100)',
              'collect_count': 10,
              'verifydate': '',
              'verify_user': '',
              'owner_id': '',
              'uploader_id': '',
              'uploader_name': '@first',
              'verify_advice': '',
              'download_count': 10,
              'ml_id': '',
              'collect_date': ''
            }
          ]
        }
      }
    }
  },
  {
    url: '/resouce/subjectlist',
    type: 'post',
    response: config => {
    // const type = config.body
      return {
        'code': 20000,
        'data': {
          'total': 0,
          'items|5': [
            {
              'subject_id': '@id',
              'subject_name': '@first',
              'number': '@integer(1,1000)'
            }
          ]
        }
      }
    }
  },
  {
    url: '/resouce/typelist',
    type: 'get',
    response: config => {
    // const type = config.body
      return {
        'code': 20000,
        'data': {
          'items|8': [
            {
              'type_id': '@id',
              'type_name': '@name',
              'file_number': '@integer(1,1000)',
              'visit_number': '@integer(1,1000)',
              'collect_number': '@integer(1,1000)'
            }
          ]
        }
      }
    }
  },
  {
    url: '/resouce/courselist',
    type: 'post',
    response: config => {
    // const type = config.body
      return {
        'code': 20000,
        'data': {
          'total': 0,
          'items|5': [
            {
              'course_id': '@id',
              'course_name': '@first',
              'number': '@integer(1,1000)'
            }
          ]
        }
      }
    }
  },
  {
    url: '/resouce/addCollect',
    type: 'post',
    response: config => {
    // const type = config.body
      return {
        'code': 20000,
        'data': 1
      }
    }
  },
  {
    url: '/resouce/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 1
      }
    }
  },
  {
    url: '/resouce/detail',
    type: 'post',
    response: config => {
    // const type = config.body
      return {
        'code': 20000,
        'data': {
          'resource_id': '@id',
          'resource_name': '@name',
          'cource_id': '@id',
          'cource_name': '@first',
          'type_id': '@id',
          'type_name': '@name',
          'subject_id': '@id',
          'subject_name': '@name',
          'upload_date': '@date',
          'description': '@string',
          'scan_count': '@integer(1,1000)',
          'collect_count': '@integer(1,1000)',
          'verify_date': '@date',
          'verify_user': '',
          'owner_id': '',
          'uploader_id': '',
          'uploader_name': '@first',
          'verify_advice': '',
          'download_count': '@integer(1,1000)',
          'ml_id': '',
          'appendix_list|3': [
            {
              'appendix_id': '@id',
              'filename': '@name',
              'filetype|1': [
                'txt',
                'doc',
                'mp4',
                'avi'
              ],
              'url': '@url'
            }
          ]
        }
      }
    }
  }
]
