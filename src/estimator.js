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

  const impactCurInfected = reportedCases * 10;
  const ImpInfeByRequestedTime = impactCurInfected * 2 ** factor(timeToElapse);

  const severeCurInfected = reportedCases * 50;
  const seInfeByRequestedTime = severeCurInfected * 2 ** factor(timeToElapse);

  const impact = {
    currentlyInfected: impactCurInfected,
    infectionsByRequestedTime: ImpInfeByRequestedTime
  };

  const severeImpact = {
    currentlyInfected: severeCurInfected,
    infectionsByRequestedTime: seInfeByRequestedTime
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
