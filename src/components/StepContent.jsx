import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CreateSignatureButton from "./CreateSignatureButton";
import "../styles/UploadDocs.css";
import Error from "../components/Error";
import { userList } from "../networks/usersList";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

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
              <Card>
                <CardContent>
            <form onSubmit={handleUploadSubmit}>
          <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label className="login-label">File Name</Label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    )}
              placeholder="File Name"
              required
            />
          </div>
            <div className="grid gap-3">
            <div className="flex items-center">
                  <Label htmlFor="file">Choose File:</Label>
            </div>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    )}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Upload
                </Button>
          </div>
          </div>
        </form>
        </CardContent>
        <Error errors={errors}/>
        </Card>
);

      case 2:
        return (
          <Card className="w-full">
      <CardHeader>
        <CardTitle>Step 2: Create Signature Request</CardTitle>
        <CardDescription>
          Uploaded Document ID: <Badge variant="outline">{uploadedDocId}</Badge>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-row gap-6">
        {/* Errors */}
        <Error errors={errors} />

        {/* Selected Users */}
        <div className="w-[50%]">
          <Label className="mb-2 block font-medium">Selected Users</Label>
          <div className="flex flex-wrap gap-2 ">
            {selectedUsers.length > 0 ? (
              selectedUsers.map((user) => (
                <Badge key={user.identifier} variant="secondary">
                  {user.displayName}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                No users selected yet
              </span>
            )}
          </div>
        </div>

        {/* Scrollable User List */}
        <div className="w-[50%]">
          <Label className="mb-2 block font-medium">
            Select Users to Send Signature Request
          </Label>
          {/* Scroll Area */}
          <ScrollArea className="h-40 w-full rounded-md border p-2">  
            <div className="space-y-3">
              {users.map((user) => {
                const isChecked = selectedUsers.some(
                  (u) => u.identifier === user.identifier
                )
                return (
                  <div
                    key={user.identifier}
                    className="flex items-center justify-between rounded-md border p-2"
                  >
                    <Label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers((prev) => [
                              ...prev,
                              {
                                identifier: user.identifier,
                                displayName: user.displayName,
                                birthYear: user.birthYear,
                              },
                            ])
                          } else {
                            setSelectedUsers((prev) =>
                              prev.filter(
                                (u) => u.identifier !== user.identifier
                              )
                            )
                          }
                        }}
                      />
                      <span>
                        {user.displayName}{" "}
                        <span className="text-muted-foreground text-xs">
                          (Id: {user.identifier})
                        </span>
                      </span>
                    </Label>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </CardContent>

      <CardFooter>
          <CreateSignatureButton
            uploadedDocId={uploadedDocId}
            selectedUsers={selectedUsers}
            setErrors={setErrors}
            setCurrentStep={setCurrentStep}
          />
      </CardFooter>
    </Card>
          // <div className="step-content">
          //     <p><strong>Uploaded Document ID:</strong> {uploadedDocId}</p>
          //     <div className="step2-flex-container">

          //       {/* Selected Users */}
          //       <div className="selected-users">
          //         <Error errors={errors}/>
          //         <strong>Selected Users:</strong>
          //         <div className="selected-users-list">
          //           {selectedUsers.map((user) => (
          //             <span key={user.identifier} className="selected-user-item">
          //               {user.displayName}
          //             </span>
          //           ))}
          //         </div>
          //       </div>

          //         {/* Scrollable Users List */}
          //         <div>
          //           <strong>Select Users to Send Signature Request:</strong>
          //           <div className="users-list-container">
          //             <ul className="users-list">
          //               {users.map((user) => (
          //                 <li key={user.identifier} className="user-item">
          //                   <label className="user-label">
          //                     <input
          //                       type="checkbox"
          //                       value={user.identifier}
          //                       checked={selectedUsers.some(u => u.identifier === user.identifier)}
          //                       onChange={(e) => {
          //                         if (e.target.checked) {
          //                           setSelectedUsers((prev) => [
          //                             ...prev,
          //                             { identifier: user.identifier, displayName: user.displayName,birthYear: user.birthYear}
          //                           ]);
          //                         } else {
          //                           setSelectedUsers((prev) =>
          //                             prev.filter((u) => u.identifier !== user.identifier)
          //                           );
          //                         }
          //                       }}
          //                     />
          //                     <span className="user-name">{user.displayName} (Id:{user.identifier})</span>
          //                   </label>
          //                 </li>
          //               ))}
          //             </ul>
          //           </div>
          //         </div>
          //     </div>

          //     {/* Button to create signatures */}
          //     <CreateSignatureButton
          //       uploadedDocId={uploadedDocId}
          //       selectedUsers={selectedUsers}
          //       setErrors={setErrors}
          //       setCurrentStep={setCurrentStep}
          //     />
          // </div>
    );
    
    case 3:
    return (
      <Card>
        <CardHeader>Status Information Available</CardHeader>
        <CardContent><p>Your document and signature information is now available in the Status page.</p></CardContent>
      </Card>
      );

    default:
      return <p>Invalid step</p>;
    }
  };

  return <>{renderStep()}</>;
};

export default StepContent;