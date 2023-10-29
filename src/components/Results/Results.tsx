import { Component, ReactNode } from 'react';
import { SearchContext } from '../../lib/context';
import { getAllData, searchData } from '../../services/api.service';
import Cards from '../Cards';
import { Species } from '../../lib/types';

class Results extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  state = { data: [], prevSearch: undefined, isLoading: true };

  async componentDidMount() {
    if (!this.state.prevSearch) {
      this.setState({ prevSearch: undefined }, () => {
        console.log('Results component did mount');
      });
    }
  }

  updateStateData(res: Species) {
    this.setState(
      { data: res, prevSearch: this.context.search, isLoading: false },
      () => {
        console.log('Results updated with new data');
      }
    );
  }

  async componentDidUpdate() {
    if (this.context.search !== this.state.prevSearch) {
      if (this.context.search === '') {
        const res = await getAllData();
        this.updateStateData(res);
      } else {
        const res = await searchData(this.context.search);
        this.updateStateData(res);
      }
    }
  }

  render(): ReactNode {
    return (
      <div>
        {this.state.isLoading ? (
          <div className="text-white py-4">Loading...</div>
        ) : (
          <div className="text-white py-4">
            {!this.state.data.length ? (
              'nothing to show'
            ) : (
              <Cards data={this.state.data} />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Results;
