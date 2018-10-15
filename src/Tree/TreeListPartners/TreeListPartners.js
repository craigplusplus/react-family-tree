import React, { Component } from 'react';
import styled from 'styled-components';
import TreeMember from './../TreeMember/TreeMember';
import * as CommonStyles from './../TreeStylesShared';

const VisuallyHidden = CommonStyles.VisuallyHidden;

const VisuallyHiddenHeader = CommonStyles.VisuallyHidden.withComponent('h1');

const TreePartnerSection = styled.section`
  position: relative;
  vertical-align: top;
  display: inline-block;
`;
const PartnerList = styled(CommonStyles.TreeList)`
  & > li {
    position: relative;
  }

  /* U shaped link between all partners */
  &::after {
    ${CommonStyles.LinkProperties}
    width: 100%;
    height: 100%;
    border-top-width: 0;
    bottom: -1em;
    left: -${CommonStyles.TreenodeWidth / 2 + CommonStyles.TreenodeMargin}em;
  }

  /* Inner partner connections */
  & > li:not(:last-child)::after {
    ${CommonStyles.LinkProperties}
    width: ${CommonStyles.TreenodeWidth / 2 + CommonStyles.TreenodeMargin}em;
    height: 100%;
    border-top-width: 0;
    border-left-width: 0;
    border-bottom-left-radius: 0;
    bottom: -1em;
    left: 0;
  }
`;

class TreeListPartners extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.members.length == 0) return null;
    return (
      <TreePartnerSection>
        <VisuallyHiddenHeader>Partners</VisuallyHiddenHeader>
        <PartnerList>
          {this.props.members.map(member =>
            <li key={'partner_' + member.id}>
              <TreeMember
                onAddPartner={this.props.onAddPartner}
                onAddChild={this.props.onAddChild}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete}
                allowPartners={false}
                {...member}
              />
            </li>
          )}
        </PartnerList>
      </TreePartnerSection>
    )
  }

}

export default TreeListPartners;
