
import { StepModel } from '@main/shared/components/stepper/model';
import { ContactStepperConstants } from './contact-stepper-constants';

export const contactSteps: StepModel[] = [
    {
        stepLabel: ContactStepperConstants.ADDRESS,
        stepName: ContactStepperConstants.address,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        stepLabel: ContactStepperConstants.CONTACT_AND_LETTER_HEAD,
        stepName: ContactStepperConstants.contactAndLetterHead,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 2
    }
];