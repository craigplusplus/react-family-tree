import { TreenodeWidth, TreenodeMargin } from './../TreeStylesShared';

export function getLinkerProps(p, pindex, m) {
  let childrow_width = getChildRowWidth(p,m);

  let parentrow_width = getParentRowWidth(m);
console.log('p',p);
  let childbracket = m.children[p].slice(0, -1);
  let childbracket_width = !childbracket
    ? 0
    : childbracket.reduce((sum, member) => sum + getMemberWidth(member), 0);

  let preceeding_parents_width = m.partners.slice(0, pindex).reduce((sum, partner) =>
    sum + getMemberWidth(partner)
  , 0);

  let preceeding_childlists_width = m.partners
    .slice(0, pindex)
    .reduce((outer_sum, partner) =>
      outer_sum + m.children[partner.id].reduce((inner_sum, member) =>
        inner_sum + getMemberWidth(member)
      , 0)
    , 0);

  let following_childlists = m.partners.slice(pindex + 1);
  let following_childlists_width = !following_childlists
    ? 0
    : following_childlists.reduce((outer_sum, partner) =>
      outer_sum + m.children[partner.id].reduce((inner_sum, member) =>
        inner_sum + getMemberWidth(member)
      , 0)
    , 0);

  let position_of_first_node_in_childlist_block = (
    getMemberWidth(m) - preceeding_childlists_width - following_childlists_width - childrow_width
  ) / 2;

  // set left edge of linker
  let setleft = 0; // start at left edge of member/article
  setleft += preceeding_childlists_width;// add the width of any preceeding children lists
  setleft += position_of_first_node_in_childlist_block; // move to the first node in this child list
  setleft += getNodeWidth(m) / 2; // move to center of that node
  setleft += childbracket_width / 2; // move to the center of the child list bracket

  // set right edge of linker
  let setright = 0; // start at left edge of member/article
  setright += (getMemberWidth(m) - parentrow_width) / 2; // move to position of first node in parent row
  setright += preceeding_parents_width + getNodeWidth(m); // shift forward to current parent

  let left_to_right = setleft > setright;
  if (left_to_right)
  {
    let swap = setleft;
    setleft = setright;
    setright = swap;
  }

  let setwidth = Math.abs(setright - setleft);

  return { 'childbracketWidth': childbracket_width, 'firstNodeOffset': position_of_first_node_in_childlist_block, 'setleft': setleft, 'setwidth': setwidth, 'left_to_right': left_to_right };
}

export function getNodeWidth(m) {
  return TreenodeWidth + TreenodeMargin * 2; }


export function getChildlistArray(m) {
  if (m.partners.length == 0) return [];
  return m.partners.map(p => m.children[p.id] ? m.children[p.id] : []);
}

export function getMemberWidth(m)
{
  return Math.max(
    getParentRowWidth(m),
    getFullChildlistsWidth(m));
}

export function getParentRowWidth(m) {
  return getNodeWidth(m)
    + m.partners.reduce((sum, partner) =>
      sum + getMemberWidth(partner), 0);
}

export function getChildRowWidth(pid, m) {
  if (!m.children[pid]) return 0;
  return m.children[pid].reduce((sum, member) =>
    sum + getParentRowWidth(member), 0);
}

export function getFullChildlistsWidth(m) {
  return getChildlistArray(m).reduce((a, cul) =>
      a + cul.reduce((b, cli) =>
        b + getMemberWidth(cli)
      , 0)
    , 0);
}
