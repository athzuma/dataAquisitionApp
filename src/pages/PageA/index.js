import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

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
      alert('Salvo com sucesso!')
    })
    .catch(error => {
      console.log('erro',error);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef} >
        <View></View>
      </Camera>    
     
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
              <TouchableOpacity style={styles.iconsModalButtons} onPress={ () => navigation.navigate('Confirmation')}>
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
  },
  camera: {
    flex: 1,
  },
  captureButton:{
    width:90,
    height:84,
  },
  takePictureButton:{
    justifyContent:'center',
    alignItems: 'center',
    position:'absolute',
    top:'80%',
    left:'40%',
    backgroundColor:'transparent',
    width:90,
    height:84,
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

});