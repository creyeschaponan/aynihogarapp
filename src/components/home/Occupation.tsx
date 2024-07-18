import { TouchableOpacity, View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Text from "../Text";

type occupationData = {
  id: number;
  name: string;
  image: string;
};

type OccupationProps = {
  item: occupationData;
  onPress: () => void;
  isSelected: boolean;
};

const Occupations = ({ item, onPress, isSelected }: OccupationProps) => {
  return (
    <TouchableOpacity
      className={`flex flex-row self-center mx-4 ${isSelected ? "bg-accent pl-4 pr-2 pb-1 pt-1" : ""}`}
      onPress={onPress}
    >
      <View className="items-center">
        <Image source={{ uri: item.image }} style={{ width: 50, height: 50 }} />
        {isSelected && (
          <Text className="text-xs mt-2 text-secondary font-bold">
            {item.name}
          </Text>
        )}
      </View>
      {isSelected && (
        <View className="ml-2">
          <MaterialIcons name="check" size={24} color="#ffffff" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export { occupationData, Occupations };
