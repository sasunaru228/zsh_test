import classes from './ViewCounterHeader.module.css';

export default function ViewCounterHeader() {
  return (
    <div className={classes.header}>
      <span>№</span>
      <span>Тип</span>
      <span>Дата установки</span>
      <span>Автоматический</span>
      <span>Текущие показания</span>
      <span>Адрес</span>
      <span>Примечание</span>
    </div>
  );
}
