<template>
  <div class="container-wrapper">
    <div class="container">
      <div class="app front">
        <div class="header">
          <span class="info">登 录</span>
          <div class="prompt">
            <span class="ask">还没有账号?</span>
            <button class="btn signup" @click="jumpToRegister">注册</button>
          </div>
        </div>
        <div class="main">
          <div class="user_field">
            <form class="_details">
              <div class="textbox">
                <input type="text" v-model="user_email" />
                <span class="input_detail">邮箱</span>
              </div>
              <div class="textbox">
                <input
                  type="password"
                  v-model="user_password"
                  @keyup.enter="handleLogin"
                />
                <span class="input_detail">密码</span>
              </div>
            </form>
          </div>
          <div>
            <button class="btn login" @click="handleLogin">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login } from "@/api/login";
import { GetMyCart } from "@/api/user";
import { GetMyNotice } from "@/api/notice";
export default {
  name: "login",
  data() {
    return {
      user_email: "123456@163.com",
      user_password: "123456",
      hasNew: []
    };
  },
  methods: {
    a() {
      alert(11);
    },
    jumpToRegister() {
      this.$router.push("/register");
    },
    async getMyNotice() {
      let data = {
        sellerId: this.$store.state.userID
      };
      const res = await GetMyNotice(data);
      res.data.data.forEach(v => {
        if (v.state == 0) this.hasNew.push(v);
      });
      console.log(this.hasNew);
    },
    handleLogin() {
      if (!this.user_email) {
        this.$message({
          type: "warning",
          message: "邮箱不能为空"
        });
      } else if (!this.user_password) {
        this.$message({
          type: "warning",
          message: "密码不能为空"
        });
      } else {
        Login({
          email: this.user_email,
          password: this.user_password
        })
          .then(res => {
            if (res.data.status === 200) {
              this.$message({
                type: "success",
                message: "登录成功！"
              });
              // 更新vuex里的全局变量
              this.$store.commit("login", {
                ID: res.data.user.id,
                name: res.data.user.nickName,
                realName: res.data.user.realName,
                isLogin: true,
                avatar: res.data.user.avatar,
                sex: res.data.user.sex
              });
              this.$router.push("/index");
              //获取购物车
              GetMyCart({
                uid: this.$store.state.userID
              }).then(res => {
                let data = res.data.data[0].cart;
                this.$store.commit("setMyCart", {
                  cart: data
                });
              });
              //获取新消息
              this.getMyNotice().then(() => {
                console.log(this.hasNew.length);
                this.hasNew.length == 0
                  ? this.$store.commit("hasNewMessage", false)
                  : this.$store.commit("hasNewMessage", true);
              });
            } else {
              this.$message.error(res.data.message);
              return;
            }
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1800px;
  overflow: hidden;
  transform-style: preserve-3d;
  background: rgb(224, 224, 224);
  overflow: hidden;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 800ms ease;
  transform-style: preserve-3d;
  &.active {
    transform: rotateY(180deg);
  }
}

.app {
  width: 500px;
  height: 400px;
  background: #34495e;
  color: #fff;
  font-family: montserrat;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
  overflow: hidden;
  backface-visibility: hidden;
  position: absolute;
  box-shadow: -2px 5px 15px rgba(0, 0, 0, 0.35);
  &.front {
    transform: rotateY(0deg) translateZ(0em);
  }
  &.back {
    transform: rotateY(180deg) translateZ(0.5px);
  }
}

.btn {
  height: 40px;
  outline: none;
  border: none;
  cursor: pointer;
  background: #2a9d8f;
  letter-spacing: 1px;
  font-size: 18px;
}

.header {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 150px 1fr;
  background: #2c3e50;
  padding: 0 20px;

  .info {
    height: 100%;
    font-weight: 800;
    font-size: 1.6em;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 2px;
  }
  .prompt {
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin-right: 20px;
    .btn {
      padding: 0 10px;
      margin-left: 20px;
      color: #fff;
      font-size: 1.1rem;
    }
    .btn:hover {
      opacity: 0.8;
    }
  }
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  .user_field {
    width: 92%;
    height: 100%;
    background: rgba(44, 62, 80, 0.6);
    padding: 10px 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    .option_text {
      font-size: 15px;
      margin: 5px 0 10px 0;
    }
    ._details {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .textbox {
        position: relative;
        margin: 10px 0 20px 0;
        height: 80px;
        display: flex;
        align-items: center;
        input {
          position: relative;
          height: 30px;
          width: 80%;
          border: none;
          background: none;
          border-bottom: 2px solid #fff;
          font-size: 20px;
          color: #fff;
          padding: 0 10px;
          letter-spacing: 1px;
          outline: none;
          &:focus {
            & + .input_detail {
              font-size: 18px;
              left: 10px;
              top: 15%;
              color: #2a9d8f;
              opacity: 0.9;
            }
          }
        }
        .input_detail {
          position: absolute;
          left: 10px;
          top: 50%;
          font-size: 24px;
          transform: translateY(-50%);
          pointer-events: none;
          user-select: none;
          font-weight: 800;
          opacity: 0.1;
          transition: all 200ms ease;
        }
      }
    }
  }
  .btn.login {
    position: relative;
    color: #fff;
    align-self: flex-end;
    margin: 10px 20px 0 0;
    padding: 10px 0;
    width: 140px;
    font-size: 1.2rem;
  }
  .btn.login:hover {
    opacity: 0.8;
  }
}

.app.back .header {
  grid-template-columns: 200px 1fr;
}
.app.back .main .user_field ._details .textbox {
  height: 60px;
}
.app.back .main .user_field ._details .textbox input:focus + .input_detail {
  top: 0%;
}

a {
  margin: 0 20px;
  color: #fff;
  font-size: 2rem;
  transition: all 400ms ease;
}

a:hover {
  color: #222;
}
</style>
