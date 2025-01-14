import React, {useEffect, useState, useCallback} from 'react';
import {SafeAreaView, ScrollView, FlatList} from 'react-native';

////////////naviagtion///////////////
import { useIsFocused } from '@react-navigation/native';

///////////////app components////////////////
import Header from '../../components/Header/Header';
import SellCard from '../../components/CustomCards/SellCards/SellCards';
import CustomModal from '../../components/Modal/CustomModal';

/////////////app styles///////////////////
import styles from './styles';

////////////////api////////////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////redux/////////
import {useDispatch,useSelector} from 'react-redux';
import { setItemDetail } from '../../redux/ItemSlice';

////////////screen id////////////
import ScreensNames from '../../data/ScreensNames';

const MyOrders = ({navigation, route}) => {
  //////redux variable//////////
  const dispatch = useDispatch();
  const join_as_guest=useSelector(state => state.auth.join_as_guest)
  console.log("here user status",join_as_guest)

  /////////navigation variable/////////////
  const isFocused = useIsFocused();

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

    /////////////Get Screen Logo/////////////
    const [logo, setLogo] = useState();
    const GetLogo = useCallback(async () => {
      var token = await AsyncStorage.getItem('JWT_Token');
      var headers = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      await fetch(BASE_URL + 'logos/get_logos_by_screen', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          screen_id: ScreensNames.MyGear_Screen,
        }),
      })
        .then(response => response.json())
        .then(async response => {
          setLogo(response.result[0].image);
        })
        .catch(error => {
          console.log('Error  : ', error);
        });
    }, [logo]);

  /////////////Get Notification/////////////
  const [myOrder_items, setMyOrderItems] = useState('');

  const Get_MyOrders = useCallback(async () => {
    var token = await AsyncStorage.getItem('JWT_Token');
    var user_id = await AsyncStorage.getItem('User_id');
    var headers = {
      Authorization: `Bearer ${JSON.parse(token)}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    let data = JSON.stringify({
        user_id: user_id
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: BASE_URL+'orders/get_orders_by_user_id',
        headers: headers,
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log("hre data",response.data)
        setMyOrderItems(response.data.result)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [myOrder_items]);
  useEffect(() => {
    if (isFocused && join_as_guest) {
      setModalVisible(true)
       // You can customize the a message as per your needs
     }
    Get_MyOrders();
    GetLogo()
  }, [isFocused]);
  const renderItem = ({item}) => {
    return (
      <SellCard
        //image={BASE_URL + item.images[0]}
        maintext={item.merchandise_name}
        subtext={item.location}
        price={item.price}
        description={item.merchandise_description}
        status={item.status}
        type={'orders'}
        subtext_Content={item.createdat}
        subtext_Text={'Date: '}
        images_array_length={0}
        //images_array_length={item.images.length}
        onpress={() => {
          navigation.navigate('MerchandiseDetails', {
            merchandise_id: item.id,
          });
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Header
          title={'My Oders'}
          left_icon={'chevron-back-sharp'}
          left_iconPress={() => {
            navigation.goBack();
          }}
          right_logo={BASE_URL+logo}
        />
        <FlatList
          data={myOrder_items}
          numColumns={3}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          scrollEnabled={false}
        />
      </ScrollView>
      <CustomModal
        modalVisible={modalVisible}
        onClose={()=>{setModalVisible(false), navigation.navigate('Home')}}
        text={'Alert'}
        btn_text={'Go to Login'}
        subtext={'Login First To See Content'}
        type={'single_btn'}
        guest={'confirmation'}
        onPress={() => {
          setModalVisible(false);
           navigation.navigate('Login');
        }}
      />
    </SafeAreaView>
  );
};

export default MyOrders;
