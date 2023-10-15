export function formatRelativeTime(dateString) {
	const d = new Date(dateString);
	const n = new Date();
	const ms = n - d;

	const s = Math.floor(ms / 1000);
	const m = Math.floor(s / 60);
	const h = Math.floor(m / 60);
	const day = Math.floor(h / 24);

	if (day > 0) {
		return `${day}d ago`;
	} else if (h > 0) {
		return `${h}h ago`;
	} else if (m > 0) {
		return `${m}m ago`;
	} else {
		return "just now";
	}
}
