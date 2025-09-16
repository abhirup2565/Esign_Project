import { users } from "../constants/users";
import CreateSignatureButton from "./CreateSignatureButton";

const StepContent = ({
  currentStep,
  setCurrentStep,
  file,
  name,
  setFile,
  setName,
  handleUploadSubmit,
  errors,
  setErrors,
  uploadedDocId,
  selectedUsers,
  setSelectedUsers
}) => {

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <form onSubmit={handleUploadSubmit}>
              <div style={{ marginBottom: "10px" }}>
                <label>Document Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>

              <div style={{ marginBottom: "10px" }}>
                <label>Choose File:</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ width: "100%", padding: "8px" }}
                  required
                />
              </div>

              <button type="submit" style={{ padding: "10px 20px" }}>
                Upload
              </button>
            </form>

            {errors.length > 0 && (
              <div style={{ marginTop: "20px", color: "red" }}>
                <h4>Error:</h4>
                <p>{errors[0]}</p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
           <div>
      <p><strong>Uploaded Document ID:</strong> {uploadedDocId}</p>
      <h4>Select Users to Send Signature Request:</h4>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {users.map((user) => {
          return(<li key={user.identifier} style={{ marginBottom: "8px" }}>
            <label>
              <input
                type="checkbox"
                value={user.identifier}
                checked={selectedUsers.includes(user.identifier)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedUsers((prev) => [...prev, user.identifier]);
                  } else {
                    setSelectedUsers((prev) =>
                      prev.filter((id) => id !== user.identifier)
                    );
                  }
                }}
              />
              {user.displayName} ({user.birthYear})
            </label>
          </li>)
        })}
      </ul>

      {/* Button to create signatures */}
      <CreateSignatureButton
        uploadedDocId={uploadedDocId}
        selectedUsers={selectedUsers}
        setErrors={setErrors}
        setCurrentStep={setCurrentStep}
      />

      {errors.length > 0 && (
              <div style={{ marginTop: "20px", color: "red" }}>
                <h4>Error:</h4>
                <p>{errors[0]}</p>
              </div>
            )}
    </div>
        );
    
    case 3:
    return (
        <div>
        <h3>Step 3: Status Information Available</h3>
        <p>Your document and signature information is now available in the Status page.</p>
        </div>)

      default:
        return <p>Invalid step</p>;
    }
  };

  return <>{renderStep()}</>;
};

export default StepContent;