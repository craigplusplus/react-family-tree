import TreeMember from './TreeMember/TreeMember';

class TreeParser {

  constructor(datalist, root) {
    this.datalist = datalist;
    this.memberlist = [];
    this.nextMemberId = 0;
    this.dereferenceMemberDataRecursively(root);
  }

  getDatalist() {
    return this.datalist;
  }

  getMemberlist() {
    return this.memberlist;
  }

  getNextMemberId() {
    return this.nextMemberId;
  }

  dereferenceMemberData(item) {
    this.nextMemberId++;
    if (typeof(item) !== 'string') return item.props === undefined ? item : item.props;
    var dfault = {'id': item, 'name': item, 'partners': [], 'children': []};

    if (this.datalist == null) return dfault;
    for (var key in this.datalist) {
      var member = this.datalist[key];
      var data = (member.props === undefined ? member : member.props);
      if (data.id !== item) continue;
      delete this.datalist[key]; // efficiency measure - assumes there is only ever one referal per person
      return data;               // TODO: instead of this, maybe future referals can become <a href=#id>
    }
    return dfault;
  }

  dereferenceMemberDataRecursively(item) {
    var root = this.dereferenceMemberData(item);

    root.partners = root.partners === undefined || root.partners === null
      ? []
      : root.partners.map(partner_item => this.dereferenceMemberDataRecursively(partner_item));

    let children = {};
    for (let i = 0; i < root.partners.length; i++) {
      let partner_id = root.partners[i].id;
      let children_array = Array.isArray(root.children) ? root.children[i] : root.children[partner_id];
      if (children_array === undefined || children_array === null || children_array.length == 0) continue;
      children[partner_id] = children_array.map(child_item => this.dereferenceMemberDataRecursively(child_item));
    }
    root.children = children;

    this.memberlist[root.id] = root;
    for (var partner in root.partners) this.memberlist[partner.id] = partner;
    for (var child in root.children) this.memberlist[child.id] = child;

    return root;
  }

}

export default TreeParser;
