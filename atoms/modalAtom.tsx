import { DocumentData } from 'firebase/firestore'
import { atom } from 'recoil'
import { Movie } from '../typings'

export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
})

export const movieState = atom<Movie | DocumentData | undefined>({
    key: 'movieState',
    default: undefined,
})

export const subscriptionState = atom<boolean>({
    key: 'subscriptionState',
    default: false,
})