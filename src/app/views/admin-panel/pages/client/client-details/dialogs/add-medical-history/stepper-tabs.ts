import { StepModel } from '@app-shared/components/stepper/model';

export const steps: StepModel[] = [
    {
        step: "Step 1",
        stepLabel: "Medical Info",
        stepName: "medical-info",
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        step: "Step 2",
        stepLabel: "Admission Record",
        stepName: "admission-record",
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2
    }, {
        step: "Step 3",
        stepLabel: "Assessment Record",
        stepName: "assessment-record",
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 3
    }
];