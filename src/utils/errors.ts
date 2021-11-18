import axios, { AxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (axios.isAxiosError(error)) {
      const err = error as unknown as AxiosError<{ message: string }>;
      if (err.response?.data.message) {
        return String(err.response.data.message);
      }
      return 'Unknown server error';
    }

    return error.message;
  }

  return '';
};

export default {};
