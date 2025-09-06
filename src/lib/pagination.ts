export function getNextCursor<T extends { id: string }>(items: T[], take: number) {
  return items.length > take ? items[take].id : null;
} 