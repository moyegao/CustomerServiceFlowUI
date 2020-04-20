<template>
    <div class="concatmodify">
      <div style="margin-left:10%;margin-top:30px;">
        <span>部门联络人：</span>
        <el-select v-model="value" clearable  size="mini">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="save" style="margin-left:20px;">保存</el-button>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      options:[],
      value:'',
      label:'',
      data:{}
    }
  },
  mounted(){
    this.loadData();
  },
  methods:{
    // 保存
    save(){
      var that=this;
      for(var i=0;i<that.data.length;i++){
        if(that.value==that.data[i].loginId){
          that.label=that.data[i].userName
        }
      }
      this.$common.commitParam(this,"/supervise/contact/save.api", {"contactId":that.value,"contactName":that.label},{
				success : function(res) {
            that.$message({
            message: '保存成功！',
            type: 'success'
            });
				}
			},"post",false);
    },
    //加载选择框内数据
    loadData(){
      var that=this;
      this.$common.commitParam(this,"/supervise/contact/list.api", {},{
				success : function(res) {
           
            that.data=res.data.liaisonUsers
            that.value=res.data.loginId
            for(var i=0;i<res.data.liaisonUsers.length;i++){
              var values={value:res.data.liaisonUsers[i].loginId,label:res.data.liaisonUsers[i].userName}
              that.options.push(values);
            }

				}
			},"get");
    }
  }
}
</script>

<style>

</style>
