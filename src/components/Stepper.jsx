import { cn } from "@/lib/utils";
import { Upload, PenLine, FileCheck } from "lucide-react";

const Stepper = ({ currentStep }) => {
  const steps = [
    { label: "Upload Document", icon: Upload },
    { label: "Create Signature Request", icon: PenLine },
    { label: "Status Info Available", icon: FileCheck },
  ];

  return (
    <div className="flex justify-between w-full max-w-3xl mx-auto mt-6">
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isActive = index + 1 === currentStep;
        const Icon = step.icon;

        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {/* Step Circle with Icon */}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors",
                  isCompleted && "bg-green-500 text-white",
                  isActive &&
                    "bg-primary text-primary-foreground ring-2 ring-primary/30",
                  !isCompleted &&
                    !isActive &&
                    "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Step Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-colors",
                    isCompleted ? "bg-green-500" : "bg-muted"
                  )}
                />
              )}
            </div>

            {/* Step Label */}
            <div
              className={cn(
                "mt-2 text-sm font-medium text-center",
                isCompleted && "text-green-600",
                isActive && "text-primary",
                !isCompleted && !isActive && "text-muted-foreground"
              )}
            >
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;