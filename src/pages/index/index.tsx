import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Image, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtTabBar, AtSearchBar, AtIcon, AtTabs, AtTabsPane } from "taro-ui";
import { connect } from "../../utils/connect";
import classnames from "classnames";
import CLoading from "../../components/CLoading";
import CMusic from "../../components/CMusic";
import api from "../../services/api";
// import { injectPlaySong } from "../../utils/decorators";
import { songType } from "../../constants/commonType";
import {
  getRecommendPlayList,
  getRecommendDj,
  getRecommendNewSong,
  getRecommend,
  getSongInfo,
  updatePlayStatus
} from "../../actions/song";

import "./index.scss";

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796

type PageStateProps = {
  song: songType;
  counter: {
    num: number;
  };
  recommendPlayList: Array<{
    id: number;
    name: string;
    picUrl: string;
    playCount: number;
  }>;
  recommendDj: Array<{
    name: string;
    picUrl: string;
  }>;
  recommendNewSong: any;
  recommend: any;
};

type PageDispatchProps = {
  getRecommendPlayList: () => any;
  getRecommendDj: () => any;
  getRecommendNewSong: () => any;
  getRecommend: () => any;
  getSongInfo: (object) => any;
  updatePlayStatus: (object) => any;
};

type PageOwnProps = {};

