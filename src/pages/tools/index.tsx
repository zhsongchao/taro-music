import Taro from "@tarojs/taro";
import { Component } from "react";
import { View, Image, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtTabBar, AtSearchBar, AtIcon, AtTabs, AtTabsPane } from "taro-ui";
import { connect } from "../../utils/connect";
import classnames from "classnames";
import CLoading from "../../components/CLoading";
import CMusic from "../../components/CMusic";
import api from "../../services/api";
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
    // console.log("value->", pages[value]);
    // Taro.switchTab({ url: pages[value] });
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
        <View className="company_product">
          <AtTabs
            current={this.state.current}
            scroll
            tabList={[
              { title: "法律讲堂" },
              { title: "典型案例" },
              { title: "计算器" },
            ]}
            onClick={this.handleClick.bind(this)}
          >
            <AtTabsPane current={this.state.current} index={0}>
              <View style="font-size:18px;text-align:center;height:100px;">
                <View className="product_list">
                  <View className="product_list__content">
                  </View>
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={1}>
              <View style="font-size:18px;text-align:center;height:100px;">
                <View className="product_list">
                  <View className="product_list__content">
                  </View>
                </View>
              </View>
            </AtTabsPane>
            <AtTabsPane current={this.state.current} index={2}>
              <View style="font-size:18px;text-align:center;height:100px;">
                <View className="product_list">
                  <View className="product_list__content">
                  </View>
                </View>
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}

export default Index;
