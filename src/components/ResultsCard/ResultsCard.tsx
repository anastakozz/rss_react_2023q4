import { Component, ReactNode } from 'react';
import { SpecieProps } from '../../lib/interfaces';

type ResultCardProps = {
  item: SpecieProps;
};

export default class ResultsCard extends Component<ResultCardProps> {
  render(): ReactNode {
    return (
      <div className="bg-slate-500 max-w-xs p-4 rounded">
        <div className="underline my-1">
          <span className="">Name: </span>
          <span className="font-bold">{this.props.item.name}</span>
        </div>
        <div>
          <span className="">Classification: </span>
          <span className="font-bold">{this.props.item.classification}</span>
        </div>
        <div>
          <span className="">Language: </span>
          <span className="font-bold">{this.props.item.language}</span>
        </div>
        <div>
          <span className="">Skin colors: </span>
          <span className="font-bold">{this.props.item.skin_colors}</span>
        </div>
        <div>
          <span className="">Average_lifespan: </span>
          <span className="font-bold">{this.props.item.average_lifespan}</span>
        </div>
      </div>
    );
  }
}
