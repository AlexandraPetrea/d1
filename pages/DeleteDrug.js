import React, { useState } from 'react';
import { View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';

const DeleteDrug = ({ route, navigation }) => {
  let [inputUserId, setInputUserId] = useState('');
  const { itemId } = route.params;
  let deleteUser = () => {
    var data = {
        "drugID" : itemId
      }
      var request = new Request('http://10.0.2.2:5000/api/deleteDrug' , {
        method: 'POST',
        headers: new Headers({ 'Content-Type' : 'application/json', 'Accept': 'application/json' }),
        body: JSON.stringify(data)
      });
  
     isLoading && fetch(request)
      .then((response) => response.json())
      .then((json) => {setLoading(false), setUserData(json),
                Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
    })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={(inputUserId) => setInputUserId(inputUserId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete User" customClick={deleteUser} />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default DeleteDrug;
