<template>
  <div class="kl-upload" v-loading.fullscreen.lock="upLoadLoading" element-loading-text="正在上传附件，请稍候" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--{{fatherList}}-->
    <el-table :data="fatherList" height="200" style="width: 100%">
      <el-table-column label="NO." type="index" width="55">
      </el-table-column>
      <el-table-column label="文件描述" prop="name">
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="options">
        <template slot-scope="scope" style="text-align:center">
          <el-button size="mini" type="text" class="download-btn" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
          <!-- <i class="line"></i> -->
          <el-button size="mini" type="text" class="delete-btn" @click="handlePreview(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" type="text" class="delete-btn" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="uploading">
      <p>上传文件:</p>
      <div class="addDel">
        <el-button type="danger" size="mini" round style="margin-left: 0;background:#f78989;border-color:#f78989" @click="delRow">删除</el-button>
        <el-button type="primary" size="mini" round style="color: white;margin-left: 0;background:#66b1ff;border-color:#66b1ff" @click="addRow">添加</el-button>
      </div>
      <el-table border :data="addList" :highlight-current-row="true" @selection-change="handleSelectionChange" height="200">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="title" label="标题">
          <template slot-scope="scope">
            <el-input v-model="addList[scope.$index].title"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="file" label="文件名">
          <template slot-scope="scope">
            <input type="file" @change="getFile($event,scope.row)">
          </template>
        </el-table-column>
         <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> 
      </el-table>
    </div> -->

    <!-- 上传 -->
    <div class="uploading">
      <el-upload class="upload-demo" accept=".jpg, .pdf, .doc, .docx, .xlsx, .xls, .pptx, .gif, .png, .ppt" ref="upload" action="" :on-preview="handlePreview1" :on-remove="delRow" :file-list="addList" :on-change="addRow" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary" class="add-file">
          <i class="el-icon-folder-add"></i>
          选取文件</el-button>
      </el-upload>
    </div>

  </div>
</template>

<script>
export default {
  name: "kl-upload",
  props: ['fatherList', 'fatherId', 'type'],
  data() {
    return {
      fileList: [],
      addList: [],
      selectRow: [],
      timer1: null,
      upLoadLoading: false,
    }
  },
  mounted() {
    eventBus.$emit('todo', true);

  },
  methods: {
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },
    handlePreview1(file) {

    },
    handleRemove(file, fileList) {

    },
    handleDownload(index, row) {
      window.open(row.url)
    },
    handlePreview(index, row) {
      if (row.pdfUrl !== '') {
        window.open(row.pdfUrl)
      } else {
        let imgList = ['jpg', 'JPG', 'gif', 'GIF', 'png', 'PNG']
        for (let i = 0; i < imgList.length; i++) {
          if (row.name.indexOf(imgList[i]) > -1) {
            var isPreview = true;
          }

        }
        if (isPreview) {
          window.open(row.url);
        } else {
          this.$message({
            type: 'error',
            message: '该附件不支持预览'
          });
        }
      }
    },
    handleDelete(index, row) {
      let that = this;
      this.$confirm('是否删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$common.commitParam(this, "/supervise/attachment/delete.api", { "id": row.id }, {
          success: function (res) {
            that.$message({
              type: 'success',
              message: '删除成功!'
            });
            that.$parent.$parent.showUpload()
          }
        }, "post", false);
      })
    },
    getFile($event, row) {
      row.name = $event.target.files[0].name;
      row.file = $event.target.files[0];
    },
    handleSelectionChange(val) {
      this.selectRow = val;
    },
    addRow() {
      let file = $(".uploading .el-upload__input").eq(0)[0].files[0];
      let name = $(".uploading .el-upload__input").eq(0)[0].files[0].name

      this.addList.push(
        {
          "id": this.fatherId,
          "type": this.type,
          // "title": "",
          "file": file,
          "name": name
        }
      )
      this.selectRow = this.addList;

    },
    delRow() {
      for (let i in this.addList) {
        if (this.selectRow.length === 0) {
          this.$message({
            showClose: true,
            message: '请选择要移除的数据'
          });
        } else {
          for (let j in this.selectRow) {
            if (this.addList[i] == this.selectRow[j]) {
              this.addList.splice(i, 1);
            }
          }
        }
      }
    },
    line2upload() {
      if (this.addList.length === 0) {
        this.$message({
          type: 'info',
          message: "请添加上传文件！"
        });
        return;
      }
      // console.log(this.addList);
      // return
      for (let i in this.addList) {
        let $formData = new FormData();//  用FormData存放上传文件
        for (let j in this.addList[i]) {
          $formData.append(j, this.addList[i][j]);
        }
        // console.log($formData);
        this.upLoad($formData);
      }
      // this.upLoad(this.addList);
    },
    upLoad(formData) {
      // console.log(formData);
      //  clearTimeout(this.timer1); 
      // 	 this.timer1 = setTimeout(()=>{
      this.doUpLoad(formData)
      // },300)
    },
    doUpLoad(formData) {
      // console.log(formData);
      var that = this;
      this.upLoadLoading = true;
      this.$axios({
        url: '/supervise/attachment/upload.api',
        method: 'post',
        data: formData,
        headers: { 'content-type': 'multipart/form-data;charset=UTF-8' }
      }).then(res => {
        that.upLoadLoading = false;
        if (res.data.code === 0) {
          this.addList.splice(0, 1);
          eventBus.$emit('fujianRefresh', 'true');
          if (this.addList.length === 0) {
            this.$message({
              type: 'success',
              message: '上传完毕!'
            });
            this.$parent.$parent.showUpload()
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.description
          });

        }
      }).catch(function (err) {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="scss">
.kl-upload {
  .download-btn,
  .delete-btn {
    background: transparent;
    color: #297acc;
    border: none;
    &:hover {
      background: transparent;
      border: none;
    }
  }
  .el-table tr:hover {
    background: transparent;
    border: none;
  }
  .options .cell {
    text-align: center;
  }
}
.kl-upload .addDel .el-button {
  border-radius: 5px;
}
.kl-upload .uploading {
  border: 1px solid #f1f1f1;
  width: 100%;
  height: 2rem;
  overflow: auto;
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  .upload-demo {
    text-align: center;
  }
  .el-dialog__body {
    width: 100%;
    height: 100%;
    padding: 0.2rem;
  }
  .el-upload-list__item-name {
    font-size: 0.16rem;
  }
  .add-file {
    background: #fff;
    color: #606226;
    border: 1px dashed #e3e4e6;
    text-align: center;
    width: 2.5rem;
    height: 0.5rem;
    font-size: 0.16rem;
  }
}
</style>
