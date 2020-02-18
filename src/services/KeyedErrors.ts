class KeyedErrors extends Error {
	static serialize(error: KeyedErrors | Error | string | Object | void) {
		if (error instanceof KeyedErrors) {
			return error.asJSON();
		} else if (error instanceof Error) {
			return {
				base: [error.message]
			};
		} else if (typeof error === "string") {
			return {
				base: [error]
			};
		} else {
			return error || {};
		}
	}

	private data: {
		[key: string]: Array<string>;
	} = {};

	constructor() {
		super();

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, KeyedErrors);
		}

		this.name = "KeyedErrors";
	}

	add(key: string, message: string) {
		this.data[key] = this.data[key] || [];

		this.data[key].push(message);
	}

	asJSON() {
		return this.data;
	}

	hasErrors() {
		return Object.keys(this.data).length > 0;
	}
}

export default KeyedErrors;
