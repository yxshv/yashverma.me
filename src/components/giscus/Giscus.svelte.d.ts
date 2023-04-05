import { SvelteComponentTyped } from "svelte";
import type { AvailableLanguage, BooleanString, InputPosition, Loading, Mapping, Theme } from '.';
declare const __propDef: {
    props: {
        id?: string;
        host?: string;
        repo: `${string}/${string}`;
        repoId: string;
        category?: string;
        categoryId?: string;
        mapping?: Mapping;
        term?: string;
        strict?: BooleanString;
        reactionsEnabled?: BooleanString;
        emitMetadata?: BooleanString;
        inputPosition?: InputPosition;
        theme?: Theme;
        lang?: AvailableLanguage;
        loading?: Loading;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type GiscusProps = typeof __propDef.props;
export type GiscusEvents = typeof __propDef.events;
export type GiscusSlots = typeof __propDef.slots;
export default class Giscus extends SvelteComponentTyped<GiscusProps, GiscusEvents, GiscusSlots> {
}
export {};
