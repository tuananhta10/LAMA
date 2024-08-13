import { StepModel } from '@app-shared/components/stepper/model';

export const steps: StepModel[] = [
    {
        step: "Step 1",
        stepLabel: "Client Goals Details",
        stepName: "client-goals-details",
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        step: "Step 2",
        stepLabel: "Status",
        stepName: "status",
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2
    }, {
        step: "Step 3",
        stepLabel: "Responsible Parties",
        stepName: "responsible-parties",
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 3
    }
];