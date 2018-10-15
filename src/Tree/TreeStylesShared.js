import React, { Component } from 'react';
import styled, { css } from 'styled-components';

export const TreenodeWidth = 14;
export const TreenodeMargin = 0.5;
export const TreenodeHalfwidth = TreenodeWidth / 2 + TreenodeMargin;
export const BorderWidthUnits = '2px';
export const BorderRadiusUnits = '0.75em';

export const LinkProperties = css`
  content:" ";
  position: absolute;
  border: ${BorderWidthUnits} solid #BD8565;
  border-radius: ${BorderRadiusUnits};
  box-sizing: border-box;
  z-index: 1;
`;

export const TreeList = styled.ul`
  display: inline-block;
  margin: 0;
  padding: 0;
  & > li {
    list-style: none;
    display: inline-block;
    margin: 0;
    padding: 0;
  }
`;

export const VisuallyHidden = styled.div`
  display: block;
  height: 0;
  width: 0;
  position: absolute;
  left: -9999px;
`;

export const TreeHeader = styled.h1`
  font-size: 1em;
  margin: 0;
  padding: 0;
  max-width: 100%;
  box-sizing: border-box;
`;

export const VisuallyHiddenSubheader = VisuallyHidden.withComponent('h2');

//export const TreeSubheader = TreeHeader.withComponent('h1');
