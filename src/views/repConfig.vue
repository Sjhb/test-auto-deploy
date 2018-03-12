<template>
<div>
  <ul class="container">
  <div class="content" v-for="(item, index) in configList" :key="index">
    <li class="cell" :class="item.showEditArea?'active':''">
      <div class="operate">
        <button class="btn" @click="showEditArea(index)">更改配置</button>
      </div>
      <ul class="detail">
        <li class="column">
          <label class="name">项目名称：</label>
          <label class="value">{{item.repName}}</label>
        </li>
        <li class="column">
          <label class="name">正式环境：</label>
          <ul class="env-cell">
            <li>
              <label class="name">又拍云空间名称:</label>
            <label class="value">{{item.deploy.bucket||'空（待配置）'}}</label>
            </li>
            <li>
              <label class="name">又拍云操作员:</label>
              <label class="value">{{item.deploy.operator||'空（待配置）'}}</label>
            </li>
          </ul>
          <label class="name margin-left-big">预发环境：</label>
          <ul class="env-cell">
            <li>
              <label class="name">又拍云空间名称:</label>
            <label class="value">{{item.preDeploy.bucket||'空（待配置）'}}</label>
            </li>
            <li>
              <label class="name">又拍云操作员:</label>
              <label class="value">{{item.preDeploy.operator||'空（待配置）'}}</label>
            </li>
          </ul>
        </li>
      </ul>
    </li>
    <!-- <div class="append" :class="item.showEditArea?'':'hide'"> -->
    <div class="append"  :class="item.showEditArea?'':'hide'">
      <div class="input-area">
        <label class="name">正式环境：</label>
        <div class="input-content">
          <div class="input-group">
            <label class="group-title">又拍云空间名称</label>
            <input class="group-input" v-model="editConfig.deploy.bucket" placeholder="请输入空间名（非必填）">
          </div>
          <div class="input-group">
            <label class="group-title">又拍云操作员</label>
            <input class="group-input" v-model="editConfig.deploy.operator" placeholder="请输入操作员（非必填）">
          </div>
          <div class="input-group">
            <label class="group-title">操作员密码</label>
            <input class="group-input" type="password" v-model="editConfig.deploy.password" placeholder="请输入密码（非必填）">
          </div>
          <div class="input-group">
            <label class="group-title">远程路径</label>
            <input class="group-input" v-model="editConfig.deploy.remotePath" placeholder="请输入远程路径（非必填）">
          </div>
        </div>
      </div>
      <div class="input-area">
        <label class="name">预发环境：</label>
        <div class="input-content">
          <div class="input-group">
            <label class="group-title">又拍云空间名称</label>
            <input class="group-input" v-model="editConfig.preDeploy.bucket" placeholder="请输入空间名（非必填）">
          </div>
          <div class="input-group">
            <label class="group-title">又拍云操作员</label>
            <input class="group-input" v-model="editConfig.preDeploy.operator" placeholder="请输入操作员（非必填）">
          </div>
          <div class="input-group">
            <label class="group-title">操作员密码</label>
            <input class="group-input" type="password" v-model="editConfig.preDeploy.password" placeholder="请输入密码（非必填）">
          </div>
          <div class="input-group">
            <label class="group-title">远程路径</label>
            <input class="group-input" v-model="editConfig.preDeploy.remotePath" placeholder="请输入远程路径（非必填）">
          </div>
        </div>
      </div>
      <div class="submit">
        <button class="btn" @click="hideEditArea(index)">收起</button>
        <button class="btn" @click="submitConfig(index)">确认更改</button>
      </div>
    </div>
  </div>
  </ul>
  <loading :show="showShade">
    <div slot="loading" class="circle">
    </div>
  </loading>
