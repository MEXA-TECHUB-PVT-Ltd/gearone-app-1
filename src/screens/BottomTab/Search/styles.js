import React from 'react';
import {StyleSheet} from 'react-native';

////////////colors/////////
import Colors from '../../../utills/Colors';

////////height and width////////////
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

////////////////app fonts///////////
import {fontFamily} from '../../../constant/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor:Colors.AppBckGround_color
  },
  horizontal_lefttext:{
    fontFamily:fontFamily.Poppins_Regular,
    color:'white',
    fontSize:hp(2)
      },
      horizontal_righttext:{
        fontFamily:fontFamily.Poppins_Regular,
        color:'#B1B1B1',
        fontSize:hp(1.8)
          },
});
export default styles;
