//index.js
const app = getApp()
const { envList } = require('../../envList.js')

Page({
  data: {
    showUploadTip: false,
    powerList: [{
      title: '单人模式',
      tip: '骰子结果生成器',
      showItem: false,
      item: [{
        title: '开始游戏',
        page: 'gaming'
      },
   
       {
        title: '个人记录',
        page: 'selectRecord'
      },
  
    ]
    }, {
      title: '组队博饼',
      tip: '和好友一起游戏',
      showItem: false,
      item: [
        {
        title: '创建房间',
        page: 'pg1'

      },
       {
        title: '加入房间',
        page: 'selectRecord'
      }, {
        title: '邀请好友',
        page: 'sumRecord'
      }]
    },
    {
      title: '规则介绍',
      tip: '和好友一起游戏',
      showItem: false,
      item: [
        {
        title: '规则详情',
        page: 'pg1'

      }]
    }, {
      title: '更多玩法',
      tip: '向我们反馈您的想法',
      showItem: false,
      item: [{
        title: '想法反馈',
        page: 'deployService'
      }]
    }],
    envList,
    selectedEnv: envList[0],
    haveCreateCollection: false
  },

  //打开下拉选项
  onClickPowerInfo(e) {
    const index = e.currentTarget.dataset.index
    const powerList = this.data.powerList
    powerList[index].showItem = !powerList[index].showItem
    if (powerList[index].title === '数据库' && !this.data.haveCreateCollection) {
      this.onClickDatabase(powerList)
    } else {
      this.setData({
        powerList
      })
    }
  },

  onChangeShowEnvChoose() {
    wx.showActionSheet({
      itemList: this.data.envList.map(i => i.alias),
      success: (res) => {
        this.onChangeSelectedEnv(res.tapIndex)
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },

  onChangeSelectedEnv(index) {
    if (this.data.selectedEnv.envId === this.data.envList[index].envId) {
      return
    }
    const powerList = this.data.powerList
    powerList.forEach(i => {
      i.showItem = false
    })
    this.setData({
      selectedEnv: this.data.envList[index],
      powerList,
      haveCreateCollection: false
    })
  },
//点击跳转页面
  jumpPage(e) {
    wx.navigateTo({
      url: `/pages/${e.currentTarget.dataset.page}/index?envId=${this.data.selectedEnv.envId}`,
    })
  },

  onClickDatabase(powerList) {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.selectedEnv.envId
      },
      data: {
        type: 'createCollection'
      }
    }).then((resp) => {
      if (resp.result.success) {
        this.setData({
          haveCreateCollection: true
        })
      }
      this.setData({
        powerList
      })
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      this.setData({
        showUploadTip: true
      })
      wx.hideLoading()
    })
  }
})
