import { auth } from "#/app/auth";
import CountryList from "#/components/homeBanner/carditems";
import { redirect } from "next/navigation";
import MainBanner from "#/components/mainBanner/mainBanner";
import HomeBanner from "#/components/homeBanner/homebanner";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen p-8">
      <div className="flex">
        <div className="">
          <div className="flex">
            <div className="w-[600px]  h-[500px] -mt-2">
              <MainBanner />
            </div>
            <div className="p-4">
              <div>
                <HomeBanner />
              </div>
              <div>
                <CountryList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
