import { json } from '@sveltejs/kit';
import { db } from '$lib/database';

export function GET() {
	return json(db);
}

export async function POST({ request }) {
	const { index } = await request.json();
	const ad = db[index];
	
	const maxIndex = db.length - 1;
	const nextIndex = index + 1;
	const newIndex = nextIndex <= maxIndex ? nextIndex : 0;

	return json({
		ad,
		newIndex
	});
}
