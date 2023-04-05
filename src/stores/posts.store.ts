import { readable } from 'svelte/store';

export interface Post {
    title: string
    image: string;
    tags?: string[];
    isPublished: boolean;
    datePublished: Date;
}

export interface Posts {
    [key: string]: Post
}

export const posts = readable<Posts>({
    cards: {
        title: 'Cards mouse hover effect with CSS + JS',
        isPublished: true,
        tags: ["ANIMATION", "CSS", "JS", "DESIGN"],
        image: '/posts/cards.webp   ',
        datePublished: new Date('2023-02-22'),
    },
    notFound: {
        title: '404 page',
        isPublished: true,
        image: '',
        datePublished: new Date(),
    }
});