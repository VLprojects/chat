import axios from 'axios';

export const getErrorMessage = (error: Error): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data.message) {
      return String(error.response.data.message);
    }
    return 'Unknown server error';
  }

  return error.message;
}

export default {};
