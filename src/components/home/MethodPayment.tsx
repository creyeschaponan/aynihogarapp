import { Pressable, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../Text";

type methodPaymentData = {
  id: string;
  name: string;
  icon: any;
};

type MethodPaymentProps = {
  item: methodPaymentData;
  onPress: () => void;
  selectedMethod: any;
};

const MethodPayment = ({
  item,
  onPress,
  selectedMethod,
}: MethodPaymentProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center px-4 py-4 ${selectedMethod === item.id ? "bg-cuarto" : ""} `}
    >
      <Image
        source={item.icon}
        style={{
          width: 40,
          height: 40,
          marginRight: 10,
        }}
      />
      <Text className="text-primary font-bold text-xl">{item.name}</Text>
      {selectedMethod === item.id && (
        <View className="flex-1 items-end">
          <MaterialIcons name="check" size={32} color="orange" />
        </View>
      )}
    </Pressable>
  );
};

export { methodPaymentData, MethodPayment };
