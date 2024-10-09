import classes from './MeterType.module.css';
import ColdMeter from './Vector-2.svg';
import HotMeter from './Vector.svg';

type MeterTypeProps = {
  value: string[];
};

const MeterType = ({ value }: MeterTypeProps) => {
  return (
    <div className={classes.meterType}>
      {value[0] === 'ColdWaterAreaMeter' ? (
        <img src={ColdMeter} alt="" />
      ) : (
        <img src={HotMeter} alt="" />
      )}
      <span className={classes.meterTypeText}>
        {value[0] === 'ColdWaterAreaMeter' ? 'ХВС' : 'ГВС'}
      </span>
    </div>
  );
};

export default MeterType;
