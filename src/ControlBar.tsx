import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "./components/IconButton";
import { EditorContext } from "./context/editor";
import { usePerformCrop } from "./hooks/usePerformCrop";
import { useEditorStore } from "./store";

function ControlBar() {
  const { controlBar } = useEditorStore((s) => s.editorOptions);
  const { onBackPress, onSave } = useContext(EditorContext);
  const performCrop = usePerformCrop();

  const onEditDone = async () => {
    await performCrop();
    onSave();
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: controlBar?.backgroundColor,
          height: controlBar?.height,
        },
      ]}
    >
      <IconButton
        iconID={controlBar?.cancelButton?.iconName!}
        color={controlBar?.cancelButton?.color!}
        text={controlBar?.cancelButton?.text!}
        onPress={onBackPress}
      />
      <IconButton
        iconID={controlBar?.cropButton?.iconName!}
        text={controlBar?.cropButton?.text!}
        color={controlBar?.cropButton?.color!}
        onPress={onEditDone}
      />
    </View>
  );
}

export { ControlBar };

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
});
