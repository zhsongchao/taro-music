import Taro from "@tarojs/taro";
import { View, Image, Text, Swiper, SwiperItem } from "@tarojs/components";
import { AtTabBar, AtSearchBar, AtIcon, AtTabs, AtTabsPane } from "taro-ui";
import { useSelector, useDispatch } from "react-redux";
import classnames from "classnames";
import CLoading from "../../components/CLoading";
import CMusic from "../../components/CMusic";
import api from "../../services/api";
import appConfig from "../../app.config";
import "./home.scss";
import { fetchCompanyInfo } from "./homeThunks";
import { useEffect, useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const {
    companyInfo,
    productsList,
    loading,
    error,
    bannerList,
    partnerInfo
  } = useSelector(state => state.home);
  console.log("state.home==>", companyInfo);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // 组件挂载时，分发 fetchCompanyInfo action 来加载数据
    dispatch(fetchCompanyInfo());
  }, [dispatch]);

  const handleClick = value => {
    setCurrent(value);
  };

  return (
    <View
      className={classnames({
        index_container: true
      })}
    >
      <CLoading fullPage={true} hide={!loading} />
      <Swiper
        className="banner_list"
        indicatorColor="#999"
        indicatorActiveColor="#d43c33"
        circular
        indicatorDots
        autoplay
      >
        {bannerList.map(item => (
          <SwiperItem key={item.id} className="banner_list__item">
            <Image src={item.imageUrl} className="banner_list__item__img" />
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
                {/* <Image src={""} className="partner_list_item_icon" /> */}
                <View className="partner_list_item_title">{item.phoneNum}</View>
                <View className="partner_list_item_des">开通黄金合伙人</View>
              </SwiperItem>
            ))}
          </Swiper>
        </View>
        <View className="partner_details">
          <View className="partner_details_item1">
            {/* <Image src={""} className="partner_details_item_icon" /> */}
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
          current={current}
          scroll
          tabList={[
            { title: "法律顾问" },
            { title: "法律文本" },
            { title: "合同范本" },
            { title: "客户评价" }
          ]}
        >
          <AtTabsPane current={current} index={0}>
            <View style="font-size:18px;text-align:center;height:100px;">
              <View className="product_list">
                <View className="product_list__content">
                  {productsList[0]?.map(item => (
                    <View key={item.id} className="legal_adviser__item">
                      <Image
                        src={item.picUrl}
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
          <AtTabsPane current={current} index={1}>
            <View style="font-size:18px;text-align:center;height:100px;">
              <View className="product_list">
                <View className="product_list__content">
                  {productsList[1]?.map(item => (
                    <View key={item.id} className="legal_text__item">
                      {/* <Image
                        src={`${item.picUrl}?imageView&thumbnail=250x0`}
                        className="legal_text__item__cover"
                      /> */}
                      <View className="legal_text__item__title">
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
          <AtTabsPane current={current} index={2}>
            <View style="font-size:18px;text-align:center;height:100px;">
              <View className="product_list">
                <View className="product_list__content">
                  {productsList[2]?.map(item => (
                    <View key={item.id} className="contract_text__item">
                      {/* <Image
                        src={`${item.picUrl}?imageView&thumbnail=250x0`}
                        className="contract_text__item__cover"
                      /> */}
                      <View className="contract_text__item__cover__num">
                        <Text className="at-icon at-icon-sound"></Text>
                        {item.playCount < 10000
                          ? item.playCount
                          : `${Number(item.playCount / 10000).toFixed(0)}万`}
                      </View>
                      <View className="contract_text__item__title">
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
          <AtTabsPane current={current} index={3}>
            <View style="font-size:18px;text-align:center;height:100px;">
              <View className="product_list">
                <View className="product_list__content">
                  {productsList[3]?.map(item => (
                    <View key={item.id} className="legal_adviser__item">
                      {/* <Image
                        src={`${item.picUrl}?imageView&thumbnail=250x0`}
                        className="legal_adviser__item__cover"
                      /> */}
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
    </View>
  );
};
export default Home;
