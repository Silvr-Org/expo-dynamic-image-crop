import { Feather, MaterialIcons } from "@expo/vector-icons";
import { ComponentProps, ReactNode } from "react";

export type MaterialIconNames = ComponentProps<typeof MaterialIcons>["name"];
export type FeatherIconNames = ComponentProps<typeof Feather>["name"];

export type ImageData = {
  uri: string;
  width: number;
  height: number;
};

type IconProps = {
  color: string;
  text: string;
  iconName: FeatherIconNames | MaterialIconNames;
};

export type EditorOptions = {
  backgroundColor?: string;
  controlBar?: {
    position?: "top" | "bottom";
    backgroundColor?: string;
    height?: number;
    cancelButton?: IconProps;
    cropButton?: IconProps;
    backButton?: IconProps;
    saveButton?: IconProps;
  };
  coverMarker?: {
    show?: boolean;
    color?: string;
  };
  gridOverlayColor?: string;
  overlayCropColor?: string;
  /** Insets (in points) applied around the editing area to keep the crop
   *  overlay away from system UI (status bar, gesture edges, etc.). */
  contentInsets?: {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  };
};

export type ImageEditorProps = {
  editorOptions?: EditorOptions;
  minimumCropDimensions?: { width: number; height: number };
  fixedAspectRatio?: number;
  dynamicCrop?: boolean;
  onEditingCancel: () => void;
  onEditingComplete: (imageData: ImageData) => void;
  imageUri: string | null;
  processingComponent?: ReactNode;
  isVisible: boolean;
  /** Initial crop box in original image pixel coordinates.
   *  - undefined: default centered crop (normal behavior)
   *  - null: hide crop overlay until coordinates are provided
   *  - { x, y, width, height }: position overlay at these image pixel coordinates */
  initialCropBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
};
