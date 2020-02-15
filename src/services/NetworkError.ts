class NetworkError extends Error {
	response: Response;

	constructor(message: string, response: Response) {
		super(message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NetworkError);
		}

		this.name = "NetworkError";

		this.response = response;
	}
}

export default NetworkError;
