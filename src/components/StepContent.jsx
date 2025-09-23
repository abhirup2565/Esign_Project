// import { users } from "../constants/users";
import CreateSignatureButton from "./CreateSignatureButton";
import "../styles/UploadDocs.css";
import Error from "../components/Error";
import { userList } from "../networks/usersList";
import { useEffect, useState } from "react";

const StepContent = ({
  currentStep,
  setCurrentStep,
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
   const fetch = async () => {
    try {
      const data = await userList(setErrors);
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    };
    fetch()
    },[setErrors]);

  const renderStep = () => {
    switch (currentStep) {
      case 1: 
        return (
          <div className="step-content">
            <form onSubmit={handleUploadSubmit}>
              <div>
                <label>Document Name :</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "100%", padding: "8px" }}
                  required/>
              </div>
              <div>
                  <label >Choose File :</label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ width: "100%", padding: "8px" }}
                    required
                  />
              </div>
              <div style={{display:"flex"}}>
                <button type="submit">Upload</button>
              </div>
            </form>
            <Error errors={errors}/>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
              <p><strong>Uploaded Document ID:</strong> {uploadedDocId}</p>
              <div className="step2-flex-container">

                {/* Selected Users */}
                <div className="selected-users">
                  <Error errors={errors}/>
                  <strong>Selected Users:</strong>
                  <div className="selected-users-list">
                    {selectedUsers.map((user) => (
                      <span key={user.identifier} className="selected-user-item">
                        {user.displayName}
                      </span>
                    ))}
                  </div>
                </div>

                  {/* Scrollable Users List */}
                  <div>
                    <strong>Select Users to Send Signature Request:</strong>
                    <div className="users-list-container">
                      <ul className="users-list">
                        {users.map((user) => (
                          <li key={user.identifier} className="user-item">
                            <label className="user-label">
                              <input
                                type="checkbox"
                                value={user.identifier}
                                checked={selectedUsers.some(u => u.identifier === user.identifier)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedUsers((prev) => [
                                      ...prev,
                                      { identifier: user.identifier, displayName: user.displayName,birthYear: user.birthYear}
                                    ]);
                                  } else {
                                    setSelectedUsers((prev) =>
                                      prev.filter((u) => u.identifier !== user.identifier)
                                    );
                                  }
                                }}
                              />
                              <span className="user-name">{user.displayName} (Id:{user.identifier})</span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              </div>

              {/* Button to create signatures */}
              <CreateSignatureButton
                uploadedDocId={uploadedDocId}
                selectedUsers={selectedUsers}
                setErrors={setErrors}
                setCurrentStep={setCurrentStep}
              />
          </div>
    );
    
    case 3:
    return (
      <div className="step-content step3">
        <h3>Step 3: Status Information Available</h3>
        <p>Your document and signature information is now available in the Status page.</p>
      </div>
      );

    default:
      return <p>Invalid step</p>;
    }
  };

  return <>{renderStep()}</>;
};

export default StepContent;