'use server'

import { z } from 'zod';
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache';
import { fetchJokesfromAPI } from './data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const FormSchema = z.object({
    mainPart: z.string()
  });

export async function populateDB(){
  const jokes = await fetchJokesfromAPI();
  const setups = jokes.map((j) => ({ setup: j.setup, id: j.id}))
  const {data, error} = await supabase
  .from('setups')
  .insert(setups)
}

export async function fetchSetupsFromDB(){
  try{
  const {data ,error} = await 
  supabase.from('random_setups').select('id,setup').limit(16)
  if(error){
    console.error(error)
  }
  return data || [];
  }
  catch(error){
    throw error;
  }
}

export async function fetchPunchlinesFromSupabaseDB(){
    let { data: punchlines, error } = await supabase
    .from('punchlines')
    .select('id,pun')
    if(error){
        console.log(error)
    }
    return { data: punchlines}
}

export async function createPunAndInsertToDB(setupIdForThePun: number, punId:number, username:string, formData: FormData){
    const { mainPart } = FormSchema.parse({
        mainPart: formData.get('mainPart')
    })
    // const punId = Math.floor(Math.random() * 10000)
    const { data, error } = await supabase
    .from('punchlines')
    .insert([
    { id: punId,pun: mainPart,setup_id_for_given_pun: setupIdForThePun,userForThisPun: username },
    ])
    if(error){
        console.log(error)
    }
    revalidatePath(`/pun/${punId}}`)
}

export async function createSetupAndInsertToDB(formData: FormData){
    const { mainPart } = FormSchema.parse({
        mainPart: formData.get('mainPart')
    })
    const setupId = Math.floor(Math.random() * 100);
    const { data, error } = await supabase
    .from('setups')
    .insert([
    { id: setupId, setup:mainPart },
    ])
    if(error){
        console.log(error)
    }
    revalidatePath(`/pun/${setupId}}`)
}