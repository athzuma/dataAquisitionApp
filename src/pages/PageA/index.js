import React, {useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import MaskSvg from '../Mask';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function PageA({navigation}) {
  const [type] = useState(Camera.Constants.Type.back); //state para definir câmera traseira ou frontal
  const [hasPermission, setHasPermission] = useState(null); //state para permitir uso da câmera
  const camRef = useRef (null); //referenciando a camera 
  const [capturedPhoto, setCapturedPhoto] = useState(null); //state para controlar captura de imagem
  const [open, setOpen] = useState(false); //state para controlar o modal de exibição
  const [code, setCode] = useState('');
  

  
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
    return <Text>Acesso a câmera negado!</Text>
  } 

  async function takePicture(){
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri); //guardando a foto tirada
      setOpen(true);
      console.log(data);
      scanCode(data.uri);
    }
  }

  async function savePicture(){
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
    .then(() =>{
      navigation.navigate('Confirmation')
      console.log('Imagem salva') //salva a imagem e verifica se leu o qrcode
    })
    .catch(error => {
      console.log('erro',error);
    })
  }

  async function scanCode(image) {
    await BarCodeScanner.scanFromURLAsync(image,[BarCodeScanner.Constants.BarCodeType.qr])
    .then((response) => {
      if (response.length === 1) {
        setCode(response[0].data);
      } else if (response.length === 0) {
        handleError("Nenhum qr code foi detectado!");
      } else {
        handleError("Existe mais de um equipamento na imagem, tente tirar uma nova foto.");
      }
    })
    .catch((error) => {
      handleError("Não foi possível processar a imagem!");
    }); 
  }

  function handleError(message) {
    setOpen(false);
    setCapturedPhoto(null);
    alert(message);
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

            <Text style={styles.label}>{code}</Text>

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
    height: '50%',
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
    top:80,
    fontSize:22,
    fontWeight:"600"
  },
  label: {
    backgroundColor: '#3B7132',
    padding: 10,
    borderRadius: 5,
    color: 'white',
  }

});
