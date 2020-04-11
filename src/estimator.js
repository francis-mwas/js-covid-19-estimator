const covid19ImpactEstimator = (data) => {
  function convert(periodType) {
    let toDays;
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

  function factor(timeToElapse) {
    const how = convert(timeToElapse);

    const num = how / 3;
    const conv = Math.floor(num);
    return conv;
  }
  // population,
  // totalHospitalBeds,
  // periodType,
  // region
  const { timeToElapse, reportedCases } = data;

  const curInfected = reportedCases * 10;
  const infeByRequestedTime = curInfected * 2 ** factor(timeToElapse);

  const impact = {
    currentlyInfected: curInfected,
    infectionsByRequestedTime: infeByRequestedTime
  };

  return {
    data,
    impact
  };
};

export default covid19ImpactEstimator;
