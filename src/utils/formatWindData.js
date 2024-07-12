export const getCompassDirection = (deg) => {
    if (deg >= 337.5 || deg < 22.5) {
      return 'N';
    } else if (deg >= 22.5 && deg < 67.5) {
      return 'NE';
    } else if (deg >= 67.5 && deg < 112.5) {
      return 'E';
    } else if (deg >= 112.5 && deg < 157.5) {
      return 'SE';
    } else if (deg >= 157.5 && deg < 202.5) {
      return 'S';
    } else if (deg >= 202.5 && deg < 247.5) {
      return 'SW';
    } else if (deg >= 247.5 && deg < 292.5) {
      return 'W';
    } else if (deg >= 292.5 && deg < 337.5) {
      return 'NW';
    }
  };
  
export const formatWindData = (wind, humidity) => {
  const { speed, deg, gust } = wind;
  const direction = getCompassDirection(deg);
  
  return (    
      <div>
          <p className="font-size-xxs">Humidity is at {humidity.toFixed(0)}%. Winds are blowing at {speed.toFixed(1) * 10}m.s at</p>
          <div className="d-flex weatherInfo">
              <p className='emphasize-number'>{deg}°</p>
              <p className="font-size-xxs">{direction}, but there will be brief periods when the wind speed will increase up to {(speed + gust).toFixed(1) * 10}m.s.</p>
          </div>
      </div>
  );
};