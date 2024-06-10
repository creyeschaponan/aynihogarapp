import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"
import theme from '../theme';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={[theme.title,styles.title]}>
          Introduce tu número de Teléfono
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
    // flexDirection: "column",
    // marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",

  },
  title:{
    textAlign: "center",
  },




  
  InicioDeSesiN: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 390,
    height: 844,
    paddingLeft: 21,
    paddingRight: 40,
    paddingTop: 197,
    paddingBottom: 249,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0)",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  Group034: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  IntoduceTuNMeroDeTel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(242,134,39,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    textAlign: "center",
  },
  TeEnviaremosUnCDigoP: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(136,136,136,1)",
    fontSize: 12,
    lineHeight: 15,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    textAlign: "center",
  },
  BtnIntoducirNum: {
    position: "relative",
    width: 316,
    height: 48,
    boxSizing: "border-box",
  },
  Rectangle1: {
    position: "absolute",
    left: 39,
    width: 277,
    height: "100%",
  },
  _51976380729: {
    position: "absolute",
    top: 16,
    left: 106.27,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(136,136,136,1)",
    fontSize: 15,
    lineHeight: 15,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    textAlign: "center",
  },
  Pe: {
    position: "absolute",
    top: 16,
    left: 59.9,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(136,136,136,1)",
    fontSize: 15,
    lineHeight: 15,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    textAlign: "center",
  },
  Vector1: {
    position: "absolute",
    top: 23,
    left: 83,
    width: 5,
    height: 4,
  },
  BotonEnviar: {
    width: "100%",
    height: 54,
    paddingLeft: 69,
    paddingRight: 68,
    paddingTop: 18,
    paddingBottom: 21,
    boxSizing: "border-box",
  },
  EnviarCDigo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(255,255,255,1)",
    fontSize: 21,
    lineHeight:  21 * 0.71,
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    textAlign: "center",
  },
  BotonGoogle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingLeft: 44,
    paddingRight: 42,
    paddingTop: 18,
    boxSizing: "border-box",
  },
  Google: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(242,134,39,1)",
    fontSize: 21,
    lineHeight: 21 * 0.71,
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
    textAlign: "center",
  },
  AlUnirteANuestraApli: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(136,136,136,1)",
    fontSize: 9,
    lineHeight: 9 * 1.67,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    textAlign: "center",
  },
})
