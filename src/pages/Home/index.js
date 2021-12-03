import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Home({navigation}) {
 
  return (
    <View style={styles.container}>
       <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      
      <TouchableOpacity 
      style={styles.startButton}      
      onPress={ () => navigation.navigate('PageA')}
      >
     <Text style={{color:'#fff', fontSize:22}}> Começar</Text>
      </TouchableOpacity>  
    </View>
  );
 }

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E2E2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCamera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
   width: 225,
   height:225,
   marginBottom: 180,
  },
  camera: {
    flex: 1,
  },
  switchButtonView:{
    flex:1,
    backgroundColor:'transparent',
    flexDirection: 'row',
  },
  switchButton:{
   position:'absolute',
   bottom:20,
   left:20,
  },
  startButton:{
    width:190,
    height:60,
    backgroundColor:'#2B7032',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  },
  takePictureButton:{
    justifyContent:'center',
    alignItems: 'center',
    margin:20,
    width:85,
    height:80,
  },
  modal:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:20,
  },
  image:{
    width:'100%',
    height:'300',
    borderRadius:20,
  },
});

  


