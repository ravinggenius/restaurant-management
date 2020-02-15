export const SAFE_METHODS = {
	GET: "GET",
	POST: "POST"
} as const;

export const METHODS = {
	...SAFE_METHODS,
	DELETE: "DELETE",
	PATCH: "PATCH",
	PUT: "PUT"
} as const;

export const fetchApi = (
	method: string,
	path: string,
	options: RequestInit = {}
) => {
	const url = new URL(path, process.env.REACT_APP_API_BASE_URL);

	return fetch(url.toString(), {
		method: method as string,
		...options
	});
};
