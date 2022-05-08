import React from "react";
import { View, Text, Image,   StyleSheet,  ScrollView,  ImageBackground, Dimensions, } from "react-native";
import Mybutton from "../../components/Mybutton";
import styles from "./styles";

const {width, height} = Dimensions.get('window');

const stylesC = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    width,
    height,
    resizeMode: 'contain',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(13, 13, 23, 0.9)',
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    width: '80%',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 200,
    marginBottom: 30,
    // marginTop:
  },
  button: {
    width: '60%',
    backgroundColor: '#44f804',
    alignItems: 'center',
    padding: 20,
    marginTop: 50,
  },
  buttonText: {
    fontSize: 24,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'RobotoBold',
    fontWeight: '700',
    color: 'white',
  },
  green: {
    fontSize: 50,
    fontFamily: 'RobotoBold',
    fontWeight: '700',
    color: '#44f804',
  },
  orange: {
    fontSize: 50,
    fontFamily: 'RobotoBold',
    fontWeight: '700',
    color: '#f8a814',
  },
});

export default function SplashScreen() {
  return (
    <ScrollView style={stylesC.container}>
      <ImageBackground    style={stylesC.imageContainer} source={require("./background.jpg")} resizeMode="contain">
     <View style={stylesC.title}>
          <Text style={stylesC.green}>Up</Text>
          </View>
          <Mybutton
            title="View"
            customClick={() => navigation.navigate('View')}
          />
  </ImageBackground>
  </ScrollView>
  );
}

