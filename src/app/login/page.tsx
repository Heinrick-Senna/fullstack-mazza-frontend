import { authOptions } from "@/lib/utils";
import LoginCard from "./LoginCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  if (session) redirect('/dashboard')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LoginCard />
    </div>
  )
}