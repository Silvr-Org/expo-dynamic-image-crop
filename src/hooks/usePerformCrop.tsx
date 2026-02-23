import * as ImageManipulator from "expo-image-manipulator";
import { useEditorStore } from "../store";

export const usePerformCrop = () => {
  const accumulatedPan = useEditorStore((s) => s.accumulatedPan);
  const imageBounds = useEditorStore((s) => s.imageBounds);
  const imageScaleFactor = useEditorStore((s) => s.imageScaleFactor);
  const cropSize = useEditorStore((s) => s.cropSize);
  const setProcessing = useEditorStore((s) => s.setProcessing);
  const imageData = useEditorStore((s) => s.imageData);
  const setImageData = useEditorStore((s) => s.setImageData);
  const setEditingMode = useEditorStore((s) => s.setEditingMode);

  return async () => {
    try {
      let originX = Math.round(
        (accumulatedPan.x - imageBounds.x) * imageScaleFactor
      );
      let originY = Math.round(
        (accumulatedPan.y - imageBounds.y) * imageScaleFactor
      );
      let width = Math.round(cropSize.width * imageScaleFactor);
      let height = Math.round(cropSize.height * imageScaleFactor);

      // Clamp to valid image bounds
      originX = Math.max(0, originX);
      originY = Math.max(0, originY);
      width = Math.min(width, imageData.width - originX);
      height = Math.min(height, imageData.height - originY);
      width = Math.max(1, width);
      height = Math.max(1, height);

      setProcessing(true);
      const cropResult = await ImageManipulator.manipulateAsync(imageData.uri, [
        { crop: { originX, originY, width, height } },
      ]);
      const { uri, width: w, height: h } = cropResult;
      setImageData({ uri, width: w, height: h });
      setProcessing(false);
    } catch (error) {
      console.warn("Crop failed:", error);
      setProcessing(false);
    }
  };
};
