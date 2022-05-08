// Autocomplete/index.js

import { View } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import Mytextinput from "../../components/Mytextinput";
const Autocomplete = ({
  value: origValue,
  label,
  data,
  containerStyle,
  onChange: origOnChange,
  icon = 'bike',
  style = {},
  menuStyle = {},
  right = () => {},
  left = () => {},
}) => {
  const [value, setValue] = useState(origValue);
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const filterData = (text) => {
    return data.filter(
      (val) => val?.toLowerCase()?.indexOf(text?.toLowerCase()) > -1
    );
  };
  return (
    <View style={[containerStyle]}>
      <Mytextinput
        onFocus={() => {
          if (value.length === 0) {
            setMenuVisible(true);
          }
        }}
        // onBlur={() => setMenuVisible(false)}
        label={label}
        right={right}
        left={left}
        style={style}
        onChangeText={(text) => {
          origOnChange(text);
          if (text && text.length > 0) {
            setFilteredData(filterData(text));
          } else if (text && text.length === 0) {
            setFilteredData(data);
          }
          setMenuVisible(true);
          setValue(text);
        }}
        value={value}
      />
      {menuVisible && filteredData && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderWidth: 2,
            flexDirection: 'column',
            borderColor: 'grey',
          }}
        >
          {filteredData.map((datum, i) => (
            <RNPickerSelect
              key={i}
              style={[{ width: '100%' }, menuStyle]}
              icon={icon}
              onPress={() => {
                setValue(datum);
                setMenuVisible(false);
              }}
              title={datum}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default Autocomplete;