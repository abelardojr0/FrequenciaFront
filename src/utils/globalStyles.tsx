import styled, { createGlobalStyle } from 'styled-components';
import { cores } from './theme';
import responsivo, { breakpoints } from './responsive';

export const GlobalStyles = createGlobalStyle`
  * {
    scroll-behavior: smooth;
    box-sizing: border-box;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    font-family: "Poppins", sans-serif;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    background-color: ${cores.fundo_base};
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  input[type="date"]::-webkit-calendar-picker-indicator, input[type="time"]::-webkit-calendar-picker-indicator {
  filter: invert(26%) sepia(86%) saturate(4800%) hue-rotate(355deg) brightness(90%) contrast(97%);
}


`;

export const TitlePage = styled.h1`
  font-size: 48px;
  font-family: 'Roboto Condensed', sans-serif;
  color: ${cores.texto_base};
  margin-bottom: 20px;
`;

export const SubtitlePage = styled.h2`
  font-size: 28px;
  margin-top: 20px;
  color: ${cores.cor_principal};
  font-weight: bold;
`;

interface Props {
  columns?: number;
}
export const ContainerGrid = styled.section<Props>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 4}, 1fr);
  gap: 15px;
  ${responsivo(breakpoints.desktop)} {
    grid-template-columns: repeat(3, 1fr);
  }
  ${responsivo(breakpoints.tablet)} {
    grid-template-columns: 1fr;
  }
`;

export const CardTitle = styled.h2`
  font-size: 20px;
  color: ${cores.cor_principal};
  font-weight: bold;
`;

export const CardText = styled.span`
  font-size: 18px;
  color: ${cores.texto_base};
  font-weight: 400;
`;

export const FormStyled = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin-top: 20px;
`;

export const ContainerAuth = styled.main`
  border-radius: 20px;
  padding: 15px;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;
