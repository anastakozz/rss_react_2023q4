import { Component, ReactNode } from 'react';
import Button from '../Button';

class Search extends Component {
  render(): ReactNode {
    return (
      <div>
        <h1 className="text-6xl text-center text-white py-4">
          STARWARS Species
        </h1>
        <div className="flex gap-4 py-4 justify-center">
          <input className="rounded-full px-4 py-2"></input>
          <Button text="Search"></Button>
        </div>
        <hr className="w-full" />
      </div>
    );
  }
}

export default Search;
