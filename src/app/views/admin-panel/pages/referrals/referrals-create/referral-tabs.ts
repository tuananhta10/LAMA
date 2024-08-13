import { StepModel } from '@main/shared/components/stepper/model';
import { ReferralConstants } from './referral-stepper-constant';

export const referralSteps: StepModel[] = [
    {
        stepLabel: ReferralConstants.PARTICIPANT_DETAILS,
        stepName: ReferralConstants.participantDetails,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1,
        isStepValid: false
    }, 
    {
        stepLabel: ReferralConstants.SERVICE_DETAILS,
        stepName: ReferralConstants.serviceDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2,
        isStepValid: false
    },
    {
        stepLabel: ReferralConstants.REFERRER_DETAILS,
        stepName: ReferralConstants.referrerDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3,
        isStepValid: false
    }, {
        stepLabel: ReferralConstants.ADDITIONAL_REPORTS,
        stepName: ReferralConstants.additionalReports,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 3,
        isStepValid: false
    }
];