/* eslint-disable @typescript-eslint/no-explicit-any */
export type ErrorResponseWithMessage = {
  response: {
    data: {
      message: string;
    };
  };
};

export function isErrorWithMessage(
  error: any
): error is ErrorResponseWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    'data' in error.response &&
    'message' in error.response.data &&
    typeof (error as Record<string, any>).response.data.message === 'string'
  );
}
