import { action, makeObservable, observable } from 'mobx';

export interface SearchStoreInterface {
  filter: string;
  setFilter: (filter: string) => void;
}

class SearchStore implements SearchStoreInterface {
  @observable filter = '';

  constructor() {
    makeObservable(this);
  }

  @action setFilter = async (filter: string) => {
    this.filter = filter;
  };
}

export default new SearchStore();
