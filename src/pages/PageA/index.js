import React, {useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import MaskSvg from '../Mask';

export default function PageA({navigation}) {
  const [type] = useState(Camera.Constants.Type.back); //state para definir câmera traseira ou frontal
  const [hasPermission, setHasPermission] = useState(null); //state para permitir uso da câmera
  const camRef = useRef (null); //referenciando a camera 
  const [capturedPhoto, setCapturedPhoto] = useState(null); //state para controlar captura de imagem
  const [open, setOpen] = useState(false); //state para controlar o modal de exibição
  
  useEffect(() => {// useEffect = 1ª vez que é executado o app
    (async () =>{
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () =>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();

 }, []);
  
  if(hasPermission === null){
    return <View/>;
  } 
  if(hasPermission === false){
    return <Text>Acesso negado!</Text>
  } 

  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri); //guardando a foto tirada
      setOpen(true);
      console.log(data);
    }
  }

  async function savePicture(){
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
    .then(() =>{
      console.log('Salvo com sucesso')
      navigation.navigate('Confirmation')
    })
    .catch(error => {
      console.log('erro',error);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef} />

      <MaskSvg/>  
      <Text style={styles.instruction}>Posicione o instrumento e o QR Code:</Text>
     
      <TouchableOpacity  style={styles.takePictureButton} onPress={ takePicture}>  
        <Image source={require('../../../assets/capture.png')} style={styles.captureButton} />
      </TouchableOpacity>

      { capturedPhoto &&
        <Modal
        animationType="slide"
        transparent={false}
        visible={open}
        >
          
          <View style={styles.modal}>
                      
            <View style={styles.iconsModal}> 
              <TouchableOpacity style={styles.iconsModalButtons} onPress={() => setOpen(false)}>
                <Image source={require('../../../assets/x.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconsModalButtons} onPress={savePicture}>
                <Image source={require('../../../assets/v.png')} />
              </TouchableOpacity>
            </View>
            
            <Image  
              style={styles.image}
              source={{uri:capturedPhoto}}
            />

          </View>
        </Modal>
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  captureButton:{
    width:90,
    height:84,
  },
  takePictureButton:{
    justifyContent:'center',
    position:'absolute',
    top:'89%',
  },
  modal:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2E2E2E',
  },
  image:{
    width:'95%',
    height:780,
    borderRadius:15,
    marginTop:20,
    marginBottom:20,
  },
  iconsModal: {
    marginTop:80,
    flexDirection:'row', 
    justifyContent:'space-between',
  },
  iconsModalButtons: {
    marginHorizontal:50,
  },
  instruction:{
    position:'absolute',
    top:60,
    fontSize:28,
    fontWeight:'bold',
    textAlign:'center'
  },

});