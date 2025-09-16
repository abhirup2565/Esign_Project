import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { uploadDocument } from "../utils/uploadDocument";

function UploadDocs() {
  const { documentIds, setDocumentIds } = useAppContext();

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setErrors(["Please provide both file and name."]);
      return;
    }
    uploadDocument(file, name, setDocumentIds, setErrors);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Upload Documents</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Document Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Choose File:</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Upload
        </button>
      </form>

      {errors.length > 0 && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h4>Errors:</h4>
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* <div style={{ marginTop: "20px" }}>
        <h4>Uploaded Document IDs:</h4>
        <ul>
          {documentIds.map((id, idx) => (
            <li key={idx}>{id}</li>
          ))}
        </ul>
      </div> */}

      <ToastContainer />
    </div>
  );
}

export default UploadDocs;
