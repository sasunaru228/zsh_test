import classes from './ViewCounterDataItem.module.css';
import MeterType from './MeterType/MeterType';

interface DataItemProps {
  id: number;
  idDelete: string;
  address: string | undefined; // пофиксить ANY
  type: string[];
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number[];
  description: string | null;
  handleDelete: Function;
}

export default function ViewCounterDataItem({
  id,
  idDelete,
  address,
  type,
  installation_date,
  is_automatic,
  initial_values,
  description,
  handleDelete,
}: DataItemProps) {
  return (
    <div className={classes.dataRow}>
      <div className={classes.left}>
        <span>{id}</span>
        <span>
          <MeterType value={type} />
        </span>
        <span>{installation_date}</span>
        <span>{is_automatic ? 'Да' : 'Нет'}</span>
        <span>{initial_values}</span>
        <span>{address}</span>
        <span>{description}</span>
      </div>
      <span
        className={classes.buttonDelete}
        onClick={() => handleDelete(idDelete)}
      >
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.33331 6.00002V12H4.99998V6.00002H6.33331Z" />
          <path d="M8.99998 6.00002V12H7.66665V6.00002H8.99998Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.85281 0.666687H10.1472L10.8138 2.66669H13.6666V4.00002H12.3333L11.6666 15.3334H2.33331L1.66665 4.00002H0.333313V2.66669H3.18614L3.85281 0.666687ZM4.5916 2.66669H9.40836L9.18614 2.00002H4.81382L4.5916 2.66669ZM2.99998 4.00002L3.66665 14H10.3333L11 4.00002H2.99998Z"
          />
        </svg>
      </span>
    </div>
  );
}
