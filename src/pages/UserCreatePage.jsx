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
import { useAppContext } from "../wrappers/AppContext";
import { toast, ToastContainer } from "react-toastify";
import { BASE_URL } from "../constants/network";

export default function UserCreatePage() {
  const { access } = useAppContext(); // access token from context/localStorage
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth
  const [isManager, setIsManager] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}users/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`, // JWT token
        },
        body: JSON.stringify({
          "username":username,
          "password":password,
          "dob": dob,
          "is_staff": isManager,
        }),
      });

      if (res.ok) {
        toast.success("User created successfully!");
        setUsername("");
        setPassword("");
        setDob("");
        setIsManager(false);
      } else {
        const data = await res.json();
        toast.error(data.detail || "Failed to create user.");
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
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    )}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    )}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
                  <Label htmlFor="dob">Date of birth</Label>
            </div>
            <input
              type="date"
              value={dob}
              className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    )}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center gap-4">
                  <Label htmlFor="isManager">Is Manager</Label>
              <input
                type="checkbox"
                checked={isManager}
                onChange={(e) => setIsManager(e.target.checked)}
                className={cn(
                        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                      )}
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
