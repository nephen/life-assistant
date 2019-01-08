// pages/search/search.js

const requestUrl = require('../../config').requestUrl

var getTagData = function (that) {
  wx.request({
    url: requestUrl + 'wxTagListGet.ashx',
    success: function (res) {
      that.setData({
        tagList: res.data.ChinaValue
      })
    }
  })
}

var search = function (that) {
  if (that.data.key.length > 0) {
    wx.navigateTo({
      url: '../result/result?KeyWord=' + that.data.key
    })
  }
  else {
    wx.showToast({
      title: '输入关键字',
      image: "../../images/icon-no.png",
      mask: true,
      duration: 1000
    })
  }
}

  

Page({
  data: {
    key: '',
    winWidth: 0,
    winHeight: 0,
    // tab切换 
    currentTab: 0,
    money:'',
    city:'',
    project:'',
    cityArray: [
      { "ID": 1, "Name": "五险一金" }
    ],
    cityIndex: 0,
    saveMoney:'',
    compoundRate:'',
    compoundYears:'',
    targetMoney: '',
    fixRate: '',
    fixYears: '',
    mortgageMoney: '',
    mortgageRate: '',
    mortgageYears: '',
    monthInvestMoney: '',
    monthInvestRate: '',
    monthInvestYears: '',
    sceneType: ''
  },

  //事件处理函数
  formSearch: function () {
    search(this)
  },

  //点击标签
  bindTagTap: function (e) {
    wx.navigateTo({
      url: '../result/result?KeyWord=' + e.currentTarget.dataset.id
    })
  },

  //长按封面图 重新加载
  bindRefresh: function () {
    getTagData(this)
  },

  bindKeyInput: function (e) {
    this.setData({
      key: e.detail.value
    })
  },

  bindInputSearch: function () {
    search(this)
  },

  onLoad: function (query) {
    var that = this

    //调用应用实例的方法获取全局数据
    var app = getApp()
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    var that = this;
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(query.scene)
    this.setData({
      sceneType: scene
    })
    console.log(scene)
  },

  onShow: function () {
    var that = this
    that.setData({
      key: ''
    })
    getTagData(that)
  },


  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  salaryInput:function(e){
    this.setData({
      money: e.detail.value
    })
  },
  //缴纳项目选择
  bindCityChange: function (e) {
    this.setData({
      cityIndex: e.detail.value
    })
  },
  cityInput:function(e){
    this.setData({
      city: e.detail.value
    })
  },
  //复利存款金额
  saveMoneyInput: function (e) {
    this.setData({
      saveMoney: e.detail.value
    })
  },
  //复利年利率
  compoundRateInput: function (e) {
    this.setData({
      compoundRate: e.detail.value
    })
  },
  //复利期限年数
  compoundYearsInput: function (e) {
    this.setData({
      compoundYears: e.detail.value
    })
  },
  //定投存款金额
  targetMoneyInput: function (e) {
    this.setData({
      targetMoney: e.detail.value
    })
  },
  //定投年利率
  fixRateInput: function (e) {
    this.setData({
      fixRate: e.detail.value
    })
  },
  //定投期限年数
  fixYearsInput: function (e) {
    this.setData({
      fixYears: e.detail.value
    })
  },
  //房贷金额
  mortgageMoneyInput: function (e) {
    this.setData({
      mortgageMoney: e.detail.value
    })
  },
  //房贷年利率
  mortgageRateInput: function (e) {
    this.setData({
      mortgageRate: e.detail.value
    })
  },
  //房贷期限年数
  mortgageYearsInput: function (e) {
    this.setData({
      mortgageYears: e.detail.value
    })
  },
  //每月定投金额
  monthInvestMoneyInput: function (e) {
    this.setData({
      monthInvestMoney: e.detail.value
    })
  },
  //定投年化率
  monthInvestRateInput: function (e) {
    this.setData({
      monthInvestRate: e.detail.value
    })
  },
  //定投期限年数
  monthInvestYearsInput: function (e) {
    this.setData({
      monthInvestYears: e.detail.value
    })
  },
  //计算
  calculateBtn:function(e){
    if (this.data.currentTab==0){
      var StartNum = 3500;
      if (this.data.money == "") {
        wx.showToast({
          title: '工资不能为空',
          image: "../../images/icon-no.png",
          mask: true,
          duration: 1000
        })
        return false
      }
      if (this.data.city == "") {
        wx.showToast({
          title: '城市不能为空',
          image: "../../images/icon-no.png",
          mask: true,
          duration: 1000
        })
        return false
      }
      var Salary = this.data.money;
      var Salary = Salary - (Salary * 0.08 + Salary * 0.02 + 10 + Salary * 0.01 + Salary * 0.08);
      var cha = (Salary - StartNum);
      var output;
      if (cha > 100000) {
        output = cha * 0.45 - 15375;
      } else if (cha > 80000) {
        output = cha * 0.4 - 10375;
      } else if (cha > 60000) {
        output = cha * 0.35 - 6375;
      } else if (cha > 40000) {
        output = cha * 0.30 - 3375;
      } else if (cha > 20000) {
        output = cha * 0.25 - 1375;
      } else if (cha > 5000) {
        output = cha * 0.2 - 375;
      } else if (cha > 2000) {
        output = cha * 0.15 - 125;
      } else if (cha > 500) {
        output = cha * 0.1 - 25;
      } else if (cha > 0) {
        output = cha * 0.05;
      } else {
        output = 0;
      }
      var result = Salary - output;
      if (output > 0) {
        // wx.showToast({
        //   title: '税后' + result + '元',
        //   icon: 'success',
        //   mask: true,
        //   duration: 2000
        // })
        wx.showModal({
          title: '结余',
          content: '税后是' + result + '元',
          success: function (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
            }
          }
        })
      } else {
        wx.showToast({
          title: '您不用交税',
          icon: 'success',
          mask: true,
          duration: 1000
        })
      }  
    } if (this.data.currentTab == 1){
      var saveMoney = this.data.saveMoney;
      var compoundRate = this.data.compoundRate
      var compoundYears = this.data.compoundYears;
      saveMoney = parseFloat(saveMoney);
      compoundRate = parseFloat(compoundRate);
      compoundYears = parseFloat(compoundYears);
      var i;
      //利滚利计算
      for (i = 1; i <= compoundYears; i++) {
        saveMoney += saveMoney * (compoundRate / 100.0);
      }
      var all=(saveMoney).toFixed(2);
      // wx.showToast({
      //   title: '本息共'+all+'元',
      //   icon: 'success',
      //   mask: true,
      //   duration: 2000
      // })
      wx.showModal({
        title: '结余',
        content: '本息一共'+all+'元',
        success: function (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          }
        }
      })

    } if (this.data.currentTab == 2) {
      var targetMoney = this.data.targetMoney;
      var fixRate = this.data.fixRate
      var fixYears = this.data.fixYears;
      targetMoney = parseFloat(targetMoney);
      fixRate = parseFloat(fixRate);
      fixYears = parseFloat(fixYears);
      // //年利率转换为月利率
      // var loanMonthRate = loanRate/100/12;
      // //贷款的月份数
      // var loanMonths = -loanYears*12;
      // var all = ((targetMoney*loanMonthRate)/(1-Math.pow(1+loanMonthRate,loanMonths))).toFixed(2);
      //年利率转换为月利率
      var fixMonthRate = fixRate / 100 / 12;
      //支付的月份数
      var fixMonths = fixYears * 12;
      var fv = targetMoney;
      var pv = 0;
      var type = 1;
      //参考https://cloud.tencent.com/developer/ask/177280
      var all = ((-fv - pv*Math.pow(1+fixMonthRate, fixMonths))/(1+fixMonthRate*type)/((Math.pow(1+fixMonthRate, fixMonths)-1)/fixMonthRate)).toFixed(2);
      wx.showModal({
        title: '投入',
        content: '每月需定投' + -all + '元',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })

    } if (this.data.currentTab == 3) {
      var mortgageMoney = this.data.mortgageMoney;
      var mortgageRate = this.data.mortgageRate
      var mortgageYears = this.data.mortgageYears;
      mortgageMoney = parseFloat(mortgageMoney);
      mortgageRate = parseFloat(mortgageRate);
      mortgageYears = parseFloat(mortgageYears);
      //年利率转换为月利率
      var  mortgageMonthRate = mortgageRate/100/12;
      //贷款的月份数
      var mortgageMonths = - mortgageYears*12;
      var all = ((mortgageMoney * mortgageMonthRate) / (1 - Math.pow(1 + mortgageMonthRate, mortgageMonths))).toFixed(2);
      wx.showModal({
        title: '还款',
        content: '每月需等额还款' + all + '元',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })

    } if (this.data.currentTab == 4) {
      var monthInvestMoney = this.data.monthInvestMoney;
      var monthInvestRate = this.data.monthInvestRate
      var monthInvestYears = this.data.monthInvestYears;
      monthInvestMoney = parseFloat(monthInvestMoney);
      monthInvestRate = parseFloat(monthInvestRate);
      monthInvestYears = parseFloat(monthInvestYears);
      //年利率转换为月利率
      var monthInvestMonthRate = monthInvestRate / 100 / 12;
      //定投的月份数
      var monthInvestMonths = monthInvestYears * 12;
      var typee = 1;
      var pv = 0;
      var fv_value = (((1 - Math.pow(monthInvestMonthRate + 1, monthInvestMonths)) * (typee ? monthInvestMonthRate + 1 : 1) * monthInvestMoney) / monthInvestMonthRate - pv * Math.pow(monthInvestMonthRate + 1, monthInvestMonths)).toFixed(2);
      wx.showModal({
        title: '结余',
        content: '本息一共累计' + -fv_value + '元',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })

    }
  }
})