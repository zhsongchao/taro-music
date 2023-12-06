/*
 * @Date: 2021-12-02 19:15:41
 * @LastEditors: yiqian.lsq
 * @LastEditTime: 2021-12-12 20:04:41
 * @FilePath: /taro-music/src/app.config.ts
 * @Description:
 */
export default {
  pages: [
    "pages/home/home",
    "pages/myProfile/myProfile",
    "pages/tools/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#d43c33",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    "color": "#000000",
    "selectedColor": "#3cc51f",
    "backgroundColor": "#FFFFFF",
    "list": [{
      "pagePath": "pages/home/home",
      "iconPath": "assets/images/tabbar/home_sele_icon.png",
      "selectedIconPath": "assets/images/tabbar/home_unsele_icon.png",
      "text": "首页"
    }, 
    {
      "pagePath": "pages/tools/index",
      "iconPath": "assets/images/tabbar/tools_sele_icon.png",
      "selectedIconPath": "assets/images/tabbar/tools_unsele_icon.png",
      "text": "工具"
    }, {
      "pagePath": "pages/myProfile/myProfile",
      "iconPath": "assets/images/tabbar/my_sele_icon.png",
      "selectedIconPath": "assets/images/tabbar/my_unsele_icon.png",
      "text": "我的"
    }]
  },
};
