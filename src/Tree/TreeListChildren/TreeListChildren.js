import React, { Component } from 'react';
import styled from 'styled-components';
import TreeMember from './../TreeMember/TreeMember';
import * as CommonStyles from './../TreeStylesShared';

const ChildList = styled(CommonStyles.TreeList)`
  & > li {
    position: relative;
  }

  & > li:first-child:not(:last-child)::before {
    ${CommonStyles.LinkProperties}
    height: 2em;
    width: calc(100% - ${props => props.firstNodeOffset}em - ${CommonStyles.TreenodeHalfwidth}em);
    border-right-width: 0;
    border-bottom-width: 0;
    border-top-right-radius: 0;
    top: -1em;
    left: auto;
    right: 0;
  }

  & > li:last-child:not(:first-child)::before {
    ${CommonStyles.LinkProperties}
    height: 2em;
    width: ${CommonStyles.TreenodeHalfwidth}em;
    border-left-width: 0;
    border-bottom-width: 0;
    border-top-left-radius: 0;
    top: -1em;
    left: 0;
  }

  & > li:not(:first-child):not(:last-child)::before {
    ${CommonStyles.LinkProperties}
    height: 1em;
    width: 100%;
    border-left-width: 0;
    border-right-width: 0;
    border-bottom-width: 0;
    border-radius: 0;
    top: -1em;
  }

  & > li:not(:first-child):not(:last-child)::after {
    ${CommonStyles.LinkProperties}
    height: 1em;
    width: ${CommonStyles.TreenodeHalfwidth}em;
    border-top-width: 0;
    border-left-width: 0;
    border-bottom-width: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    top: -1em;
    left: 0;
  }
`;

const ChildlistHeader = styled.h2`
  ${CommonStyles.LinkProperties}
  font-size: 1em;
  top: -3em;
  height: 1em;
  border-top-width: 0;
  text-indent: -9999px;
  box-sizing: content-box;
  margin: 0;
  margin-left: ${props => props.setleft}em;
  width: ${props => props.setwidth}em;

  ${props => props.left_to_right
    ? 'border-right-width: 0; border-top-left-radius: 0; border-bottom-right-radius: 0;'
    : 'border-left-width: 0; border-top-right-radius: 0; border-bottom-left-radius: 0;'
  }

  &::before {
    ${CommonStyles.LinkProperties}
    bottom: -${props => props.childbracketWidth == 0 ? 2 : 1}em;
    height: ${props => props.childbracketWidth == 0 ? 2 : 1}em;
    border-bottom-width: 0;
    display: block;
    ${props => props.left_to_right
      ? 'right: -1em; border-left-width: 0; border-radius: 0 0.75em 0;'
      : 'left: -1em; border-right-width: 0; border-radius: 0.75em 0;'
    }
    ${props => parseInt(props.setwidth) < 1
      ? 'width: 0; right: auto; left: auto;'
      : 'width: 1em;'
    }
  }
`;


class TreeListChildren extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {}
  }

  render() {
    if (!this.props.members) return null;
    if (this.props.members.length == 0) return null;
    let ret = [];
    ret.push(<ChildlistHeader key={'childlist_header_' + this.props.parent.id} {...this.props.linkprops} childcount={this.props.members.length}>Children with <a href={'#' + this.props.parent.id}>{this.props.parent.name}</a></ChildlistHeader>);
    ret.push(<ChildList key={'childlist_' + this.props.parent.id} {...this.props.linkprops} innerRef={this.listRef}>
      {this.props.members.map(member => <li key={member.id}>
        <TreeMember
          onAddPartner={this.props.onAddPartner}
          onAddChild={this.props.onAddChild}
          onEdit={this.props.onEdit}
          onDelete={this.props.onDelete}
          {...member}
        />
      </li>)}
    </ChildList>);
    return ret;
  }
}

export default TreeListChildren;
