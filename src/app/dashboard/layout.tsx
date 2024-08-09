import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserDropDownMenu } from "@/components/UserDropDownMenu";
import { authOptions } from "@/lib/utils";
import { NotificationProvider } from "@/contexts/notificationContext";
import { Libraries, useLoadScript } from "@react-google-maps/api";

type Props = {
  children: React.ReactNode;
};

export default async function Page(props: Props) {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <UserDropDownMenu />

        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/dashboard"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Maps
          </Link>
        </nav>
      </header>
      <NotificationProvider>
        {props.children}
      </NotificationProvider>
    </>
  )
}