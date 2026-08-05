import { readable, type Readable } from 'svelte/store';

const LANYARD_SOCKET_URL = 'wss://api.lanyard.rest/socket';
const SUBSCRIBE_OPERATION = 2;
const HEARTBEAT_OPERATION = 3;

export interface LanyardActivity {
	type: number;
	state: string;
	name: string;
}

export interface LanyardSpotify {
	track_id: string;
	timestamps: {
		start: number;
		end?: number;
	};
	song: string;
	artist: string;
	album_art_url: string;
}

export interface LanyardData {
	listening_to_spotify: boolean;
	spotify: LanyardSpotify;
	discord_user: {
		id: string;
		username: string;
		avatar: string;
	};
	discord_status: string;
	activities: LanyardActivity[];
}

interface LanyardMessage<T> {
	op: number;
	d: T;
}

export function useLanyard(id: string): Readable<LanyardData | undefined> {
	return readable<LanyardData | undefined>(undefined, (set) => {
		if (typeof window === 'undefined') return;

		const socket = new WebSocket(LANYARD_SOCKET_URL);
		let heartbeat: ReturnType<typeof setInterval> | undefined;

		const receiveOnce = () =>
			new Promise<LanyardMessage<unknown>>((resolve) => {
				const receive = (event: MessageEvent<string>) => {
					socket.removeEventListener('message', receive);
					resolve(JSON.parse(event.data) as LanyardMessage<unknown>);
				};

				socket.addEventListener('message', receive);
			});

		socket.addEventListener('open', async () => {
			socket.send(
				JSON.stringify({
					op: SUBSCRIBE_OPERATION,
					d: { subscribe_to_id: id }
				})
			);

			const hello = (await receiveOnce()) as LanyardMessage<{ heartbeat_interval: number }>;
			heartbeat = setInterval(() => {
				if (socket.readyState === WebSocket.OPEN) {
					socket.send(JSON.stringify({ op: HEARTBEAT_OPERATION }));
				}
			}, hello.d.heartbeat_interval);

			const initialState = (await receiveOnce()) as LanyardMessage<LanyardData>;
			set(initialState.d);

			socket.addEventListener('message', (event: MessageEvent<string>) => {
				const update = JSON.parse(event.data) as LanyardMessage<LanyardData>;
				set({ ...update.d });
			});
		});

		return () => {
			if (heartbeat) clearInterval(heartbeat);
			socket.close();
		};
	});
}
