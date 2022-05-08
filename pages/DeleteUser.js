import React, { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import Mybutton from './components/Mybutton';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const DeleteUser = ({ navigation }) => {

  let deleteUser = async () => {
      let userID = await AsyncStorage.getItem('userID'); 
      console.log(userID)
      var data = {
        "userID": userID,
      }
      console.log(data)
      var request = new Request('http://10.0.2.2:5000/api/deleteUser', {
        method: 'POST',
        headers: new Headers({ 'Content-Type' : 'application/json', 'Accept': 'application/json' }),
        body: JSON.stringify(data)
      });
      fetch(request).then((response) => {
        response.json().then((data) => {
          console.log(data)
          if (data[0] === "Not OK")
            Alert.alert(
              'Failed',
              'User cannot be deleted',
              [
                {
                  text: 'Ok',
                },
              ],
              { cancelable: false }
            );
          else
            Alert.alert(
              'Success',
              'User deleted',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('LoginScreen'),
                },
              ],
                { cancelable: false }
              );
        });
      }).catch(function(err){
        console.log(err);
        throw err;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground    
          style={styles.imageContainer} source={require("./background.jpg")}>
      <View style={styles.overlay}>

        <View style={{ flex: 1}}>
            <View style={styles.titleContainer}>
            <Text style={styles.titleText}> Are you sure you want to delete your user? </Text>
            </View>

          <Mybutton title="Delete User" customClick={() => deleteUser()} />
  
        </View>
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DeleteUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(13, 13, 23, 0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  input: {
    height: 40,
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingLeft: 15,
},
titleContainer:{
  backgroundColor:'rgba(13, 13, 23, 0.5)',
  borderRadius:10,
  marginTop:20,
},
titleText:{
  fontSize: 20,
  fontFamily: 'RobotoBold',
  color: 'white',
  fontWeight: 'bold',
  padding: 10,
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
    backgroundColor: 'rgba(13, 13, 23, 0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
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
  pink: {
    fontSize: 50,
    fontFamily: 'RobotoBold',
    fontWeight: '700',
    color: '#ff3c98',
  },
  purple: {
    fontSize: 50,
    fontFamily: 'RobotoBold',
    fontWeight: '700',
    color: '#c056fa',
  },
});
