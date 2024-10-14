import Chat from "@/assets/chat-bubble.svg"
import Background from "@/assets/login2.png"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
function Auth() {

  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const ValidateSignup = () => {
    if(!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if(!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if(password !== confirmPassword) {
      toast.error("Password and Confirm password should be same.");
      return false;
    }
    return true;
  }

  const validateLogin = () => {
    if(!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if(!password.length) {
      toast.error("Password is required.");
      return false;
    }
    return true;
  }

  const handleLogin = async () => {
    if(validateLogin) {
      const response = await apiClient.post(LOGIN_ROUTE, {email, password}, {withCredentials: true});
      if(response.data.user.id) {
        setUserInfo(response.data.user);
        if(response.data.user.profileSetup) {
          navigate("/chat");
        }
        else {
          navigate("/profile");
        }
      }
      console.log(response);
    }
  };
  
  const handleSignup = async () => {
    if(ValidateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, {email, password}, {withCredentials: true});
      console.log(response);
      if(response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
      }
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60] rounded-3xl grid xl:grid-cols-2">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-3"> 
              <h1 className="text-5xl font-bold text-purple-700 md:text-6xl">Welcome</h1>
              <img src={Chat} alt="Chat Emoji" className="h-[70px]" />
            </div>
            <p className="font-medium text-center"> Let&apos;s get started!</p>
          </div>
          <div className="flex items-center justify-center w-full">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="w-full">
                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:text-black data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Signup</TabsTrigger>
              </TabsList>
              
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
              </TabsContent>
              
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img src={Background} alt="login background" className="h-[600px]" />
        </div>
      </div>
    </div>
  )
}

export default Auth