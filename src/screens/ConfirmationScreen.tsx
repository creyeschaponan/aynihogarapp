import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground } from "react-native"
import theme from '../constants/theme';
export default function ConfirmationScreen() {
  return (
    <View style={styles.MensajeDeConfirmaciN}>
      <View style={styles.Group238}>
        <Text style={styles.TeEnviaremosUnCDigo}>Te enviaremos un código</Text>
        <Text style={styles.PorSmsRecibirSUnCDig}>
          Por SMS recibirás un código el cual tendrás que ingresar a
          continuación:
        </Text>
        <Image
          style={styles.Pinnumber}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/k46zd9zntw-178%3A2404?alt=media&token=e2c8d12d-f4b8-47fa-b9cf-7016a8284783",
          }}
        />
        <Text style={styles.PuedesReenviarElCDig}>
          Puedes reenviar el código en 55 segundos
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  MensajeDeConfirmaciN: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 390,
    height: 844,
    paddingLeft: 64,
    paddingRight: 51,
    paddingTop: 257,
    paddingBottom: 362,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0)",
    boxSizing: "border-box",
    backgroundColor: "rgba(242,242,242,1)",
  },
  Group238: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    boxSizing: "border-box",
  },
  TeEnviaremosUnCDigo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(242,134,39,1)",
    fontSize: 24,
    lineHeight: 1,
    fontFamily: "Inter-Regular",
    fontWeight: "900",
    textAlign: "center",
  },
  PorSmsRecibirSUnCDig: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(136,136,136,1)",
    fontSize: 12,
    lineHeight: 1.25,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    textAlign: "center",
  },
  Pinnumber: {
    width: 202.87,
    height: 12.11,
  },
  PuedesReenviarElCDig: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(136,136,136,1)",
    fontSize: 12,
    lineHeight: 1.25,
    fontFamily: "Inter-Regular",
    fontWeight: "400",
    textAlign: "center",
  },
})
