import convert from './calcDays';

function calcFactor(timeToElapse) {
  const how = convert(timeToElapse);

  const num = how / 3;
  const conv = Math.floor(num);
  return conv;
}

export default calcFactor;
