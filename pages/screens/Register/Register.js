import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Image, TouchableOpacity, KeyboardAvoidingView,
    ImageBackground,
Dimensions } from 'react-native';

// //packages
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
// import Name from './Name/Name';
import Username from './Username/Username';
import Password from './Password/Password';

const {width, height} = Dimensions.get('window');

class RegisterScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0, //0: name, 1: username, 2: password
            lastname: "",
            username: "",
            password: ""
        }
    }

    //navigate to login page
    onPressNavigateLogin = () => {
        this.props.navigation.navigate("LoginContainer");
    }

    //go back home
    onPressHome = () => {
        this.props.navigation.navigate("LoginScreen");
    }

    //when pressed return on keyboard
    onPressNext = () => {
        this.setState({page: this.state.page+1});
    }

    //set firstname on keyboard change
    setFirstName = (firstname) => {
        this.setState({firstname: firstname});
    }

    //set lastname on keyboard change
    setLastName = (lastname) => {
        this.setState({lastname: lastname});
    }

    //set username on keyboard change
    setUsername = (username) => {
        this.setState({username: username});;
    }

    //set password on keyboard change
    setPassword = (password) => {
        this.setState({password})
    }

    //navigate to home if valid
    onPressRegister = () => {
        var data = {
            // firstname: this.state.firstname,
            // lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
          }
          var request = new Request('http://10.0.2.2:5000/api/register', {
            method: 'POST',
            headers: new Headers({ 'Content-Type' : 'application/json', 'Accept': 'application/json' }),
            body: JSON.stringify(data)
          });
          fetch(request).then((response) => {
            response.json().then((data) => {
                AsyncStorage.setItem('userID', data.userID.toString()); //store userID globally
                this.props.navigation.navigate("HomeScreen");
            });
          }).catch(function(err){
            console.log(err);
        });
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <ImageBackground    
                     style={styles.imageContainer}
                     source={require("../../../assets/background.jpg")} />
                <View style={styles.overlay}>
                    {/* <View style={styles.title}>
                        <Text style={styles.pink}>Pill</Text>
                         <Text style={styles.purple}>Reminder</Text>
                    </View> */}
                    <View style = {styles.inputView}>
                        {this.state.page === 0 ?
                        <View>
                        <Username
                            onPressNext = {this.onPressNext}
                            username = {this.setUsername}/>
                        {this.state.username != "" ? 
                            <TouchableOpacity onPress = {this.onPressNext}> 
                                    <Text style = {styles.nextText}>Next</Text>
                            </TouchableOpacity> : null}
                        </View>
                            :
                            // this.state.page === 1 ?
                        <Password
                            password = {this.setPassword}
                            register = {this.onPressRegister}/>}
                    </View>
                    <View style = {styles.backView}>
                        <TouchableOpacity onPress = {this.onPressHome}>
                            <Text style = {styles.backText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
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
        backgroundColor: 'rgba(13, 13, 23, 0.3)',
        ...StyleSheet.absoluteFillObject,
      },
      title: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        // marginTop:
      },
    loginView: {
        flex: 1,
        // backgroundColor: "white",
        backgroundColor: 'rgba(13, 13, 23, 0.9)',
        ...StyleSheet.absoluteFillObject,
        

    },
    logo : {
        resizeMode:'contain',
        width: 50,
        height: 50,
    },
    logoView : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        flex: 2,
        margin: 10,
    },
    input: {
        height: 40,
        margin: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingLeft: 15,
    },
    backView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextText: {
        // color: "#F9A908",
        fontFamily: 'RobotoBold',
        fontWeight: '700',
        color: 'white',
        marginTop: 10,
        marginLeft:180,
        // fontWeight: "bold",
         fontSize: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#221eeb",
            borderRadius: 15,
            padding: 5,
            marginRight: 190,
            marginLeft: 150,
            opacity: 0.9,
            marginBottom: 50,
    },
    backText: {
        // color: "#F9A908",
        fontFamily: 'RobotoBold',
        fontWeight: '700',
        color: 'white',
        // fontWeight: "bold",
        // fontSize: 15,
        // fontFamily: "Kailasa",
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

export default RegisterScreen;