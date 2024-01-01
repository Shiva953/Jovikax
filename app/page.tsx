import SetupList from '@/app/ui/setup/SetupList';
import { fetchSetupsFromDB } from './lib/actions';
import { Suspense } from 'react';

export default async function Page() {
  const data = await fetchSetupsFromDB()!;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='mx-2 mt-2 mb-32'>
      <h1 className="bg-gradient-to-br from-white to-pink-200 bg-clip-text text-center opacity-90 text-4xl font-extrabold tracking-[-0.02em] text-transparent drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]">Jovikax</h1>
          <p
          className="mt-2 animate-fade-up text-center opacity-70 text-gray-300 [text-wrap:balance] md:text-xl"
        >A Place to come up with Catchy Programming Puns</p>
        </div>
      <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SetupList setups={data} />
      </Suspense>
      </div>
    </main>
  )
}
