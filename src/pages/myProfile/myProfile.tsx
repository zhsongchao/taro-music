import Taro from "@tarojs/taro";
import { AtTabBar, AtIcon, AtSearchBar } from "taro-ui";
import classnames from "classnames";
import { View, Image, Text } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";
import CLoading from "../../components/CLoading";
import "./myProfile.scss";
import { useEffect, useState } from "react";


const MyProfile = props => {

  const { userInfo, loading, error } = useSelector(
    state => state.user
  );
  // const [userInfo, setUserInfo] = useState(Taro.getStorageSync("userInfo"));

  // 使用 useDispatch 来分发 actions
  const dispatch = useDispatch();

  // 替代 componentWillReceiveProps
  useEffect(() => {
    console.log(props);
  }, [dispatch]);

  return (
    <View
      className={classnames({
        my_container: true
      })}
    >
      <View className="header">
        <View
          className="header__left"
          
        >
          <Image
            src={`${userInfo?.profile?.avatarUrl}?imageView&thumbnail=250x0`}
            className="header__img"
          />
          <View className="header__info">
            <View
              className="header__info__name"
              onClick={() => {
                if (!userInfo?.profile?.nickname) {
                  
                }
              }}
            >
              {userInfo?.profile?.nickname
                ? userInfo?.profile?.nickname
                : "点击登录"}
            </View>
            <View>
              <Text className="header__info__level">LV.{userInfo.level}</Text>
            </View>
          </View>
        </View>
        <AtIcon
          prefixClass="fa"
          value="sign-out"
          size="30"
          color="#d43c33"
          className="exit_icon"
          
        ></AtIcon>
      </View>
      <View className="user_count">
        <View
          className="user_count__sub"
          
        >
          <View className="user_count__sub--num">
            {userInfo?.profile?.eventCount || 0}
          </View>
          <View>合伙人</View>
        </View>
        <View
          className="user_count__sub"
          
        >
          <View className="user_count__sub--num">
            {userInfo?.profile?.eventCount || 0}
          </View>
          <View>合伙人分红</View>
        </View>
      </View>
      <View className="user_brief">
        <View className="user_brief__item">
          <Image
            className="user_brief__item__img"
            src={require("../../assets/images/my/recent_play.png")}
          />
          <View
            className="user_brief__item__text"
            
          >
            <Text>我的订单</Text>
            <Text className="at-icon at-icon-chevron-right"></Text>
          </View>
        </View>
        <View className="user_brief__item">
          <Image
            className="user_brief__item__img"
            src={require("../../assets/images/my/my_radio.png")}
          />
          <View
            className="user_brief__item__text"
            
          >
            <Text>合伙人介绍</Text>
            <Text className="at-icon at-icon-chevron-right"></Text>
          </View>
        </View>
        <View className="user_brief__item">
          <Image
            className="user_brief__item__img"
            src={require("../../assets/images/my/my_radio.png")}
          />
          <View
            className="user_brief__item__text"
            
          >
            <Text>成为合伙人</Text>
            <Text className="at-icon at-icon-chevron-right"></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyProfile;
