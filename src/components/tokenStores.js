import { writable } from 'svelte/store';

export const ownedTokenIds = writable([]);
export const tokenStatsMap = writable(new Map());
