import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

////////////////app pakages////////////
import {Snackbar} from 'react-native-paper';

//////////////////firebase////////////////
import firestore from '@react-native-firebase/firestore';

///////////////app code fields/////////////
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

///////////////timer/////////////////////
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

/////////////////app components/////////////////
import CustomButtonhere from '../../components/Button/CustomButton';
import CustomModal from '../../components/Modal/CustomModal';
import Loader from '../../components/Loader/Loader';

/////////////////////app styles/////////////////////
import Authstyles from '../../styles/Authstyles';
import Logostyles from '../../styles/Logostyles';
import styles from './styles';

////////////////height and width/////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//////////////svgs/////////////
import Logo from '../../assets/svgs/Logo.svg';

///////////token function//////////
import {checkPermission} from '../../api/FCMToken';

/////////asyc////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////api//////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';

///////////firebase auth/////////////
import auth from '@react-native-firebase/auth';

///////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {
  setUserPhone_No,
  setUserId,
  setJWT_Token,
  setUserPhone_Country_Code,
} from '../../redux/AuthSlice';

const Verification = ({navigation, route}) => {
  //////////loader state/////
  const [isLoading, setLoading] = useState(false);

  ////////redux////////////
  const dispatch = useDispatch();
  const {} = useSelector(state => state.auth);
  /////////////previous data state///////////////
  const [predata] = useState(route.params);

  ///////////////button states/////////////
  const [visible, setVisible] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({value: '', color: ''});
  const onDismissSnackBar = () => setVisible(false);

  ///////////////Modal States///////////////
  const [modalVisible, setModalVisible] = useState(false);

  /////////////timer state///////////////
  const [disabletimer, setdisableTimer] = useState(false);

  //////////time function//////////
  const children = ({remainingTime}) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return `${minutes}:${seconds}`;
  };
  //code Confirmation states
  const [value, setValue] = useState();
  //cell number
  const CELL_COUNT = 6;

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //button states
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
    }
  }
  const [count, setCount] = useState(0);
  useLayoutEffect(() => {
    if (count === 0) {
      setLoading(true);
      signInWithPhoneNumber(predata.country_code + predata.phone_number);
      return;
    } else {
      console.log('here no function');
    }
  });

  ///////////autn confirmation status/////////////
  const [confirm, setConfirm] = useState();

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    setCount(count + 1);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('here data code', confirmation.verificationId);
    setConfirm(confirmation);
    setLoading(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function confirmCode() {
    setCount(count + 1);
    try {
      await confirm.confirm(value);
      SigUpUser()
    } catch (error) {
      console.log('Invalid code.',error);
      setsnackbarValue('Invalid code, Please Enter Valid one')
    }
    // const credential = auth.PhoneAuthProvider.credential(
    //   confirm.verificationId,
    //   value,
    // );
    // console.log('code', credential);
    // const user = await auth().signInWithCredential(credential);
    // console.log('user', user);
    // let userData = await auth().currentUser.linkWithCredential(credential);
    // console.log('user userData', userData);
    //SigUpUser()
  }
  //////////////Api Calling////////////////////
  const SigUpUser = async () => {
    const device_id = await AsyncStorage.getItem('Device_id');
    console.log('here toke', device_id);
    axios({
      method: 'post',
      url: BASE_URL + 'auth/sign_up',
      data: {
        phone: predata.phone_number,
        country_code: predata.country_code,
        deviceToken: device_id,
      },
    })
      .then(async function (response) {
        console.log('here id', response.data);
        if (response.data.status === true) {
          const string_id = response.data.result[0].id.toString();
          dispatch(setUserId(response.data.result[0].id));
          dispatch(setUserPhone_No(response.data.result[0].phone));
          dispatch(
            setUserPhone_Country_Code(response.data.result[0].country_code),
          );
          dispatch(setJWT_Token(JSON.stringify(response.data.jwt_token)));
          await AsyncStorage.setItem('User_id', string_id);
          await AsyncStorage.setItem(
            'JWT_Token',
            JSON.stringify(response.data.token),
          );
          firebase_store_user(response.data.result[0].id);
          navigation.navigate('CreateProfile');
          setloading(0);
          setdisable(0);
          //setModalVisible(true)
        } else {
          setloading(0);
          setdisable(0);
          SignInUser();
        }
      })
      .catch(function (error) {
        setloading(0);
        setdisable(0);
        if (error) {
          console.log('error', error);
        }
      });
  };

  //////////////Api Calling////////////////////
  const SignInUser = async () => {
    const device_id = await AsyncStorage.getItem('Device_id');
    console.log('here toke', device_id);
    axios({
      method: 'post',
      url: BASE_URL + 'auth/sign_in',
      data: {
        phone: predata.phone_number,
        country_code: predata.country_code,
        deviceToken: device_id,
      },
    })
      .then(async function (response) {
        console.log('here id', response.data);
        if (response.data.status === true) {
          const string_id = response.data.result[0].id.toString();
          dispatch(setUserId(response.data.result[0].id));
          dispatch(setUserPhone_No(response.data.result[0].phone));
          dispatch(
            setUserPhone_Country_Code(response.data.result[0].country_code),
          );
          dispatch(setJWT_Token(JSON.stringify(response.data.jwt_token)));
          await AsyncStorage.setItem('User_id', string_id);
          await AsyncStorage.setItem(
            'JWT_Token',
            JSON.stringify(response.data.token),
          );
          //firebase_store_user(response.data.result.customer_id);
          navigation.navigate('Drawerroute');
          setloading(0);
          setdisable(0);
          //setModalVisible(true)
        } else {
          setloading(0);
          setdisable(0);
          signI;
          //navigation.navigate('CreateProfile');
        }
      })
      .catch(function (error) {
        setloading(0);
        setdisable(0);
        if (error) {
          console.log('error', error);
        }
      });
  };

  ////////////firebase store function/////////////////
  const firebase_store_user = props => {
    firestore().collection('Users').add({
      id: props,
      phoneNo: predata.phone_number,
      country_code: predata.country_code,
    });
    // .then(() => {
    //   setEmail('');
    //   setPassword('');
    //   navigation.navigate('Login');
    // });
  };
  useEffect(() => {
    checkPermission();
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={isLoading} />
      <View style={[Logostyles.Logoview, {marginTop: hp(10)}]}>
        <Logo width={wp(45)} height={hp(11)} />
      </View>
      <View style={[Authstyles.textview, {marginBottom: hp(0)}]}>
        <Text style={Authstyles.maintext}>Verification</Text>
        <Text style={Authstyles.subtext}>
          Enter 6-digit code that you received on your phone number
        </Text>
      </View>
      <View style={styles.Cellview}>
        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : '0')}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: wp(83),
          alignSelf: 'center',
          marginTop: hp(0.5),
        }}>
        <View style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
          {disabletimer == true ? (
            <CountdownCircleTimer
              size={40}
              strokeWidth={0}
              children={children}
              isPlaying
              duration={7}
              initialRemainingTime={15}
              colors={['#004777', '#F7B801', '#A30000', '#A30000']}
              colorsTime={[7, 5, 2, 0]}
              onComplete={() => {
                setdisableTimer(false);
                // do your stuff here
                //return { shouldRepeat: true, delay: 1.5 } // repeat animation in 1.5 seconds
              }}>
              {({remainingTime}) => (
                <Text style={{color: 'black', fontSize: hp(2)}}>
                  {remainingTime}(s)
                </Text>
              )}
            </CountdownCircleTimer>
          ) : null}
        </View>
        {/* <TouchableOpacity
          disabled={disabletimer}
          onPress={() => setdisableTimer(true)}
          style={{marginLeft: wp(8)}}>
          <Text style={styles.Cellmaintext}>Resend Code</Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.buttonview}>
        <CustomButtonhere
          title={'Submit'}
          widthset={80}
          topDistance={35}
          // loading={loading}
          // disabled={disable}
          onPress={() =>
            confirmCode()
            //SigUpUser()
          }
        />
      </View>
      <CustomModal
        modalVisible={modalVisible}
        text={'Success'}
        btn_text={'Go to Create Profile'}
        subtext={'Account Verified Successfully'}
        type={'single_btn'}
        onPress={() => {
          setModalVisible(false);
           navigation.navigate('CreateProfile');
        }}
      />
              <Snackbar
          duration={400}
          visible={visible}
          onDismiss={onDismissSnackBar}
          style={{
            backgroundColor: snackbarValue.color,
            marginBottom: hp(20),
            zIndex: 999,
          }}>
          {snackbarValue.value}
        </Snackbar>
    </SafeAreaView>
  );
};

export default Verification;
