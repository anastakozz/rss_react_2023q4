import { Component, ReactNode } from 'react';
import { SearchContext } from '../../lib/context';
import { getAllData, searchData } from '../../services/api.service';
import Cards from '../Cards';

class Results extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  state = { data: [], prevSearch: undefined };

  async componentDidMount() {
    console.log(this.context.search);
    if (!this.state.prevSearch) {
      this.setState({ prevSearch: undefined }, () => {
        console.log('Results did mount');
      });
    }
  }

  async componentDidUpdate() {
    if (this.context.search !== this.state.prevSearch) {
      if (this.context.search === '') {
        const res = await getAllData();
        this.setState({ data: res, prevSearch: this.context.search }, () => {
          console.log('Results did update');
        });
      } else {
        const res = await searchData(this.context.search);
        this.setState({ data: res, prevSearch: this.context.search }, () => {
          console.log('Results did update');
        });
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
