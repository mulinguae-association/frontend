import { formatDistanceToNow } from "date-fns";

export function formatRelativeDate(date) {
  return formatDistanceToNow(date, { addSuffix: true });
}
