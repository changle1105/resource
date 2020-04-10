<template>
  <div style="margin:0px;padding:0px;display:inline;">
    <el-button type="primary" size="mini" @click="showDetail(resourceId)">
      浏览
    </el-button>
    <el-dialog title="资源信息" :visible.sync="dialogFormVisible">
      <aside>{{ temp.resource_name }}（<a href="#" class="link-type" @click="addCollect(tem)">我要收藏</a>）</aside>

      <div v-for=" (item,index) in temp.appendix_list" :key="index">
        <p v-if="item!=null">
          <video
            v-if="item.filetype==='mp4'"
            id="myVideo"
            controls
            preload="auto"
            width="100%"
            height="100%"
          >
            <source
              src="https://video.xuexi.cn/video/1005/p/21e980f38db86f00f0f8b2c7877d4449-89be429986174b96b07fdc7fcc000bcc-2.mp4"
              type="video/mp4"
            >
          </video>
        </p>
      </div>
      <div v-for=" (item,index) in temp.appendix_list" :key="index+100">
        <p v-if="item!=null">
          <a v-if="item.filetype!='mp4'" class="link-type" :href="item.url">{{ item.filename }}.{{ item.filetype }}</a>
        </p>
      </div>
      <el-collapse>
        <el-collapse-item title="  其它信息" name="4">
          <div>上传者：{{ temp.uploader_name }}</div>
          <div>类型：{{ temp.type_name }}</div>
          <div>学科：{{ temp.subject_name }}</div>
          <div>所属目录或者课程：{{ temp.course_name }}</div>
          <div>上传时间：{{ temp.upload_date }}</div>
          <div>访问次数：{{ temp.scan_count }}</div>
          <div>收藏次数：{{ temp.collect_count }}</div>
          <div>资源描述：{{ temp.description }}</div>
        </el-collapse-item>
      </el-collapse>
      <div slot="footer" class="dialog-footer">
        <el-button class="pan-btn blue-btn" @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button class="pan-btn green-btn" @click="addCollect(resourceId)">
          收藏
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getDetail, addCollect } from '@/api/resource'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ShowResource',
  directives: { waves },
  props: {
    resourceId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      temp: {
        resource_id: undefined,
        resource_name: '',
        type_id: '',
        type_name: '',
        subject_id: '',
        subject_name: '',
        course_id: '',
        course_name: '',
        uploader_id: '',
        uploader_name: '',
        description: '',
        scan_count: 0,
        collect_count: 0,
        download_count: 0,
        appendix_list: {
          appendix_id: '',
          filename: '',
          filetype: '',
          url: null
        }
      },
      dialogFormVisible: false,
      dialogStatus: '',
      dialogPvVisible: false,
      downloadLoading: false
    }
  },
  methods: {
    showDetail() {
      console.log(this.resourceId)
      getDetail(this.resourceId).then(res => {
        this.temp = res.data // copy obj
      })
      this.dialogFormVisible = true
    },
    addCollect(resourceId) {
      addCollect(this.resourceId).then(res => {
        if (res.data === 1) {
          this.$notify({
            title: '提示',
            message: '添加收藏成功',
            type: 'success',
            duration: 2000
          })
        }
      })
      this.dialogFormVisible = true
    }
  }
}
</script>
