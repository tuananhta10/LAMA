
import { StepModel } from '@main/shared/components/stepper/model';
import { PricelistStepperConstants } from './pricelist-stepper-constants';

export const pricelistSteps: StepModel[] = [
    {
        stepLabel: PricelistStepperConstants.PRICELIST_DETAILS,
        stepName: PricelistStepperConstants.pricelistDetails    ,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        stepLabel: PricelistStepperConstants.PRICELIST_RATES,
        stepName: PricelistStepperConstants.pricelistRates,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 2
    }
];