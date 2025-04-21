
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface EnrollmentCounterProps {
  current: number;
  maximum: number;
}

export function EnrollmentCounter({ current, maximum }: EnrollmentCounterProps) {
  const percentage = Math.min((current / maximum) * 100, 100);
  
  // Determine color based on capacity percentage
  let progressColor = "bg-green-500";
  if (percentage > 90) {
    progressColor = "bg-red-500";
  } else if (percentage > 70) {
    progressColor = "bg-yellow-500";
  }

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Enrollment Status</h3>
        <span className="text-sm font-medium">
          {current} / {maximum} students
        </span>
      </div>
      <ProgressPrimitive.Root
        className={cn("relative h-2 w-full overflow-hidden rounded-full bg-secondary")}
      >
        <ProgressPrimitive.Indicator
          className={`h-full w-full flex-1 transition-all ${progressColor}`}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
      <div className="text-xs text-gray-500 text-right">
        {percentage >= 100 
          ? "Maximum capacity reached" 
          : `${Math.round(percentage)}% of maximum capacity`}
      </div>
    </div>
  );
}
