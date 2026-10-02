export function formatDateKey(iso: string) {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  return `${day}.${month}.${year}`;
}

export function formatTime(iso: string) {
  const date = new Date(iso);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDateLong(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString("pt-BR");
}

export function toDateInputValue(iso: string) {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function toTimeInputValue(iso: string) {
  const date = new Date(iso);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function combineDateAndTime(date: string, time: string) {
  return `${date}T${time}:00`;
}

export function nowDateInput() {
  return toDateInputValue(new Date().toISOString());
}

export function nowTimeInput() {
  return toTimeInputValue(new Date().toISOString());
}
