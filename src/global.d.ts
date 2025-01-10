declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      alt?: string;
      ar?: boolean;
      "ar-modes"?: string;
      "camera-controls"?: boolean;
      "shadow-intensity"?: string;
      poster: string;
      exposure?: string;
      style?: React.CSSProperties;
    };
  }
}
