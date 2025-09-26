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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../wrappers/AppContext";
import LoginRequest from "../networks/LoginRequest";
import { Input } from "../components/ui/input";
import Error from "../components/Error";



export default function LoginPage() {
  const {login} = useAppContext()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    const success = await LoginRequest(username, password, setError,login);
    if(success)
    {
      navigate("/dashboard")
    }; 
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      <div className={cn("flex flex-col gap-6")}>
        <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
        <form className="login-form" onSubmit={handleSubmit}>
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
          <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
          </div>
          </div>
        </form>
        <Error errors={error}/>
        </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

