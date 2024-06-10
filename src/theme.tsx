import Constants from 'expo-constants';

const FontFamily = {
    title: "Inter-Bold",
    subtitle: "Inter-SemiBold",
    text: "Inter-Regular",
    body: "Inter-Regular",
}

const fontWeight = {
    title: "600",
    subtitle: "500",
    text: "400",
    body: "400",
}

const FontSize = {
    title: 25,
    subtitle: 15,
    text: 12,
    body: 16,
}

const Color = {
    primary: "#F28627",
    secondary: "#FFFFFF",
    tertiary: "#888888",
    accent: "#f26513",
}

const theme = {
    container:{
        paddingTop: Constants.statusBarHeight + 10,
        // flex: 1,
        // flexDirection: 'column' as 'column' | 'row' | 'row-reverse' | 'column-reverse',
        backgroundColor: "#ffffff"
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
        color: Color.primary,
    },
    body: {
        fontFamily: FontFamily.body,
        fontSize: FontSize.body,
        fontWeight: fontWeight.body,
        color: Color.primary,
    },

}

export default theme ;