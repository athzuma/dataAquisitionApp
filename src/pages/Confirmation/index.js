import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Confirmation({navigation}) {
 
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Instrumento identificado</Text>
        <Text style={styles.textIdentification}>YA - 123</Text>
        
        <View style={styles.viewButtons}>
            <TouchableOpacity style={styles.buttons} onPress={ () => navigation.navigate('Finish')}>  
                <Image source={require('../../../assets/buttonConfirmation.png')} />
            </TouchableOpacity >
            <TouchableOpacity style={styles.buttons} onPress={ () => navigation.navigate('PageA')}>  
                <Image source={require('../../../assets/buttonTryAgain.png')} />
            </TouchableOpacity>
        </View>
    </View>
  );
 }
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#2E2E2E',
    },
    text: {
      color:'#fff',
      fontSize:25,
      margin:50,
    },
    textIdentification: {
        backgroundColor:'#2B7032',
        color:'#fff',
        fontSize:25,
        margin:50,
        width:340,
        height:55,
        borderRadius:12,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
    },
    viewButtons:{
        flexDirection:'row', 
    },
    buttons: { 
        margin:50,
    },
    
  });