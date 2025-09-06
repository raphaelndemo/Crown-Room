export type ApiListResponse<T> = { items: T[]; nextCursor: string | null };
export type ApiError = { error: { message: string } }; 