import { Component } from 'react';
interface ListItemProps {
  label: string;
}
export class ListItem extends Component<ListItemProps> {
  render() {
    const { label } = this.props;
    return <span>{label}</span>;
  }
}
