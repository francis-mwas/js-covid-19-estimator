const covid19ImpactEstimator = (data) => {
  function factor() {
    let toDays = 0;
    if (data.periodType === 'days') {
      toDays = data.timeToElapse;
    } else if (data.periodType === 'weeks') {
      toDays = data.timeToElapse * 7;
    } else if (data.periodType === 'months') {
      toDays = data.timeToElapse * 30;
    }

    return Math.trunc(toDays / 3);
  }
  // population,
  // totalHospitalBeds,
  // periodType,
  // region
  const { reportedCases } = data;

  const impactCurInfected = reportedCases * 10;
  const ImpInfeByRequestedTime = impactCurInfected * 2 ** factor();

  const severeCurInfected = reportedCases * 50;
  const seInfeByRequestedTime = severeCurInfected * 2 ** factor();

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
