const getErrorResponse = (msg: string) => ({
  data: { results: [] },
  error: msg,
});

const requests = {
  get: async (url: string | URL) => {
    try {
      const response = await fetch(url);

      if (response.status >= 400 && response.status < 500) {
        return getErrorResponse('Check the correctness of the request.');
      }

      if (response.status >= 500 && response.status < 600) {
        return getErrorResponse('Server error. Try again later!');
      }

      if (!response.ok) {
        return getErrorResponse(
          `Could not fetch ${url} with ${response.status} status`
        );
      }

      const data = await response.json();
      console.log(data);

      return {
        data,
        error: '',
      };
    } catch {
      return getErrorResponse('Something was wrong. Try again later!');
    }
  },
};
export { requests };
