import { Text, View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Color, ColorText } from '../constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const zoomIn = {
    0: { scale: 0.9 },
    1: { scale: 1 }
};

const zoomOut = {
    0: { opacity: 1, scale: 1 },
    1: { opacity: 0.9, scale: 0.9 }
};

const OfficesItem = ({ activeItem, item } : any) => {
    return (
        <Animatable.View
            style={styles.carruselItem}
            animation={activeItem === item.id ? zoomIn : zoomOut}
            duration={500}
            useNativeDriver
        >
            <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                <Text style={styles.professionalText}>{item.name}</Text>
                <Image source={{uri: item.image}} style={styles.professionalIcon} />
            </TouchableOpacity>
        </Animatable.View>
    );
};

export default function CarrouselTech({ offices } : any) {
    const [activeItem, setActiveItem] = useState(offices[0].id);

    const viewableItemsChanged = ({ viewableItems } : any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item.id);
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 75,
    };

    return (
        <SafeAreaView style={styles.carrusel}>
            <FlatList
                data={offices}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <OfficesItem activeItem={activeItem} item={item} />
                )}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                contentContainerStyle={{ paddingHorizontal: 100 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                initialScrollIndex={0}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    carrusel: {
        marginBottom: 40,
    },
    carruselItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: Color.secondary,
        marginVertical: 10,
        paddingHorizontal: 30,
        paddingVertical: 20,
        width: 200,  // Ajustar el ancho para asegurar que el tercer elemento sea visible
    },
    professionalText: {
        fontSize: 16,
        color: ColorText.primary,
        marginBottom: 10,
        textAlign: 'center',
    },
    professionalIcon: {
        width: 150,
        height: 150,
    },
});
