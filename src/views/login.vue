<style lang="less">
@import "./login.less";
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
          <div class="login-title">
              <img src="../images/login-logo.gif" width="384px" style="margin: 0 auto">
          </div>
          <Card :bordered="false" style="background: rgba(255,255,255,.6);box-shadow: 0 1px 6px rgba(0,0,0,.2);">  
                <div class="tabs">
                    <h3 class="litigant-tab">
                        <a class="log-in" :class="userType == 'litigant' ? 'active' : ''" @click="userType = 'litigant'">
                        <span>当事人/律师</span>
                        </a>
                    </h3>
                    <h3 class="judge-tab">
                        <a class="sign-up" :class="userType == 'judge' ? 'active' : ''" @click="userType = 'judge'">
                        <span>法院工作人员</span>
                        </a>
                    </h3>
                </div>
                <div class="form-con">
                  <Form :model="userInfo1" :rules="rules" v-show="userType == 'litigant'">
                      <FormItem prop="phone">
                          <Input v-model="userInfo1.idCard" placeholder="请输入身份证号">
                              <span slot="prepend">
                                  <Icon :size="16" type="person"></Icon>
                              </span>
                          </Input>
                      </FormItem>
                       <FormItem prop="password">
                            <Input type="password" v-model="userInfo1.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Input v-model="userInfo1.code" placeholder="请输入验证码" style="width:296px;" />
                            <span class="code-wrapper" @click="changeUserCode">
                                <img height="32px" style="vertical-align: middle;" :src="userCodeSrc" alt="验证码">
                            </span>
                        </FormItem>
                      <FormItem>
                          <Button @click="phoneSubmit" type="primary" long>登录</Button>
                      </FormItem>
                  </Form>
                        <Form ref="loginForm" :model="userInfo" :rules="rules" v-show="userType == 'judge'">
                            <FormItem prop="userName">
                                <Input v-model="userInfo.userName" placeholder="请输入用户名">
                                    <span slot="prepend">
                                        <Icon :size="16" type="person"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="userInfo.password" placeholder="请输入密码">
                                    <span slot="prepend">
                                        <Icon :size="14" type="locked"></Icon>
                                    </span>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Input v-model="userInfo.authCode" placeholder="请输入验证码" style="width:296px;" />
                                <span class="code-wrapper" @click="changeCode">
                                    <img height="32px" style="vertical-align: middle;" :src="codeSrc" alt="验证码">
                                </span>
                            </FormItem>
                            <FormItem>
                                <Button @click="handleSubmit" type="primary" long>登录</Button>
                            </FormItem>
                        </Form>
                 
                    <p class="login-tip register" @click="register">注册</p>
                    <p class="login-tip register"><a href="http://court.ptnetwork001.com/易送达诉讼服务客户端.url" download>下载客户端</a></p>
                  <p class="login-tip">本网站只支持IE9+等现代浏览器</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import store from "@/store";
import { getCode, phoneLogin } from "@/api/user.js";
var path = window.location.host;
export default {
  data() {
    return {
      codeSrc: "http://" + path + "/api/main/code.jhtml",
      userCodeSrc: "http://" + path + "/api/main/code.jhtml",
      userInfo: {
        userName: "",
        password: "",
        authCode: ""
      },
      userInfo1: {
        idCard: "",
        password: "",
        code: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      courtLogin: false,
      entranceText: "法院工作人员入口",
      getCodeText: "获取验证码",
      canGetCode: true,
      userType: "litigant"
    };
  },
  methods: {
    // 法务人员
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          store
            .dispatch("Login", this.userInfo)
            .then(res => {
              if (res.data.state == 100) {
                Cookies.set("user", this.userInfo.userName);
                this.$router.push({
                  name: "home_index"
                });
              } else {
                this.$Message.error(res.data.message);
                this.codeSrc =
                  "http://" + path + "/api/main/code.jhtml?tm=" + Math.random();
              }
            })
            .catch(() => {
              this.codeSrc =
                "http://" + path + "/api/main/code.jhtml?tm=" + Math.random();
            });
        }
      });
    },
    // 当事人
    phoneSubmit() {
      phoneLogin(
        this.userInfo1.idCard,
        this.userInfo1.password,
        this.userInfo1.code
      ).then(res => {
        if (res.data.state == 100) {
          Cookies.set("user", this.userInfo1.idCard);
          this.$router.push({
            name: "home_index"
          });
        } else {
          this.$Message.error(res.data.message);
        }
      });
    },
    changeCode() {
      this.codeSrc =
        "http://" + path + "/api/main/code.jhtml?tm=" + Math.random();
    },
    changeUserCode() {
      this.userCodeSrc =
        "http://" + path + "/api/main/code.jhtml?tm=" + Math.random();
    },
    changeEntrance() {
      this.courtLogin = !this.courtLogin;
      this.entranceText = this.courtLogin ? "当事人入口" : "法院工作人员入口";
    },
    ckickGetCode() {
      if (this.canGetCode) {
        getCode(this.userInfo1.phone).then(res => {
          if (res.data.state == 100) {
            this.$Message.success(res.data.message);
            this.getCodeText = 59;
            this.canGetCode = false;
            var that = this;
            var timmer = setInterval(function() {
              that.getCodeText -= 1;
              if (that.getCodeText == 0) {
                that.getCodeText = "获取验证码";
                that.canGetCode = true;
                clearInterval(timmer);
              }
            }, 1000);
          } else {
            this.$Message.error(res.data.message);
          }
        });
      }
    },
    register() {
      this.$router.push({
        name: "register"
      });
    }
  }
};
</script>

<style>
.code-wrapper {
  cursor: pointer;
}
.entrance {
  color: #40a9ff;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
}
.tabs {
  overflow: hidden;
}
.tabs * {
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
}

.tabs h3 {
  float: left;
  width: 50%;
  cursor: pointer;
}
.tabs h3 a {
  padding: 0.5em 0;
  text-align: center;
  font-weight: 400;
  display: block;
  color: #666;
  border: 0;
}
.tabs h3 a.active {
  color: #000;
}
.tabs h3 a.active span {
  padding-bottom: 4px;
  border-bottom: 1px solid #40a9ff;
}
.tabs-content {
  padding: 1.5em 3em;
  text-align: left;
  width: auto;
}
</style>
