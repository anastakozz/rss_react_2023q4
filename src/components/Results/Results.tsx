import { Component, ReactNode } from 'react';
import { getAllData } from '../../services/api.service';
import Cards from '../Cards';

class Results extends Component {
  state = { data: [] };

  async componentDidMount() {
    const res = await getAllData();
    this.setState({ data: res });
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
