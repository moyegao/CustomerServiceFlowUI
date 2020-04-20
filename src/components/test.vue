<template>
  <el-form ref="newform" :model="newform" :rules="rules">
    <el-form-item prop="expName" label="">
      <el-input v-model="newform.expName" placeholder="" style="width:75%">
      </el-input>
    </el-form-item>
    <el-form-item prop="expSn" label="">
      <el-input v-model="newform.expSn" placeholder="" style="width:75%">
      </el-input>
    </el-form-item>
    <el-form-item label='' prop="groupName">
      <el-select v-model="newform.groupName" placeholder="" style="width:75%" @change="newSelectGroup($event)">
        <el-option
          v-for="item in groupOptions"
          :key="item.groupId"
          :label="item.groupName"
          :value="item.groupId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item  label="" prop="subGroupName">
      <el-select v-model="newform.subGroupName" placeholder="" style="width:75%" @change="newSelectSubGroup($event)">
        <el-option
          v-for="item in subGroupOptions"
          :key="item.subGroupId"
          :label="item.subGroupName"
          :value="item.subGroupId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="" prop="expvmDifficulty">
      <el-rate v-model="newform.expvmDifficulty" :max="5" style="line-height: 2;"></el-rate>
    </el-form-item>
    <el-form-item label="" prop="expvmInstruction">
      <el-upload
        class="upload-demo"
        drag
        ref="uploadhtml"
        :action="upload_url"
        :auto-upload="false"
        :before-upload="newHtml"
        accept=".html, .htm">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">实验信息上传，只能传(.html/.htm)文件</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="" prop="expvmFiles">
      <el-upload
        class="upload-demo"
        drag
        ref="uploadfile"
        :action="upload_url"
        :auto-upload="false"
        :before-upload="newFiles"
        multiple>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">实验信息附件上传，只能传(.file)文件</div>
      </el-upload>
    </el-form-item>
    <el-form-item label=""  prop="expvmVideo">
      <el-upload
        class="upload-demo"
        drag
        ref="uploadvideo"
        :action="upload_url"
        :auto-upload="false"
        :before-upload="newVideo"
        accept=".mp4">
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">实验视频上传，只能传(.mp4)文件</div>
      </el-upload>
    </el-form-item>
    <el-form-item style="text-align:center">
      <el-button type="primary" @click="newSubmitForm()" class="yes-btn">
        确 定
      </el-button>
      <el-button @click="resetForm('newform')">
        重 置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data () {
      return {
        groupOptions:[],
        upload_url: 'aaa',       // 随便填一个，但一定要有
        uploadForm: new FormData(),   // 一个formdata
        rules: {},     // 用到的规则
        newform: {
          expName: '',
          groupName: '',
          expSn: '',
          subGroupName: '',
          expvmDifficulty: 1
        }
      }
    },
    methods:{
      newSubmitForm () {
        this.$refs['newform'].validate((valid) => {
          if (valid) {
            this.uploadForm.append('expName', this.newform.expName)
            this.uploadForm.append('expSn', this.newform.expSn)
            this.uploadForm.append('groupId', this.newgroupId)
            this.uploadForm.append('subGroupId', this.newsubgroupId)
            this.uploadForm.append('expvmDifficulty', this.newform.expvmDifficulty)

            this.$common.newExp(this,this.uploadForm,'/supervise/taskinfo/upload.api').then(res => {
              if (res.code === 400) {
                this.$message.error(res.error)
              } else if (res.code === 200) {
                this.$message.success('上传成功！')

              }
            })
            this.$refs.uploadhtml.submit()   // 提交时触发了before-upload函数
            this.$refs.uploadfile.submit()
            this.$refs.uploadvideo.submit()

          } else {
            // console.log('error submit!!')
            return false
          }
        })
      },
      newHtml (file) {   // before-upload
        this.uploadForm.append('html', file)
        return false
      },
      newFiles (file) {
        this.uploadForm.append('file[]', file)
        return false
      },
      newVideo (file) {
        this.uploadForm.append('video', file)
        return false
      }
    }
  }
</script>

