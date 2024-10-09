import classes from './ViewCounterData.module.css';
import ViewCounterDataItem from './ViewCounterDataItem/ViewCounterDataItem';
import React, { useEffect } from 'react';
import { useStore } from '../../../stores/storeContext';
import { observer } from 'mobx-react-lite';

const pageNumber = 1;

const ViewCounterData = observer(() => {
  const store = useStore();

  useEffect(() => {
    store.loadData().then(() => {});
  }, [store]);

  return (
    <div className={classes.dataContainer}>
      <div className={classes.content}>
        {store?.items.map((item, index) => {
          const address =
            // @ts-ignore
            store.areas.get(item.area.get('id'))?.house.address +
            // @ts-ignore
            store.areas.get(item.area.get('id'))?.str_number_full;
          return (
            <ViewCounterDataItem
              id={pageNumber * index + 1}
              idDelete={item.id}
              address={address ? address : 'loading...'}
              type={item.type}
              installation_date={item.installation_date
                .slice(0, 10)
                .split('-')
                .join('.')}
              is_automatic={item.is_automatic}
              initial_values={item.initial_values}
              description={item.description}
              handleDelete={store.deleteDataItem}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
});

export default ViewCounterData;
