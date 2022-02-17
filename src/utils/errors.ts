import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (axios.isAxiosError(error)) {
      const err = error.toJSON() as { message: string };
      return err.message;
    }

    return error.message;
  }

  return '';
};

export default {};
