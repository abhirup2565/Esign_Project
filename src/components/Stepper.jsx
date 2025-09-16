const Stepper = ({ currentStep}) => {
const steps = ["Upload Document", "Create Signature Request","Status Info Available"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "30px" }}>
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isActive = index + 1 === currentStep;

        return (
          <div key={index} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            {/* Circle / Node */}
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: isCompleted ? "green" : isActive ? "blue" : "#ccc",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                zIndex: 1
              }}
            >
              {index + 1}
            </div>

            {/* Label */}
            <div style={{ marginLeft: "8px", color: isCompleted ? "green" : isActive ? "blue" : "#555" }}>
              {step}
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  backgroundColor: isCompleted ? "green" : "#ccc",
                  margin: "0 10px"
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;