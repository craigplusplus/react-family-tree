import React, { Component } from 'react';
import styled from 'styled-components';

import * as CommonStyles from './../TreeStylesShared';

const TreeNodeHeader = CommonStyles.TreeHeader;

const TreeNodeActions = styled.section`
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 0.85em 0.85em 0 0;
  overflow: hidden;

  box-sizing: border-box;

  -webkit-transition: max-height 0s;
  transition: max-height 0s;
  max-height: 1em;
  max-width: 1.5em;
  padding: 0 0.2em 0.2em;

  &:hover,
  &:hover ul li a,
  &:hover ul li a:active,
  &:hover ul li a:visited {
    color: #fff;
    display: inline-block;
    width: 100%;
    text-decoration: none;
    padding: 0 0.2em;
  }

  &:hover {
    -webkit-transition: max-height 1s;
    transition: max-height 1s;
    max-height: 30em;
    max-width: 100%;
    background: #444;
    z-index: 100;
    border: 2px solid #aaa;
    border-width: 0 0 2px 0;
  }

  & > h1 {
    display: block;
    position: initial;
    height: 1.2em;
    text-indent: -100vw;
    cursor: pointer;
  }

  & > h1:after {
    display: block;
    content: '☰';
    text-indent: 0;
    position: absolute;
    top: 0;
    right: 0.3em;
  }

  & > ul {
    width: 100%;
    margin: 0 0 0.2em;
    padding: 0;
  }

  & > ul > li {
    display: block;
    text-align: left;
    border: none;
    padding: 0;
  }

  &:hover ul li:hover {
    background: #fff;
  }
  &:hover ul li:hover,
  &:hover ul li:hover a,
  &:hover ul li:hover a:active,
  &:hover ul li:hover a:visited {
    color: #000;
  }
`;

class TreeNodeMenu extends React.Component {

  constructor(props) {
    super(props);
    this.handleToggleEditable = this.handleToggleEditable.bind(this);
    this.handleAddPartner = this.handleAddPartner.bind(this);
    this.handleAddChild = this.handleAddChild.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleToggleEditable(e) {
    e.preventDefault();
    this.props.onToggleEditable();
  }

  handleAddPartner(e) {
    e.preventDefault();
    return this.props.onAddPartner(this.props.id);
  }

  handleAddChild(e, partner_id) {
    e.preventDefault();
    return this.props.onAddChild(this.props.id, partner_id);
  }

  handleDelete(e) {
    e.preventDefault();
    return this.props.onDelete(this.props.id);
  }

  render() {
    if (this.props.editable) return (
      <input type="submit" onClick={this.handleToggleEditable} value="Done Editing" />
    );
    return [
      //<a key="action_move" href="#" className="move">Move</a>,
      <TreeNodeActions key="action_list" className="tree_actions">
        <TreeNodeHeader>Edit</TreeNodeHeader>
        <ul>
          <li><a href="#" className="edit" onClick={this.handleToggleEditable}>Edit</a></li>
          {!this.props.allowPartners || <li><a href="#" className="add_partner" onClick={this.handleAddPartner}>Add Partner</a></li>}
          {this.props.partners.map(partner =>
            <li key={'addchild_' + partner.id}><a href="#{partner.id}" className="add_child" onClick={(e) => {this.handleAddChild(e, partner.id)}}>Add a child with {partner.name}</a></li>
          )}
          <li><a href="#" className="member_delete" onClick={this.handleDelete}>Delete</a></li>
        </ul>
      </TreeNodeActions>
    ];
  }

}

export default TreeNodeMenu;