type PageState = {
  current: number;
  showLoading: boolean;
  bannerList: Array<{
    typeTitle: string;
    pic: string;
    targetId: number;
  }>;
  searchValue: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

// @injectPlaySong()
@connect(
  ({ song }) => ({
    song: song,
    recommendPlayList: song.recommendPlayList,
    recommendDj: song.recommendDj,
    recommendNewSong: song.recommendNewSong,
    recommend: song.recommend
  }),
  dispatch => ({
    getRecommendPlayList() {
      dispatch(getRecommendPlayList());
    },
    getRecommendDj() {
      dispatch(getRecommendDj());
    },
    getRecommendNewSong() {
      dispatch(getRecommendNewSong());
    },
    getRecommend() {
      dispatch(getRecommend());
    },
    getSongInfo(object) {
      dispatch(getSongInfo(object));
    },
    updatePlayStatus(object) {
      dispatch(updatePlayStatus(object));
    }
  })
)
class Index extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      showLoading: true,
      bannerList: [],
      searchValue: ""
    };
  }
  handleClick(value) {
    this.setState({
      current: value
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    this.setState({
      showLoading: false
    });
  }

  componentWillMount() {
    this.getPersonalized();
    this.getNewsong();
    this.getDjprogram();
    this.getRecommend();
    this.getBanner();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidMount() {
    this.removeLoading();
  }

  switchTab(value) {
    if (value !== 1) return;
    Taro.reLaunch({
      url: "/pages/my/index"
    });
  }

  /**
   * 获取推荐歌单
   */
  getPersonalized() {
    this.props.getRecommendPlayList();
  }

  /**
   * 获取推荐新音乐
   */
  getNewsong() {
    this.props.getRecommendNewSong();
  }

  /**
   * 获取推荐电台
   */
  getDjprogram() {
    this.props.getRecommendDj();
  }

  /**
   * 获取推荐节目
   */
  getRecommend() {
    this.props.getRecommend();
  }

  getBanner() {
    api
      .get("/banner", {
        type: 1
      })
      .then(({ data }) => {
        console.log("banner", data);
        if (data.banners) {
          this.setState({
            bannerList: data.banners
          });
        }
      });
  }

  goSearch() {
    Taro.navigateTo({
      url: `/pages/packageA/pages/search/index`
    });
  }

  goDetail(item) {
    Taro.navigateTo({
      url: `/pages/packageA/pages/playListDetail/index?id=${item.id}&name=${item.name}`
    });
  }

  goPage() {
    // Taro.navigateTo({
    //   url: `/pages/${pageName}/index`
    // })
    Taro.showToast({
      title: "正在开发中，敬请期待",
      icon: "none"
    });
  }

  goDjDetail(item) {
    // Taro.showToast({
    //   title: '暂未实现，敬请期待',
    //   icon: 'none'
    // })
    Taro.navigateTo({
      url: `/pages/packageA/pages/djprogramListDetail/index?id=${item.id}&name=${item.name}`
    });
  }

  removeLoading() {
    const { recommendPlayList, recommendDj } = this.props;
    if (recommendPlayList.length || recommendDj.length) {
      this.setState({
        showLoading: false
      });
    }
  }

  render() {
    const { recommendPlayList, song } = this.props;
    const { showLoading, bannerList, searchValue } = this.state;
    const { currentSongInfo, isPlaying, canPlayList } = song;
    return (
      <View
        className={classnames({
          index_container: true,
          hasMusicBox: !!song.currentSongInfo.name
        })}
      >
        <CLoading fullPage={true} hide={!showLoading} />
        <CMusic
          songInfo={{
            currentSongInfo,
            isPlaying,
            canPlayList
          }}
          isHome={true}
          onUpdatePlayStatus={this.props.updatePlayStatus.bind(this)}
        />
        <Swiper
          className="banner_list"
          indicatorColor="#999"
          indicatorActiveColor="#d43c33"
          circular
          indicatorDots
          autoplay
        >
          {bannerList.map(item => (
            <SwiperItem key={item.targetId} className="banner_list__item">
              <Image src={item.pic} className="banner_list__item__img" />
            </SwiperItem>
          ))}
        </Swiper>
        <View className="company_info">
          <View className="company_info_header">
            <View className="company_info_icon"></View>
            <View className="company_info_title">律汇赢</View>
          </View>
          <View className="company_info_data">
            <View className="company_info_data_item">
              <View className="item_icon"></View>
              <View className="item_data">23233</View>
              <View className="item_des">签约律师</View>
            </View>
            <View className="company_info_data_item">
              <View className="item_icon"></View>
              <View className="item_data">23233</View>
              <View className="item_des">服务企业</View>
            </View>
            <View className="company_info_data_item">
              <View className="item_icon"></View>
              <View className="item_data">23233</View>
              <View className="item_des">挽回损失</View>
            </View>
          </View>
          <View className="company_info_slogan">
            <View className="slogan_item">
              <View className="item_icon"></View>
              <View className="item_data">科技赋能</View>
              <View className="item_des">
                智能化私域管理，海量法律文本在线同步。
              </View>
            </View>
            <View className="slogan_item">
              <View className="item_icon"></View>
              <View className="item_data">实力雄厚</View>
              <View className="item_des">签约律师专业素养</View>
            </View>
            <View className="slogan_item">
              <View className="item_icon"></View>
              <View className="item_data">用心服务</View>
              <View className="item_des">24小时内必出文书</View>
            </View>
            <View className="slogan_item">
              <View className="item_icon"></View>
              <View className="item_data">价格公道</View>
              <View className="item_des">自动化管理，价格透明公道。</View>
            </View>
          </View>
        </View>
        {/*合伙人 信息栏*/}
        <View className="partner_info">
          <View className="partner_info_header">
            <View className="partner_info_icon"></View>
            <View className="partner_info_title">合伙人</View>
          </View>
          <View className="partner_info_data">
            <View className="partner_info_data_item">
              <View className="item_icon"></View>
              <View className="item_data">23</View>
              <View className="item_des">签约合人</View>
            </View>
            <View className="partner_info_data_item">
              <View className="item_icon"></View>
              <View className="item_data">23</View>
              <View className="item_des">覆盖城市</View>
            </View>
            <View className="partner_info_data_item">
              <View className="item_icon"></View>
              <View className="item_data">23</View>
              <View className="item_des">服务客户</View>
            </View>
            <View className="partner_info_data_item">
              <View className="item_icon"></View>
              <View className="item_data">23</View>
              <View className="item_des">收益分红</View>
            </View>
          </View>
          <View className="partner_list">
            <Swiper
              className="partner_list_swiper"
              circular
              autoplay
              disableTouch
              displayMultipleItems={3}
              interval={3000}
            >
              {[
                { phoneNum: "1667435" },
                { phoneNum: "67436" },
                { phoneNum: "1667437" },
                { phoneNum: "1667438" },
                { phoneNum: "15667439" },
                { phoneNum: "1667432" }
              ].map(item => (
                <SwiperItem key={item.phoneNum} className="partner_list_item">
                  <Image src={""} className="partner_list_item_icon" />
                  <View className="partner_list_item_title">
                    {item.phoneNum}
                  </View>
                  <View className="partner_list_item_des">开通黄金合伙人</View>
                </SwiperItem>
              ))}
            </Swiper>
          </View>
          <View className="partner_details">
            <View className="partner_details_item1">
              <Image src={""} className="partner_details_item_icon" />
              <View className="partner_details_item_title">签约墙</View>
              <View className="partner_details_item_slogan">
                自由创业，创建私域
              </View>
            </View>
            <View className="partner_details_item2">
              <View className="partner_details_item_title">招募合伙人</View>
              <View className="partner_details_item_slogan">
                万亿蓝海市场，轻松年入百万
              </View>
              <View className="partner_details_item_join">查看详情</View>
            </View>
            <View className="partner_details_item3">
              <View className="partner_details_item_title">招募达人</View>
              <View className="partner_details_item_slogan">
                丰厚分红，实力变现
              </View>
              <View className="partner_details_item_join">查看详情</View>
            </View>
          </View>
        </View>
        {/*公司产品*/}
        <View className="company_product">
          <AtTabs
            current={this.state.current}
            scroll
            tabList={[
              { title: "法律顾问" },
              { title: "法律文本" },
              { title: "合同范本" },
              { title: "客户评价" }
            ]}
            onClick={this.handleClick.bind(this)}
          >
            <AtTabsPane current={this.state.current} index={0}>
              <View style="font-size:18px;text-align:center;height:100px;">
                <View className="product_list">
                  <View className="product_list__content">
                    {recommendPlayList.map(item => (
                      <View
                        key={item.id}
                        className="legal_adviser__item"
                        onClick={this.goDetail.bind(this, item)}
                      >
                        <Image
                          src={`${item.picUrl}?imageView&thumbnail=250x0`}
                          className="legal_adviser__item__cover"
                        />
                        <View className="legal_adviser__item__title">
                          {item.name}
                        </View>
                        <View className="price_area">
                          <View className="daily">
                            <View className="daily-prefix">日常价</View>
                            <View className="daily-price">&yen;29999</View>
                          </View>
                          <View className="cheap">
                            <View className="cheap-prefix">会员价</View>
                            <View className="cheap-price">
                              <View className="icon">&yen;</View>
                              <View className="price">19999</View>
                            </View>
                          </View>
                          <View className="sell_num">已售300份</View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style="font-size:18px;text-align:center;height:100px;">
                <View className="product_list">
                  <View className="product_list__content">
                    {recommendPlayList.map(item => (
                      <View
                        key={item.id}
                        className="legal_adviser__item"
                        onClick={this.goDetail.bind(this, item)}
                      >
                        <Image
                          src={`${item.picUrl}?imageView&thumbnail=250x0`}
                          className="legal_adviser__item__cover"
                        />
                        <View className="legal_adviser__item__title">
                          {item.name}
                        </View>
                        <View className="price_area">
                          <View className="daily">
                            <View className="daily-prefix">日常价</View>
                            <View className="daily-price">&yen;29999</View>
                          </View>
                          <View className="cheap">
                            <View className="cheap-prefix">会员价</View>
                            <View className="cheap-price">
                              <View className="icon">&yen;</View>
                              <View className="price">19999</View>
                            </View>
                          </View>
                          <View className="sell_num">已售300份</View>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View style="font-size:18px;text-align:center;height:100px;">
                <View className="product_list">
                  <View className="product_list__content">
                    {recommendPlayList.map(item => (
                      <View
                        key={item.id}
                        className="legal_adviser__item"
                        onClick={this.goDetail.bind(this, item)}
                      >
                        <Image
                          src={`${item.picUrl}?imageView&thumbnail=250x0`}
                          className="legal_adviser__item__cover"
                        />
                        <View className="legal_adviser__item__cover__num">
                          <Text className="at-icon at-icon-sound"></Text>
                          {item.playCount < 10000
                            ? item.playCount
                            : `${Number(item.playCount / 10000).toFixed(0)}万`}
                        </View>
                        <View className="legal_adviser__item__title">
                          {item.name}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View style="font-size:18px;text-align:center;height:100px;">
                <View className="product_list">
                  <View className="product_list__content">
                    {recommendPlayList.map(item => (
                      <View
                        key={item.id}
                        className="legal_adviser__item"
                        onClick={this.goDetail.bind(this, item)}
                      >
                        <Image
                          src={`${item.picUrl}?imageView&thumbnail=250x0`}
                          className="legal_adviser__item__cover"
                        />
                        <View className="legal_adviser__item__cover__num">
                          <Text className="at-icon at-icon-sound"></Text>
                          {item.playCount < 10000
                            ? item.playCount
                            : `${Number(item.playCount / 10000).toFixed(0)}万`}
                        </View>
                        <View className="legal_adviser__item__title">
                          {item.name}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
        <AtTabBar
          fixed
          selectedColor="#d43c33"
          tabList={[
            { title: "发现", iconPrefixClass: "fa", iconType: "feed" },
            { title: "服务", iconPrefixClass: "fa", iconType: "music" },
            { title: "我的", iconPrefixClass: "fa", iconType: "music" }
          ]}
          onClick={this.switchTab.bind(this)}
          current={this.state.current}
        />
      </View>
    );
  }
}

export default Index;
