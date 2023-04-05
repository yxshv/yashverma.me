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
    buga: {
        title: 'How I made a completely Anonymous chat app with go and next.js',
        isPublished: true,
        tags: ["GOLANG", "API", "WEBSOCKET", "NEXTJS"],
        image: '/posts/buga.svg',
        datePublished: new Date('2022-05-26'),
    },
    blog: {
        title: "Write and deploy blogs in seconds with comments support",
        isPublished: true,
        tags: ["PRODUCT", "SHOWDEV"],
        image: "/posts/blog.svg",
        datePublished: new Date('2021-12-12'),
    },
    notFound: {
        title: '404 page',
        isPublished: false,
        image: '',
        datePublished: new Date(),
    }
});