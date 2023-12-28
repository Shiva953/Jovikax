'use client'

import { Setup } from "@/app/lib/definitions";
import Link from 'next/link';
import {
  Button,
  Image
} from "@nextui-org/react"
import SpotLight, { SpotlightCard } from "../../../components/ui/spotlight";

export default function SetupCards({ setups }: { setups: Setup[] }) {
  return (
    <>
    <div className="w-full mt-8">
      <h3 className={`md:text-[1.25rem] sm:text-[1rem] lg:text-[1.5rem] text-[1rem] mb-8 font-semibold tracking-tight text-small`}>
        Makes <span className="text-black">Jokes</span> From These
      </h3>
      <div className="mt-2 flex flex-wrap">
        {/* <Suspense fallback={<div>Loading...</div>}> */}
      <SpotLight className="max-w-sm mx-auto grid gap-6 lg:grid-cols-3 items-start lg:max-w-none group">
        {setups?.map((setup) => (
          <SpotlightCard key={setup.id}>
            <SpotlightCard>
    <div className="relative h-full bg-slate-900 p-6 pb-8 rounded-[inherit] z-20 overflow-hidden">
      {/* Radial gradient */}
      <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 pointer-events-none -z-10 w-1/2 aspect-square" aria-hidden="true">
        <div className="absolute inset-0 translate-z-0 bg-slate-800 rounded-full blur-[80px]"></div>
      </div>
      <div className="flex flex-col h-full items-center text-center">
        {/* Image */}
        <div className="relative inline-flex">
          <div className="w-[40%] h-[40%] absolute inset-0 m-auto -translate-y-[10%] blur-3xl -z-10 rounded-full bg-indigo-600" aria-hidden="true"></div>
          <Image className="inline-flex" src={"https://image.similarpng.com/very-thumbnail/2020/07/Emoji-is-amazed-on-transparent-background-PNG.png"} width={50} height={50} alt="Card 01" />
        </div>
        {/* Text */}
        <div className="grow mb-5">
          <p className="text-[1rem] md:text-[1.25rem] sm:text-[1rem] lg:text-[1.5rem] font-semibold text-white">{setup.setup}</p>
        </div>
        <a className="inline-flex justify-center items-center" href="#0">
        <Link href={`/setup/${setup.id}`}>
        <Button color="danger" variant="ghost" className="mx-auto my-2">
          Add Pun
        </Button>
        </Link>
        </a>
      </div>
    </div>
  </SpotlightCard>
          </SpotlightCard>
        ))}
        </SpotLight>
        {/* </Suspense> */}
      </div>
    </div>
    </>
  );
}

// export function StCard({
//   setupDesc,
//   setupId
// }: {
//   setupDesc: string,
//   setupId: number;
// }) {
//   return (
//     <div className="flex-shrink-0 w-full md:w-1/3 p-4">
//   <Card className="flex bg-purple flex-col h-full items-center justify-center">
//     <CardHeader className="pb-0 pt-2 px-4 flex items-center justify-center self-center">
//       <div className="flex justify-center self-center">
//       <Image
//         alt="Card background"
//         className="object-cover"
//         src="https://image.similarpng.com/very-thumbnail/2020/07/Emoji-is-amazed-on-transparent-background-PNG.png"
//         width={80}
//         height={80}
//       />
//       </div>
//     </CardHeader>
//     <Link href={`/setup/${setupId}`}>
//       <CardBody className="overflow-visible py-2 items-center text-center">
//         <h3 className="mx-auto text-[1.25rem] font-medium text-white">
//           {setupDesc}
//         </h3>
//       </CardBody>
//     </Link>
//     <Link href={`/setup/${setupId}`}>
//       <Button className="mx-auto my-2">
//         Add Pun
//       </Button>
//     </Link>
//   </Card>
// </div>
//   );
// }