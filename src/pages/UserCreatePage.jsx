import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { fetchWithAuth } from "../networks/fetchWithAuth";

export default function UserCreatePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth
  const [isManager, setIsManager] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "username":username,
          "password":password,
          "dob": dob,
          "is_staff": isManager,
        }),
      }
    try {
      const res = await fetchWithAuth(`users/create/`, options);

      if (res.ok) {
        toast.success("User created successfully!");
        setUsername("");
        setPassword("");
        setDob("");
        setIsManager(false);
      } else {
        const data = await res.json();
        toast.error(data.detail || JSON.stringify(data.username) || "Failed to create user.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
        <CardHeader>
          <CardTitle>Create Users</CardTitle>
          <CardDescription>
            Select Manager to create Manager
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label className="login-label">Username</Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
            </div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
                  <Label htmlFor="dob">Date of birth</Label>
            </div>
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center gap-4">
                  <Label htmlFor="isManager">Is Manager</Label>
              <Checkbox
                checked={isManager}
                onCheckedChange={(checked) => setIsManager(!!checked)}
              />
              </div>
          </div>
          <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Create
                </Button>
          </div>
          </div>
        </form>
        </CardContent>
        </Card>
      </div>
    </div>
    <ToastContainer/>
    </div>
  );
}
