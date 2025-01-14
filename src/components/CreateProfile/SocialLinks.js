import React, {useState, useRef} from 'react';
import {View, Text} from 'react-native';

///////////////app components////////////////
import CustomTextInput from '../../components/TextInput/CustomTextInput';
import CustomButtonhere from '../Button/CustomButton';

//////////height and width/////////////
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

///////////////styles////////////////
import Authstyles from '../../styles/Authstyles';

////////////////////redux////////////
import {useSelector, useDispatch} from 'react-redux';
import {setLinksMenu, setCoverImageMenu} from '../../redux/CreateProfileSlice';

/////////asyc////////////
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////api//////////
import axios from 'axios';
import {BASE_URL} from '../../utills/ApiRootUrl';

const SocialLinks = ({navigation}) => {
  ////////////////redux/////////////////
  const dispatch = useDispatch();

  /////////TextInput References///////////
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  ///////////////button states/////////////
  const [loading, setloading] = useState(0);
  const [disable, setdisable] = useState(0);

  ///////////////data states////////////////////
  const [facebook, setfacebook] = useState('');
  const [insta, setInsta] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedIn, setLinkedIn] = useState('');

  //////////////Api Calling////////////////////
  const CreateSocialLinks = async () => {
    setloading(1);
    setdisable(1);
    const user_id = await AsyncStorage.getItem('User_id');
    var token = await AsyncStorage.getItem('JWT_Token');
    let data = JSON.stringify({
      userID: user_id,
      facebook: facebook,
      twitter: twitter,
      insta: insta,
      linkedin: linkedIn,
    });

    let config = {
      method: 'POST',
      url: BASE_URL + 'SocialMedia/add_social_media',
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };
    axios
      .request(config)
      .then(response => {
        setloading(0);
        setdisable(0);
        dispatch(setLinksMenu(false)), dispatch(setCoverImageMenu(true));
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View>
      <View style={{marginTop: hp(6)}}>
        <View style={{marginLeft: wp(12)}}>
          <Text style={Authstyles.textinput_title}>Social Media Links</Text>
        </View>
        <CustomTextInput
          icon={'facebook'}
          type={'iconinput'}
          term={facebook}
          returnType={'next'}
          onNext={() => {
            ref_input2.current.focus();
          }}
          placeholder="Enter Facebook Link"
          onTermChange={text => setfacebook(text)}
        />
        <CustomTextInput
          onRef={ref_input2}
          icon={'instagram'}
          type={'iconinput'}
          term={insta}
          returnType={'next'}
          onNext={() => {
            ref_input3.current.focus();
          }}
          placeholder="Enter Instagram Link"
          onTermChange={text => setInsta(text)}
        />
        <CustomTextInput
          onRef={ref_input3}
          icon={'twitter'}
          type={'iconinput'}
          term={twitter}
          returnType={'next'}
          onNext={() => {
            ref_input4.current.focus();
          }}
          placeholder="Enter Twitter Link"
          onTermChange={text => setTwitter(text)}
        />
        <CustomTextInput
          onRef={ref_input4}
          icon={'linkedin'}
          type={'iconinput'}
          term={linkedIn}
          placeholder="Enter LinkedIn Link"
          onTermChange={text => setLinkedIn(text)}
        />
      </View>
      <View style={{height: hp(20), marginTop: hp(0), marginBottom: hp(20)}}>
        <CustomButtonhere
          title={'Countinue'}
          widthset={80}
          topDistance={23}
          loading={loading}
          disabled={disable}
          onPress={() => {
            CreateSocialLinks();
          }}
        />
      </View>
    </View>
  );
};

export default SocialLinks;
