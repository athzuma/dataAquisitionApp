import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Finish({navigation}) {
 
  return (
    <View style={styles.container}>
        <Text style={styles.textIdentification}>Registro armazenado com sucesso</Text>
        
        <View style={styles.viewButtons}>
            <TouchableOpacity style={styles.buttons} onPress={ () => navigation.navigate('Home')}>  
                <Image source={require('../../../assets/buttonConfirmation.png')} />
            </TouchableOpacity >
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
        height:150,
        borderRadius:12,
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        padding:37,
    },
    viewButtons:{
        flexDirection:'row', 
    },
    buttons: { 
        margin:50,
    },
    
  });