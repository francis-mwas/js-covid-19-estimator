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
  const { reportedCases, totalHospitalBeds, region } = data;

  //   impact
  const impactCurInfected = reportedCases * 10;
  const impInfeByReqTime = impactCurInfected * 2 ** factor();
  const impseCaByReqTime = Math.trunc(impInfeByReqTime * 0.15);
  const impHosBedsByReqTime = Math.trunc(
    totalHospitalBeds * 0.35 - impseCaByReqTime
  );
  const impDInFlight = Math.trunc(
    (impInfeByReqTime
      * region.avgDailyIncomeInUSD
      * region.avgDailyIncomePopulation)
      / factor()
  );

  //   severe
  const severeCurInfected = reportedCases * 50;
  const seInfeByRequestedTime = severeCurInfected * 2 ** factor();
  const seCaByReqTime = Math.trunc(seInfeByRequestedTime * 0.15);
  const seHosBedsByReqTime = Math.trunc(
    totalHospitalBeds * 0.35 - seCaByReqTime
  );
  const seDInFlight = Math.trunc(
    (seInfeByRequestedTime
      * region.avgDailyIncomeInUSD
      * region.avgDailyIncomePopulation)
      / factor()
  );

  const impact = {
    currentlyInfected: impactCurInfected,
    infectionsByRequestedTime: impInfeByReqTime,
    severeCasesByRequestedTime: impseCaByReqTime,
    hospitalBedsByRequestedTime: impHosBedsByReqTime,
    dollarsInFlight: impDInFlight
  };

  const severeImpact = {
    currentlyInfected: severeCurInfected,
    infectionsByRequestedTime: seInfeByRequestedTime,
    severeCasesByRequestedTime: seCaByReqTime,
    hospitalBedsByRequestedTime: seHosBedsByReqTime,
    dollarsInFlight: seDInFlight
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
