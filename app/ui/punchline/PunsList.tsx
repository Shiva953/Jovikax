// display the list of puns(from a list of users) FOR A specific setup
'use client'

import { Pun } from "@/app/lib/definitions";
import { CardBody,CardHeader, Avatar,Card } from "@nextui-org/react";
import { redirect } from "next/navigation";
import Link from "next/link";
// import Card from "@mui/material/Card"
export default function PunchList({ puns }: { puns: Pun[] }) {
  return (
    <div className="w-full mt-[-12rem]">
      <div className="flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md p-2 md:pt-0 flex flex-row flex-wrap justify-center">
              {puns?.map((pun) => (
                <Card
                  onClick={() => {
                    redirect(`/punchline/${pun.id}`);
                  }}
                  key={pun.id}
                  className="max-w-[340px] bg-blue-900 border-yellow-300 md:w-[18rem] sm:w-full h-48 m-2 self-center justify-center cursor-pointer"
                >
                  <CardHeader className="justify-between">
                    <div className="flex gap-5">
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg"
                      />
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small tracking-tight text-default-400">
                          {pun.userForThisPun}
                        </h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-3 py-0 text-default-400 mt-2">
                    <p className="font-semibold text-white">
                    <Link href={`/punchline/${pun.id}`}>
                      {pun.pun}
                      </Link>
                      </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}