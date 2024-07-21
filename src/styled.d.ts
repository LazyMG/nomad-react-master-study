import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    point: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    pointBg: string;
    hoverColor: string;
  }
}
