import { fetchPunbyId, fetchPunsBySetupId, fetchSetupByPunId } from "@/app/lib/data";
import { redirect } from "next/navigation";
import PunchList from "@/app/ui/punchline/PunsList";
import { Suspense } from "react";
import { Card,CardContent,CardHeader} from "@/components/ui/card";
import { Avatar,AvatarImage,AvatarFallback } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { Pun } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";

type FetchPunsResult = {
  data: Pun[];
};

export default async function Page({ params }: { params: { id: number} }) {
  const session = await getServerSession();

  if (!session || !session.user) {
    redirect(`/api/auth/signin`)
  }
    const punId = params.id;
    const punchline = await fetchPunbyId(punId);
    const { data } = (await fetchPunsBySetupId(punId)) as FetchPunsResult;
    const foundPun = data.find((p: Pun) => p.id == punId);
    const username = foundPun?.userForThisPun ?? "username"
    const setup = await fetchSetupByPunId(punId);

    return (
      <div className="w-full mt-[-8rem]">
        <div className="flex flex-col justify-center items-center min-h-screen mb-16">
        <div className="flex flex-col items-center mb-8 mt-4">
          <h1 className="font-semibold text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl border-b pb-2 tracking-tight text-gray-300 mt-8 sm:mt-4 md:mt-8 lg:mt-14 xl:mt-20">
            {setup.setup}
          </h1>
          <Button className="z-5 mb-8 mt-2">
            <Link href={`/setup/${setup.id}`}>Add A Pun</Link>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
          <Card key={punId} className="w-full border-white border-2 bg-black md:max-w-[75rem] h-[15rem] md:max-h-[40rem] mt-2 mb-32 mx-4 md:mx-4 sm:mx-4">
            <CardHeader className="flex items-center gap-3 mx-8">
              <Avatar>
                <AvatarImage src={"https://i.imgur.com/bMH6qNc.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-row items-center ml-4">
                <p className="text-md">@{username}</p>
              </div>
            </CardHeader>
            <CardContent className="flex mx-8">
              <p className="font-bold text-2xl m-2">{punchline}</p>
            </CardContent>
          </Card>
        </div>
        
        <Suspense fallback={<div>Loading...</div>}>
          <PunchList puns={data}/>
        </Suspense>
      </div>
    );    
}