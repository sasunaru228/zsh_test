import classes from './ViewCounter.module.css';
import ViewCounterHeader from './ViewCounterHeader/ViewCounterHeader';
import ViewCounterPagination from './ViewCounterPagination/ViewCounterPagination';
import ViewCounterData from './ViewCounterData/ViewCounterData';

export default function ViewCounter() {
  return (
    <div className={classes.view}>
      <ViewCounterHeader />
      <ViewCounterData />
      <ViewCounterPagination />
    </div>
  );
}
