import React, {
  useCallback,
  useRef,
  ReactNode,
  useImperativeHandle,
  forwardRef,
} from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

interface BottomSheetComponentProps {
  snapPoints?: Array<string | number>;
  onChange?: (index: number) => void;
  children?: ReactNode;
}

export interface BottomSheetComponentRef {
  collapseSheet: () => void;
  expandSheet: () => void;
}

const BottomSheetComponent: React.ForwardRefRenderFunction<
  BottomSheetComponentRef,
  BottomSheetComponentProps
> = ({ snapPoints = ["10%", "40%"], onChange, children }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      // console.log('handleSheetChanges', index);
      if (onChange) {
        onChange(index);
      }
    },
    [onChange]
  );

  // Exponer método público para manejar el colapso
  useImperativeHandle(ref, () => ({
    collapseSheet: () => {
      bottomSheetRef.current?.collapse();
    },
    expandSheet: () => {
      bottomSheetRef.current?.expand();
    },
  }));

  return (
    <BottomSheet
      snapPoints={snapPoints}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      index={1}
      handleIndicatorStyle={styles.handleIndicator}
      handleStyle={styles.handleStyle}
      keyboardBehavior="extend"
    >
      <View style={styles.contentContainer}>{children}</View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  handleStyle: {
    backgroundColor: "#F28627",
  },
  handleIndicator: {
    backgroundColor: "#ffffff",
    width: 100,
  },
});

export default forwardRef(BottomSheetComponent);
