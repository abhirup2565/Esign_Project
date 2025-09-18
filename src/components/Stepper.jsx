import "../styles/UploadDocs.css"
const Stepper = ({ currentStep}) => {
const steps = ["Upload Document", "Create Signature Request","Status Info Available"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", width:"100%",paddingLeft:"25%" }}>
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep;
        const isActive = index + 1 === currentStep;

        return (
          <div key={index} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
  {/* Top: Circle + Line */}
  <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
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

    {/* Line (right after circle, not after label anymore) */}
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

  {/* Bottom: Label */}
  <div style={{ marginTop: "8px" ,whiteSpace:"nowrap", color: isCompleted ? "green" : isActive ? "blue" : "#555" }}>
    {step}
  </div>
</div>

        );
      })}
    </div>
  );
};

export default Stepper;