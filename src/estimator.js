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

  // periodType,
  // region
  const { reportedCases, totalHospitalBeds } = data;

  //   impact
  const impactCurInfected = reportedCases * 10;
  const impInfeByReqTime = impactCurInfected * 2 ** factor();
  const impseCaByReqTime = Math.trunc(impInfeByReqTime * 0.15);
  const impHosBedsByReqTime = Math.trunc(totalHospitalBeds * 0.35) - impseCaByReqTime;

  //   severe
  const severeCurInfected = reportedCases * 50;
  const seInfeByRequestedTime = severeCurInfected * 2 ** factor();
  const seCaByReqTime = Math.trunc(seInfeByRequestedTime * 0.15);
  const seHosBedsByReqTime = Math.trunc(totalHospitalBeds * 0.35) - seCaByReqTime;

  const impact = {
    currentlyInfected: impactCurInfected,
    infectionsByRequestedTime: impInfeByReqTime,
    severeCasesByRequestedTime: impseCaByReqTime,
    hospitalBedsByRequestedTime: impHosBedsByReqTime
  };

  const severeImpact = {
    currentlyInfected: severeCurInfected,
    infectionsByRequestedTime: seInfeByRequestedTime,
    severeCasesByRequestedTime: seCaByReqTime,
    hospitalBedsByRequestedTime: seHosBedsByReqTime
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
