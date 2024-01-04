export function formatTimeDifference(targetDate: Date): string {
  const currentDate: Date = new Date();
  const difference: number = currentDate.getTime() - targetDate.getTime();

  // Calculate different units
  const seconds: number = Math.floor(difference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const weeks: number = Math.floor(days / 7);
  const months: number = Math.floor(days / 30);
  const years: number = Math.floor(days / 365);

  if (seconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes}m`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days < 7) {
    return `${days}d`;
  } else if (weeks < 4) {
    return `${weeks}w`;
  } else if (months < 12) {
    return `${months}m`;
  } else {
    return `${years}y`;
  }
}