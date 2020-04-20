<template>
  <div class="login-box" id="app">
    <el-row>
      <el-col :span="8">
        <el-input id="name" v-model="username" placeholder="请输入帐号" @keyup.enter.native="login" clearable>
          <template slot="prepend" style="width:100px">用户名</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码" @keyup.enter.native="login">
          <template slot="prepend">密 码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-button id="login" v-on:click="login" style="width:100%" type="primary">登录</el-button>
      </el-col>
    </el-row> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      //locationUrl: 'https://duban.gdhwater.com/index.html'
      locationUrl: 'http://localhost:8083/index.html'
    }
  },
  created() {

  },
  mounted() {
   // var curUrl = 'https://duban.gdhwater.com/index.html#/login';
    // if (locationUrl == window.location.href) {//window.location.href
    //   //window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=https://duban.gdhwater.com/cas.api'
    //   window.location.href = 'http://oa.ds.com:8080/cas/logout?service=http://oa.ds.com:8080/cas/login?service=http://localhost:8080/cas.api'
    // }else{
    //   window.location.href ='https://duban.gdhwater.com/index.html#/login'
    // }

    $('.el-input-group__prepend').eq(0).css('padding', '0 15px');
  },
  methods: {
    login() {
      var that = this;
      var name = that.name;
      var password = that.password;
      if (name == '' || password == '') {
        that.$message({ message: '账号或密码为空！', type: 'error' })
        return;
      }
      this.$common.commitParam(this, "/supervise/login.api", { 'username': that.username, 'password': that.password },
        {
          success: function (res) {
            if (res.code == 0) {
              sessionStorage.setItem('isShowIndex', true)
              that.$router.push('/index?type=JT')
            } else {
              that.$message({ type: 'error', message: res.description });
              return;
            }
          }
        }, "post", false);
    },

  }
}
</script>
<style>
body {
  overflow: hidden;
}
.el-row {
  margin-bottom: 20px;
  /* vertical-align: middle; */
  /* margin-left: 38%; */
  font-size: 0.16rem;
}
.login-box {
  /* margin: 0 auto; */
  /* padding-left: 50%; */
  /* padding: 38%  */
  padding-top: 10%;
  width: 100%;
  height: 100%;
}
.login-box .el-button {
  background: #297acc;
}
.el-col {
  /* vertical-align: middle */
  width: 3.5rem;
  margin-left: 37%;
}
.el-message.el-message--error > i,
.el-message,
.el-message--warning {
  font-size: 0.16rem;
}
.el-col-8 {
  width: 22.33% !important;
}
</style>


