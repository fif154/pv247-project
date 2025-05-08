export type ActionError = { error: string };
export type ServerActionResponse<T = object> = ActionError | undefined | T;

export function isActionError<T = object>(
    response: ServerActionResponse<T>
): response is ActionError {
    return (response as ActionError).error !== undefined;
}
