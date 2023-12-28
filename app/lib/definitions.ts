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