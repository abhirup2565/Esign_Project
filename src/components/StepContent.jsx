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
import { userList } from "../networks/usersList";
import { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";

const StepContent = ({
  currentStep,
  setCurrentStep,
  name,
  setFile,
  setName,
  handleUploadSubmit,
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
                <CardHeader>
                    <CardTitle>Step 1: Upload Document</CardTitle>
                </CardHeader>
                <CardContent>
            <form onSubmit={handleUploadSubmit}>
          <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label className="login-label">File Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="File Name"
              required
            />
          </div>
            <div className="grid gap-3">
            <div className="flex items-center">
                  <Label htmlFor="file">Choose File:</Label>
            </div>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
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