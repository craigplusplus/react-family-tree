# React Family Tree

A preliminary proof-of-concept for a React-based HTML tree structure builder. Primarily conceived for family trees, but applicable to all kinds of organizational charts where a tree structure is appropriate. A good exercise in recursive data structures in React.

## Example / Usage

See the example at [https://craigmc.info/react-family-tree](https://craigmc.info/react-family-tree)

## Current Features:

- Add and edit nodes, partner nodes, and child nodes.
- Generates semantically meaningful nested HTML.
- CSS is programatically customized to allow all sorts of relationships: multiple partners, different children with each partner, and more to come.

## Planned features:

- Customizable node data
- Move nodes (including drag-and-drop)
- Delete nodes
- Save, reload, export to HTML.
- Display a set number of levels.
-- This will permit a mobile-friendly mode that displays one level at a time.
-- Also, a nice SEO-friendly paradigm would be to pre-render a separate one-level page for every node.
- New relationships: co-parents, anything else that comes to mind.

## But how?

Built using

- [React](https://reactjs.org)
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [Styled-components](https://github.com/styled-components)
