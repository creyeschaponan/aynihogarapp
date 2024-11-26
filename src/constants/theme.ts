import Constants from 'expo-constants';
import { Padding } from './GlobalStyles';

export const FontFamily = {
    title: "Inter-Bold",
    subtitle: "Inter-SemiBold",
    text: "Inter-Regular",
    body: "Inter-Regular",
}

export const fontWeight = {
    title: "600",
    subtitle: "500",
    text: "400",
    body: "400",
    button: "bold",
}

export const FontSize = {
    title: 25,
    subtitle: 15,
    text: 12,
    body: 16,
    textButton: 20,
}

export const Color = {
    primary: "#F28627",
    secondary: "#FFFFFF",
    terciary: "#888888",
    accent: "#f26513",
}

export const ColorText = {
    primary: "#F28627",
    secondary: "#FFFFFF",
    terciary: "#888888",
    accent: "#f26513",
}

export const Background = {
    primary: "#FFFFFF",
    secundary: "#F28627",
    terciary: "#888888",
    accent: "#f26513",
}

export const Border = {
    primary: "#F28627",
    secondary: "#FFFFFF",
    terciary: "#888888",
    accent: "#f26513",
}

export const theme = {
    container:{
        flex: 1,
        paddingTop: Constants.statusBarHeight + 10,
        backgroundColor: Background.primary
    },
    title: {
        fontFamily: FontFamily.title,
        fontSize: FontSize.title,
        fontWeight: fontWeight.title,
        color: Color.primary,
    },
    subtitle: {
        fontFamily: FontFamily.subtitle,
        fontSize: FontSize.subtitle,
        fontWeight: fontWeight.subtitle,
        color: Color.primary,
    },
    text: {
        fontFamily: FontFamily.text,
        fontSize: FontSize.text,
        fontWeight: fontWeight.text,
        color: Color.terciary,
    },
    textAccent:{
        color: Color.accent,
        fontSize: FontSize.text,
        lineHeight: 20,
        fontWeight: "bold",
        textDecorationLine: "underline",
    },
    body: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.body,
        fontWeight: fontWeight.body
    },
    phoneInput:{
        container: {
            backgroundColor: '#ffffff',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#F28627',
            borderRadius: 0,
          },
          flagContainer: {
            backgroundColor: Background.primary,
            justifyContent: 'center',
          },
          flag: {},
          caret: {
            color: Color.primary,
            fontSize: 16,
          },
          divider: {
            backgroundColor: Background.secundary,
          },
          callingCode: {
            fontSize: 16,
            fontWeight: 'bold',
            color: Color.primary,
            FontFamily: FontFamily.text,
          },
          input: {
            paddingLeft: 0,
            color: Color.terciary,
            FontFamily: FontFamily.text,
          },
    },
    phoneInputModal:{
        modal: {
          backgroundColor: Background.secundary,
        },
        backdrop: {},
        divider: {
          backgroundColor: 'transparent',
          marginTop: 10,
        },
        countriesList: {},
        searchInput: {
          borderRadius: 0,
          borderWidth: 1,
          borderColor: Border.primary,
          color: Color.terciary,
          backgroundColor: Background.primary,
          paddingHorizontal: 12,
          height: 46,
          FontFamily: FontFamily.text,
        },
        countryButton: {
          borderWidth: 1,
          borderColor: Border.secondary,
          backgroundColor: Background.primary,
          marginVertical: 4,
          paddingVertical: 0,
          borderRadius: 0,
        },
        noCountryText: {},
        noCountryContainer: {},
        flag: {
          color: Color.terciary,
          fontSize: 20,
        },
        callingCode: {
          color: Color.terciary,
          FontFamily: FontFamily.text,
        },
        countryName: {
          color: Color.terciary,
          fontWeight: 'bold',
          FontFamily: FontFamily.text,
        },
    },
    textInput: {
        backgroundColor: Background.primary,
        justifyContent: 'center',
        color: Color.terciary,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#F28627',
        borderRadius: 0,
    },
    buttonPrimary: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Color.primary,
        height: 50,
        borderStyle: 'solid',
        borderColor: Color.primary,
    },
    buttonPrimaryDisabled:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Color.primary,
        height: 50,
        borderStyle: 'solid',
        borderColor: Color.primary,
        opacity: 0.5,
    },
    buttonText: {
        color: Color.secondary,
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 20,
        textAlign: 'center',
    },
    buttonSecundary:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Color.secondary,
        height: 50,
        // elevation: 3,
        borderStyle: 'solid',
        borderColor: Color.primary,
        borderWidth: 1,
    },
    buttonSecundaryDisabled:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: Color.secondary,
        height: 50,
        borderStyle: 'solid',
        borderColor: Color.primary,
        opacity: 0.5,
    },
    buttonTextSecundary:{
        color: Color.primary,
        fontSize: FontSize.textButton,
        fontWeight: fontWeight.button,
        lineHeight: 20,
        textAlign: 'center',
    },
}



export default theme;