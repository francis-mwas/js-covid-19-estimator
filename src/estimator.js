const covid19ImpactEstimator = (data) => {
  const { reportedCases, totalHospitalBeds, region } = data;
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

  function convert() {
    let toDays = 0;
    if (data.periodType === 'days') {
      toDays = data.timeToElapse;
    } else if (data.periodType === 'weeks') {
      toDays = data.timeToElapse * 7;
    } else if (data.periodType === 'months') {
      toDays = data.timeToElapse * 30;
    }

    return toDays;
  }

  //   impact
  const impactCurInfected = reportedCases * 10;
  const impInfeByReqTime = impactCurInfected * 2 ** factor();
  const impseCaByReqTime = Math.trunc(impInfeByReqTime * 0.15);
  const impHosBedsByReqTime = Math.trunc(
    totalHospitalBeds * 0.35 - impseCaByReqTime
  );
  const impCasesForIcu = 0.05 * impInfeByReqTime;
  const impCasesForVentilators = Math.trunc(0.02 * impInfeByReqTime);

  const impDInFlight = Math.trunc(
    (impInfeByReqTime * region.avgDInInUSD * region.avgDInPoption) / convert()
  );

  //   severe
  const severeCurInfected = reportedCases * 50;
  const seInfeByRequestedTime = severeCurInfected * 2 ** factor();
  const seCaByReqTime = Math.trunc(seInfeByRequestedTime * 0.15);
  const seHosBedsByReqTime = Math.trunc(
    totalHospitalBeds * 0.35 - seCaByReqTime
  );
  const seCasesForIcu = 0.05 * seInfeByRequestedTime;
  const seCasesForVentilators = Math.trunc(0.02 * seInfeByRequestedTime);
  const seDInFlight = Math.trunc(
    (seInfeByRequestedTime * region.avgDInUSD * region.avgDInPptn) / convert()
  );

  const impact = {
    currentlyInfected: impactCurInfected,
    infectionsByRequestedTime: impInfeByReqTime,
    severeCasesByRequestedTime: impseCaByReqTime,
    hospitalBedsByRequestedTime: impHosBedsByReqTime,
    casesForICUByRequestedTime: impCasesForIcu,
    casesForVentilatorsByRequestedTime: impCasesForVentilators,
    dollarsInFlight: impDInFlight
  };

  const severeImpact = {
    currentlyInfected: severeCurInfected,
    infectionsByRequestedTime: seInfeByRequestedTime,
    severeCasesByRequestedTime: seCaByReqTime,
    hospitalBedsByRequestedTime: seHosBedsByReqTime,
    casesForICUByRequestedTime: seCasesForIcu,
    casesForVentilatorsByRequestedTime: seCasesForVentilators,
    dollarsInFlight: seDInFlight
  };

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
