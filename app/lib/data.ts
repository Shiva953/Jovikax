'use server'

import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchJokesfromAPI(){
    try{
        const res = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&type=twopart&amount=10', { next: { revalidate: 5 } });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const resData = await res.json();
        return resData.jokes;
    }
    catch(error){
        console.log(error)
    }
}

export async function fetchSetupbyId(id:number) {
    try {
    const { data, error } = await supabase.from('setups').select('setup').eq('id',id)
    if (error) {
        console.error('Error fetching setup by ID:', error)
        throw error
    }
    revalidatePath(`/setup/${id}`)
    console.log(data[0].setup)
    return data[0].setup
    }

    catch(error){
        console.log(error)
    }
}

export async function fetchPunbyId(id:number) {
    try {
    const { data, error } = await supabase.from('punchlines').select('pun').eq('id',id)
    if (error) {
        console.error('Error fetching setup by ID:', error)
        throw error
    }
    revalidatePath(`/punchline/${id}`)
    console.log(data[0].pun)
    return data[0].pun
    }

    catch(error){
        console.log(error)
    }
}

export async function fetchPunsBySetupId(id:number){
    try{
        const {data: generalData, error: errorA} = await supabase.from('punchlines').select().eq('id',id)
        if (errorA) {
            console.error(errorA)
            throw errorA
        }
        // const { data, error } = await supabase.from('punchlines').select('pun').eq('setup_id_for_given_pun',id)
        const setupId = generalData[0].setup_id_for_given_pun
        const {data:punData, error: errorB} = await supabase.from('punchlines').select().eq('setup_id_for_given_pun',setupId)
        if (errorB) {
            console.error(errorB)
            throw errorB
        }
        return {data: punData};
    }  
    catch(err){
        console.log(err)
    }
}

export async function fetchSetupByPunId(id:number){
    try{
    const {data: generalData, error: error} = await supabase.from('punchlines').select().eq('id',id)
    if (error) {
        console.error(error)
        throw error
    }
    const setupId = generalData[0].setup_id_for_given_pun;
    const res = await fetch(`https://v2.jokeapi.dev/joke/Any?idRange=${setupId}`);
    const setup = await res.json();
    return setup;
    }
    catch(error){
        console.error(error)
    }
}