</div>
</template>
<script>
import loading from '@/component/loading.vue'
export default {
  name: 'repConfig',
  components: {
    loading
  },
  data () {
    return {
      configList: [],
      showShade: false,
      editConfig: {
        deploy: {
          bucket: '',
          operator: '',
          password: '',
          remotePath:''
        },
        preDeploy: {
          bucket: '',
          operator: '',
          password: '',
          remotePath:''
        }
      }
    }
  },
  methods: {
    // 显示更改配置框
    showEditArea (index) {
      let configList = this.configList
      for (let item in configList) {
        if (+item !== +index) {
          configList[item].showEditArea = false
        } else {
          configList[item].showEditArea = true
        }
      }
      this.$set(this.configList, index, this.configList[index])
    },
    // 隐藏更改配置框
    hideEditArea (index) {
      this.configList[index].showEditArea = false
      this.$set(this.configList, index, this.configList[index])
      this.editConfig = {
        deploy: {
          bucket: '',
          operator: '',
          password: '',
          remotePath:''
        },
        preDeploy: {
          bucket: '',
          operator: '',
          password: '',
          remotePath:''
        }
      }
    },
    // 确认更改
    submitConfig (index) {
      let reqData = {
        repName: this.configList[index].repName
      }
      reqData.deploy = this.editConfig.deploy
      reqData.preDeploy = this.editConfig.preDeploy
      this.showShade = true
      fetch('http://localhost:8000/repConfig/configRep',{
        method: 'POST',
        body: JSON.stringify(reqData)
      }).then(res => {
        if (res.ok) {
          res.json().then(res => {
            this.showShade = false
            console.log(res)
          })
        }
      }).catch(res => {
        console.log(res)
      })
    }
  },
  created () {
    fetch('http://localhost:8000/repConfig/getAllConfig', {method: 'GET'}).then(response => {
      if(response.ok) {
        response.json().then(data => {
          for (let item in data.content) {
            let obj = {}
            obj.repName = data.content[item].name
            obj.deploy = data.content[item].deploy
            obj.preDeploy = data.content[item].preDeploy
            obj.showEditArea = false
            this.configList.push(obj)
          }
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="less" scoped>
  .btn {
    cursor: pointer;
    padding: 0.5em .5em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.1em;
    min-width: 8em;
    text-align: center;
  }
  .btn:hover {
    background-color: #389068;
  }
  .container {
    position: relative;
    display: block;
    .content {
      position: relative;
      border-radius: 3px;
      transition: .2s;
      margin: 10px;
      min-width: 800px;
      overflow: hidden;
      background: #fff;
      .active {
        box-shadow: 5px 0px 10px #927f7f;
      }
      .cell {
        position: relative;
        display: flex;
        border: 1px solid #d0d0d0;
        z-index: 10;
        // border-left: 1px solid #d0d0d0;
        // border-right: 1px solid #d0d0d0;
        // border-bottom: 1px solid #d0d0d0;
        li {
          text-align: left;
        }
        .operate {
          position: relative;
          padding: 10px;
          display: block;
          height: 38px;
        }
        .detail {
          position: relative;
          display: block;
          display: flex;
          flex-wrap: wrap;
          .column {
            position: relative;
            display: flex;
            padding: 10px;
            flex-shrink: 0;
            flex-grow: 0;
            flex-wrap: wrap;
            .name {
              height: 38px;
              line-height: 38px;
            }
            .value {
              height: 38px;
              line-height: 38px;
            }
            .env-cell {
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
            }
          }
        }
      }
      .cell:hover {
        box-shadow: 0px 0px 8px #cecccd;
      }
      .append {
        border: 1px solid #d0d0d0;
        border-top: none;
        transition: all 10s;
        z-index: 1;
        margin-top: 0px;
        .input-area {
          position: relative;
          display: flex;
          padding: 10px 10px 10px 140px;
          .name {
            height: 38px;
            line-height: 38px;
            flex-shrink: 0;
            flex-grow: 0;
          }
          .input-content {
            position: relative;
            display: flex;
            flex-wrap: wrap;
            .input-group {
              position: relative;
              flex-shrink: 0;
              flex-grow: 0;
              margin-bottom: 5px;
              .group-title {
                display: inline-block;
                height: 38px;
                width: 115px;
                line-height: 38px;
                text-align: right;
              }
              .group-input {
                position: relative;
                padding: 10px;
                width: 220px;
                border: 1px solid #c5c5c5;
                border-radius: 5px;
                margin-left: 10px;
                font-size: 15px;
              }
            }
          }
        }
        .submit {
          padding: 10px 0px;
        }
      }
      .hide {
        display: none;
      }
    }
  }
  .margin-left-big {
    margin-left: 30px;
  }
  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 4em;
    height: 4em;
    margin-left: -2em;
    margin-top: -2em;
    border-color: #fff;
    border: 4px solid;
    box-sizing: border-box;
    border-radius: 50%;
    z-index: 1;
  }
  @keyframes circle {
    0% {
      transform: rotate(0deg)
    }
    50 {
      transform: rotate(180deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
  .circle:before {
    content: "";
    position: absolute;
    box-sizing: border-box;
    margin-left: -2em;
    margin-top: -4px;
    width: 4em;
    height: 4em;
    border-radius: 50%;
    opacity: 1;
    border: 4px solid;
    border-color: transparent;
    border-top-color: #fff;
    animation: circle 1s infinite;
    z-index: 2;
  }
</style>
