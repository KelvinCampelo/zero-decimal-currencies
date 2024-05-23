class ZeroDecimalError extends Error {
  constructor(message?: string) {
    super(
      message ||
        "An error occurred. If you can’t solve it, create an issue on https://github.com/KelvinCampelo/zero-decimal-currencies"
    );
    this.name = "ZeroDecimalError";
    // Ensuring the stack trace is correctly captured
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ZeroDecimalError);
    }
  }
}
export default ZeroDecimalError;
