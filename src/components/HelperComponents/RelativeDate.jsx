import i18n from "../../i18n";

export function formatRelativeTime(dateString) {
	const d = new Date(dateString);
	const n = new Date();
	const ms = n - d;

	const s = Math.floor(ms / 1000);
	const m = Math.floor(s / 60);
	const h = Math.floor(m / 60);
	const day = Math.floor(h / 24);

	if (day > 0) {
		return i18n.t("time.daysAgo", { count: day });
	} else if (h > 0) {
		return i18n.t("time.hoursAgo", { count: h });
	} else if (m > 0) {
		return i18n.t("time.minutesAgo", { count: m });
	} else {
		return i18n.t("time.justNow");
	}
}

export default formatRelativeTime;