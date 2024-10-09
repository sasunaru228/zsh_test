import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const Item = types.model({
  id: types.string,
  type: types.array(types.string),
  installation_date: types.string,
  is_automatic: types.union(types.boolean, types.null),
  initial_values: types.array(types.number),
  area: types.map(types.string),
  description: types.optional(types.union(types.string, types.null), null),
  address: types.optional(types.string, ''),
});

const AddressItem = types.model({
  id: types.string,
  number: types.number,
  str_number: types.string,
  str_number_full: types.string,
  house: types.model({
    address: types.string,
    id: types.string,
    fias_addrobjs: types.array(types.string),
  }),
});

export const DataStore = types
  .model({
    items: types.array(Item),
    areas: types.map(AddressItem),
    paginationCount: types.optional(types.number, 0),
    limit: 20,
    offset: 0,
    loading: false,
  })
  .actions((self) => ({
    loadAddresses: flow(function* (areaIds: string[]) {
      for (let i = 0; i < areaIds.length; i++) {
        if (!self.areas.has(areaIds[i])) {
          const response = yield axios.get(
            `http://showroom.eis24.me/api/v4/test/areas/${areaIds[i]}`
          );
          self.areas.set(response.data.id, response.data);
        }
      }
    }),
  }))
  .actions((self) => ({
    loadData: flow(function* () {
      self.loading = true;
      const response: any = yield axios.get(
        `http://showroom.eis24.me/api/v4/test/meters?limit=${self.limit}&offset=${self.offset}`
      );
      const data = response.data.results.map((item: any) => ({
        id: item.id,
        type: item._type,
        installation_date: item.installation_date,
        is_automatic: item.is_automatic,
        initial_values: item.initial_values,
        area: item.area,
        description: item.description,
      }));
      self.items = data;
      const AreaIds = Array.from(
        new Set([...data.map((meter: any) => meter.area.id)])
      );
      yield self.loadAddresses(AreaIds);
      self.loading = false;
    }),
    loadPagination: flow(function* () {
      const response = yield axios.get(
        `http://showroom.eis24.me/api/v4/test/meters?limit=1&offset=0`
      );
      self.paginationCount = Math.ceil(response.data.count / 20);
    }),
  }))
  .actions((self) => ({
    deleteDataItem: flow(function* (id: string) {
      yield axios.delete(`http://showroom.eis24.me/api/v4/test/meters/${id}`);
      yield self.loadData();
    }),
    changePage: flow(function* (pageNum: number) {
      self.offset = self.limit * pageNum;
      yield self.loadData();
    }),
  }));
