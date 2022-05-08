import { StyleSheet } from 'react-native';
import { DrugCard } from '../AppStyle';

const styles = StyleSheet.create({
    titleIngredient: {
      fontWeight: 'bold',
      fontSize: 20
    },
    photoIngredient: {
      width: '100%',
      height: 250,
      alignSelf: 'center'
    },
    ingredientInfo: {
      color: 'black',
      margin: 10,
      fontSize: 19,
      textAlign: 'left',
      fontWeight: 'bold'
    },
    container: DrugCard.container,
    photo: DrugCard.photo,
    title: DrugCard.title,
    category: DrugCard.category
  });
  
  export default styles;
  