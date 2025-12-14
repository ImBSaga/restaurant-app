import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import { LoginForm } from "@/components/container/auth/login-form";
import { RegisterForm } from "@/components/container/auth/register-form";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <main className="justify-center items-center flex h-screen">
      <div className="hidden h-full md:block w-[55%]">
        <img
          className="w-full h-full object-cover"
          src="/images/image-auth.png"
          alt="Logo"
        />
      </div>

      <div className="w-full px-6 flex flex-col gap-4 md:w-[45%]">
        <div className="w-30 h-8">
          <img
            className="w-full h-full"
            src="/icons/icon-logo-text.svg"
            alt="Logo"
          />
        </div>
        <div className="text-neutral-950">
          <h3 className="text-display-xs font-extrabold">Welcome Back</h3>
          <p className="text-sm font-medium">
            Good to see you again! Let’s eat
          </p>
        </div>
        <Tabs
          value={searchParams.get("tab") || "login"}
          onValueChange={(value) => setSearchParams({ tab: value })}
        >
          <TabsList>
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
