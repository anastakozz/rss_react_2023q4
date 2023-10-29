import { Component, ReactNode } from 'react';
import { Species } from '../../lib/types';
import ResultsCard from '../ResultsCard';

type CardsProps = {
  data: Species;
};

export default class Cards extends Component<CardsProps> {
  render(): ReactNode {
    return (
      <div className="grid grid-flow-dense grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {this.props.data.map((item, index) => {
          return (
            <div key={index}>
              <ResultsCard item={item}></ResultsCard>
            </div>
          );
        })}
      </div>
    );
  }
}
