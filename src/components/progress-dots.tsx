interface ProgressDotsProps {
    currentStep: number
    totalSteps: number
  }
  
  export default function ProgressDots({ currentStep, totalSteps }: ProgressDotsProps) {
    return (
      <div className="flex space-x-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className={`progress-dot ${index <= currentStep ? "active" : "inactive"}`} />
        ))}
      </div>
    )
  }
  