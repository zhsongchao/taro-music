// components/authorize/index.js
import {
    CACHE_USERINFO,
  } from "../../../config"
  import {
    updateUserInfo,
    updatePhone
  } from "../../api/user"



  // Component({
  //   properties: {
  //     type: {
  //       type: String,
  //       value: "UserInfo"
  //     },
  //     showAuth: {
  //       type: Boolean,
  //       value: false
  //     },
  //   },
  
  //   data: {
  //     loading: false,
  //   },
  //   /**
  //    * 组件的方法列表
  //    */
  //   lifetimes: {},
  // })
  

import Taro from "@tarojs/taro";
import { Component } from "react";
import { View } from "@tarojs/components";import { connect } from "../../utils/connect";
import classnames from "classnames";
import api from "../../services/api";

import "./index.scss";

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageDispatchProps = {
  getUserProfile: () => any;
  getPhoneNumber: () => any;
  update: () => any;
  onCancel: () => any;
};

type PageOwnProps = {};

type PageState = {
  current: number;
  showLoading: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Index {
  props: IProps;
}

@connect(
  ({ authorize }) => ({
    authorize: authorize,
  }),
  dispatch => ({
    getUserProfile(object) {
      dispatch(getUserProfile(object));
    },
    getPhoneNumber(object) {
      dispatch(getPhoneNumber(object));
    },
    update(object) {
      dispatch(update(object));
    },
    onCancel(object) {
      dispatch(onCancel(object));
    }
  })
)
class Index extends Component<IProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      showLoading: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    this.setState({
      showLoading: false
    });
  }

  componentWillMount() {}

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


  removeLoading() {
    this.setState({
      showLoading: false
    });
  }

  render() {
    return (
      <View
        className={classnames({
          index_container: true,
          hasMusicBox: !!song.currentSongInfo.name
        })}
      >
        <CLoading fullPage={true} hide={!showLoading} />
        <View className="company_product" onClick={() => {
          this.props.getUserProfile()
        }}>
        </View>
      </View>
    );
  }
}

export default Index;
