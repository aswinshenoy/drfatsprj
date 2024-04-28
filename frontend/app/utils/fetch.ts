
const API_URL = process.env.SERVER_API_URL;

const Fetch = async (path: string, disableCache: boolean = false) => {
  return await fetch(
    `${API_URL}${path}`,
    {
      next: {
        revalidate: disableCache ? 0 : 60,
      },
    }
    )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then((data) => {
      if(data.error) {
        throw new Error(data.error);
      }
      return {
        data,
        error: null,
      }
    })
    .catch((error) => {
      return {
        data: null,
        error,
      }
    });
};

export default Fetch;
