export type Pun = {
    id: number,
    pun: string,
    userForThisPun: string,
    setup_id_for_given_pun: number,
}

export type Setup = {
    id: number,
    setup: string,
}

export type PunForm = {
    id: string;
    pun: string
};

export type JokeFlags = {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  
 export type Joke = {
    category: string;
    type: string;
    setup: string;
    delivery: string;
    flags: JokeFlags;
    safe: boolean;
    id: number;
    lang: string;
  };