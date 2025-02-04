const getErrorResponse = (msg: string) => ({
  data: { results: [] },
  error: msg,
});

const requests = {
  get: async (url: string | URL) => {
    try {
      const response = await fetch(url);

      if (response.status >= 400 && response.status < 500) {
        return getErrorResponse('Сheck the correctness of the request.');
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

      return {
        data,
        error: '',
      };
    } catch {
      return getErrorResponse('Something was wrong. Try again later!');
    }
  },
};

// const requests = {
//   get: async (url: string | URL) => {
//     try {
//       const response = await fetch(url);

//       if (!response.ok) {
//         return {
//           data: { results: [] },
//           error: `Could not fetch ${url} with ${response.status} status`,
//         };
//       }

//       if (response.status === 404) {
//         return {
//           data: { results: [] },
//           error: 'Рроверьте корректность запроса.',
//         };
//       }

//       if (response.status === 500) {
//         return {
//           data: { results: [] },
//           error: 'Ошибка сервера, попробуйте позже.',
//         };
//       }

//       const data = await response.json();

//       return {
//         results: data.results,
//         error: '',
//       };
//     } catch {
//       return {
//         data: { results: [] },
//         error: 'Что-то пошло не так. Попробуйте позже',
//       };
//     }
//   },
// };

export { requests };
