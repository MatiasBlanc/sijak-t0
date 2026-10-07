const LAUNCH_YEAR = 2027;

export const product = {
  brand: 'SIJAK',
  name: 'T0',
  tagline: 'Everyone starts here.',
  launchYear: LAUNCH_YEAR,
  launchStatus: `Coming ${LAUNCH_YEAR}`,
} as const;

export const productClaims = {
  reaction: true,
  execution: true,
  recovery: true,
  totalResponse: true,
  consistency: true,
  impactDetection: true,
  force: false,
  power: false,
  absoluteSpeed: false,
  aiCoaching: false,
  medicalAnalysis: false,
  waterproofRating: false,
  validatedBatteryRuntime: false,
};

export type ProductClaim = keyof typeof productClaims;
