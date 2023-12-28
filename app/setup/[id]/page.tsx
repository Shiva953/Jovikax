import {
    // Card,
    // CardHeader,
    // CardBody,
    // Input,
  } from "@nextui-org/react";
  import { createPunAndInsertToDB } from "@/app/lib/actions";
  import { fetchSetupbyId } from "@/app/lib/data";
  import PopUpButton from "@/app/ui/modal";
  import {
    Card,
    CardContent,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation";

  export default async function Page({ params }: { params: { id: number } }) {
    const session = await getServerSession();

    if (!session || !session.user) {
      redirect(`/api/auth/signin`)
    }

    const username= session?.user?.name ?? "undefinedUser";
    const setupId = params.id
    const setup = await fetchSetupbyId(setupId);
    const punId = Math.floor(Math.random()*1000);
    const punURL = `/punchline/${punId}`
    if (!setup) {
      throw new Error("The Setup with this Id was not found.");
    }
    const createPunAndInsertToDBwithSetupId = createPunAndInsertToDB.bind(null,setupId, punId, username)
    return (
      <>
        <div className="flex justify-center items-center ">
  <Card className="border-none bg-white w-full md:max-w-[40rem] h-[25rem] flex flex-col justify-center items-center m-8 p-4">
    <CardContent>
      {/* <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
        <div className="relative col-span-6 md:col-span-4"></div>

        <div className="flex flex-col col-span-6 md:col-span-8 items-center justify-center md:mr-2 md:ml-2">
          <div className="flex flex-col md:flex-row justify-between items-start w-full">
            <div className="flex flex-col gap-0 text-center m-2 w-full"> */}
              <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-black mt-2">{setup}</CardTitle>
          <div className="flex w-full items-center justify-center my-4">
            <form action={createPunAndInsertToDBwithSetupId} className="w-full">
              <div className="flex flex-row flex-wrap gap-4 items-center justify-center w-full">
                <Input
                  key={"secondary"}
                  placeholder="Enter A Catchy Pun..."
                  name="mainPart"
                  type="text"
                  className="text-white border-none h-16 text-small rounded-[30px]"
                />
                <PopUpButton title={"Thanks for sharing the Pun!"} linkToPun={punURL} />
              </div>
              </form>
            </div>
      </CardContent>
    </Card>
  </div>
      </>
    );
  }
  
  // export async function setupCard({ setup }: { setup: string }) {
  //   return (
  //     <>
  //       {/* Centering the card */}
  //       <div className="flex justify-center items-center h-screen">
  //         <Card className="py-4">
  //           <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
  //             <h4 className="font-bold text-large text-white">{setup}</h4>
  //           </CardHeader>
  //           <CardBody className="py-2"></CardBody>
  //           <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
  //             <form action={createPunAndInsertToDB}>
  //               <label
  //                 htmlFor="string"
  //                 className="mb-2 ml-2 block text-sm font-medium text-green-950"
  //               >
  //                 Add Pun
  //               </label>
  //               <Input
  //                 name="mainPart"
  //                 type="text"
  //                 className="text-black peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
  //               />
  //               <Button type="submit">Make The Joke</Button>
  //             </form>
  //           </div>
  //         </Card>
  //       </div>
  //     </>
  //   );
  // }
  