import { createContext } from "react";

export type EditorContextData = {
  minimumCropDimensions: { width: number; height: number };
  fixedAspectRatio: number;
  dynamicCrop: boolean;
  onBackPress: () => void;
  onSave: () => void;
  imageUri: string | null;
  initialCropBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
};

export const EditorContext = createContext<EditorContextData>({} as EditorContextData);
