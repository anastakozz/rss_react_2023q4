import { Component, ReactNode } from 'react';
import { SearchContext } from '../../lib/context';
import { getAllData, searchData } from '../../services/api.service';
import Cards from '../Cards';
import { Species } from '../../lib/types';

class Results extends Component {
  static contextType = SearchContext;
  declare context: React.ContextType<typeof SearchContext>;
  state = { data: [], prevSearch: undefined, isLoading: true };

  updateStateData(res: Species) {
    this.setState({
      data: res,
      prevSearch: this.context.search,
      isLoading: false,
    });
  }

  async getData() {
    const { prevSearch } = this.state;
    const search = this.context.search;

    if (search !== prevSearch) {
      if (search === '') {
        try {
          const res = await getAllData();
          this.updateStateData(res);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          const res = await searchData(search);
          this.updateStateData(res);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  componentDidMount() {
    if (!this.state.prevSearch) {
      this.setState({ prevSearch: undefined });
    }
  }

  async componentDidUpdate() {
    const { isLoading, prevSearch } = this.state;

    if (!isLoading && this.context.search !== prevSearch) {
      this.setState({ isLoading: true });
    } else {
      this.getData();
    }
  }

  render(): ReactNode {
    const { isLoading, data } = this.state;
    return (
      <>
        {isLoading ? (
          <div className="text-white py-4">Loading...</div>
        ) : (
          <div className="text-white py-4">
            {!data.length ? 'nothing to show' : <Cards data={data} />}
          </div>
        )}
      </>
    );
  }
}

export default Results;
