import { useEffect, useState } from "react";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from "react-native";
import PrimaryButton from "../../components/PrimaryButton";
import Input from "../../components/Input";
import { useAuth } from "../../providers/AuthProvider";
import PhoneInput, { ICountry } from "react-native-international-phone-number";
import { View, Text } from "react-native-animatable";
import { supabase } from "../../lib/supabase";
import { router } from "expo-router";
import Avatar from "../../components/Avatar";
import theme from "../../constants/theme";

const Profile = (props: any) => {
  const { session, phone, setPhone } = useAuth();
  const [isProviderPhone, setIsProviderPhone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);

  useEffect(() => {
    const provider = session?.user?.identities?.[0]?.provider;
    if (provider === "phone") {
      setIsProviderPhone(true);
    } else {
      const userGoogle = session?.user?.user_metadata;
      setName(userGoogle?.full_name);
      setEmail(userGoogle?.email);
      setAvatarUrl(userGoogle?.avatar_url);
    }
  }, [session]);

  useEffect(() => {
    const provider = session?.user?.identities?.[0]?.provider;

    if (provider === "phone") {
      if (name === "" || email === "") {
        setValidated(false);
      } else {
        setValidated(true);
      }
    } else {
      if (name === "" || email === "" || phone === "" || phone.length < 11) {
        setValidated(false);
      } else {
        setValidated(true);
      }
    }
  }, [name, email, phone, session]);

  function handleInputValue(phoneNumber: string) {
    setPhone(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  const handleUpdateProfile = async (isUpdate: boolean) => {
    try {
      if (!session?.user) throw new Error("No user on the session!");
      setLoading(true);
      const phoneTotal =
        selectedCountry?.callingCode + "" + phone.replace(/ /g, "");
      const updates = {
        id: session.user.id,
        full_name: name,
        phone: phoneTotal,
        email: email,
        type: 1,
        is_active: 1,
        updated_at: new Date(),
        avatar_url: avatarUrl,
      };

      const userUpdateError = await updateUserEmail(email);
      if (userUpdateError) throw userUpdateError;

      const profileUpdateError = await upsertUserProfile(updates);
      if (profileUpdateError) throw profileUpdateError;

      // if(!isProviderPhone){
      //   const updateUserPhoneError = await updateUserPhone(phoneTotal);
      //   if (updateUserPhoneError) throw updateUserPhoneError;
      // }
      // if(isUpdate && !isProviderPhone){
      //   router.push('/(users)/verification');
      // }else{
      router.push("/(users)");
      //}
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Update Profile Error", error.message);
      } else {
        console.log(error);
        Alert.alert("Unknown Error", "An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUserPhone = async (phone: string) => {
    const { error } = await supabase.auth.updateUser({ phone });
    return error;
  };

  const updateUserEmail = async (email: string) => {
    const { error } = await supabase.auth.updateUser({ email });
    return error;
  };

  const upsertUserProfile = async (updates: any) => {
    const { error } = await supabase.from("profiles").upsert(updates);
    return error;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center bg-backgroundLight px-6 m-0">
          <Text className="text-primary text-center text-2xl font-bold mb-8">
            Confirma tu información
          </Text>
          <View className="items-center mb-6">
            <Avatar
              size={200}
              url={avatarUrl}
              onUpload={(url: string) => {
                setAvatarUrl(url);
                handleUpdateProfile(false);
              }}
            />
          </View>
          <View className="space-y-4">
            <Input text="Nombre" value={name} onChange={setName} />
            <Input
              text="Correo electrónico"
              value={email}
              onChange={setEmail}
              keyboardType="email-address"
              disabled={true}
            />
          </View>
          <View className="mt-4">
            {!isProviderPhone && (
              <PhoneInput
                value={phone}
                onChangePhoneNumber={handleInputValue}
                selectedCountry={selectedCountry}
                onChangeSelectedCountry={handleSelectedCountry}
                language="es"
                placeholder="974327438"
                defaultCountry="PE"
                phoneInputStyles={styles.phoneInput}
                modalStyles={styles.phoneInputModal}
              />
            )}
          </View>
          <View className="my-6 text-center">
            <PrimaryButton
              text="Confirmar"
              loading={loading}
              validated={validated}
              onPress={() => handleUpdateProfile(true)}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  phoneInput: {
    container: {
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#F28627",
      borderRadius: 0,
    },
    flagContainer: {
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
    },
    flag: {},
    caret: {
      color: "#F28627",
      fontSize: 16,
    },
    divider: {
      backgroundColor: "#F28627",
    },
    callingCode: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#F28627",
    },
    input: {
      paddingLeft: 0,
      color: "#F28627",
    },
  },
  phoneInputModal: {
    modal: {
      backgroundColor: "#F28627",
    },
    backdrop: {},
    divider: {
      backgroundColor: "transparent",
      marginTop: 10,
    },
    countriesList: {},
    searchInput: {
      borderRadius: 0,
      borderWidth: 1,
      borderColor: "#F28627",
      color: "#888888",
      backgroundColor: "#F28627",
      paddingHorizontal: 12,
      height: 46,
    },
    countryButton: {
      borderWidth: 1,
      borderColor: "#FFFFFF",
      backgroundColor: "#F28627",
      marginVertical: 4,
      paddingVertical: 0,
      borderRadius: 0,
    },
    noCountryText: {},
    noCountryContainer: {},
    flag: {
      color: "#888888",
      fontSize: 20,
    },
    callingCode: {
      color: "#888888",
    },
    countryName: {
      color: "#888888",
      fontWeight: "bold",
    },
  },
});

export default Profile;
