export interface AuditDelayInputs {
  companySize: string;
  soc2Stage: string;
  avgDealSize: number;
  dealsBlocked: number;
  expectedDelay: string;
}

export interface AuditDelayResult {
  delayedRevenueLow: number;
  delayedRevenueHigh: number;
  monthlyAtRisk: number;
  delayMonths: number;
}

export function calculateAuditDelay(inputs: AuditDelayInputs): AuditDelayResult {
  const { avgDealSize, dealsBlocked, expectedDelay } = inputs;
  
  const totalValue = avgDealSize * dealsBlocked;
  
  let delayMonths = 1;
  switch (expectedDelay) {
    case '2 weeks':
      delayMonths = 0.5;
      break;
    case '1 month':
      delayMonths = 1;
      break;
    case '2 months':
      delayMonths = 2;
      break;
    case '3+ months':
      delayMonths = 3;
      break;
    default:
      delayMonths = 1;
  }

  return {
    delayedRevenueLow: Math.round(totalValue * 0.85),
    delayedRevenueHigh: Math.round(totalValue * 1.15),
    monthlyAtRisk: Math.round(totalValue / delayMonths),
    delayMonths
  };
}
