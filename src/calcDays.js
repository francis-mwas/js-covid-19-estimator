function convertToDays(periodType) {
  let toDays;
  const data = {};

  switch (periodType) {
    case 'days':
      toDays = data.timeToElapse;
      break;
    case 'weeks':
      toDays = data.timeToElapse * 7;
      break;
    case 'months':
      toDays = data.timeToElapse * 30;
      break;
    default:
      toDays = data.timeToElapse;
  }

  return toDays;
}

export default convertToDays;
