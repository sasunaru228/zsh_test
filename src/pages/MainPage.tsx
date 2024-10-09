import classes from './MainPage.module.css';
import ViewCounter from '../components/ViewCounter/ViewCounter';
import './../stores/store';

export default function MainPage() {
  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <span className={classes.main_header}>Список счётчиков</span>
        <ViewCounter />
      </div>
    </div>
  );
}
