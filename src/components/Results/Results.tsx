import { SearchContext } from '../../lib/context';
import { Component, ReactNode } from 'react';
import { getAllData, searchData } from '../../services/api.service';
import Cards from '../Cards';

class Results extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  state = { data: [], prevSearch: '' };

  updateState(value: string) {
    this.setState({ param: value });
  }

  async componentDidUpdate() {
    if (this.context.search !== this.state.prevSearch) {
      if (this.context.search === '') {
        const res = await getAllData();
        this.setState({ data: res, prevSearch: this.context.search });
      } else {
        const res = await searchData(this.context.search);
        this.setState({ data: res, prevSearch: this.context.search });
      }
    }
  }

  render(): ReactNode {
    return (
      <>
        <div className="text-white py-4">
          {!this.state.data.length ? (
            'Please, wait a little'
          ) : (
            <Cards data={this.state.data} />
          )}
        </div>
      </>
    );
  }
}

export default Results;
