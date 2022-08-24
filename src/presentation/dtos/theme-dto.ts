export interface ThemeDTO {
  colors: {
    background: string;
    text: string;
    details: string;
  };
  size: {
    width: number;
    height: number;
    unit: string;
  };
  html: {
    fontSize: string;
  };
}
