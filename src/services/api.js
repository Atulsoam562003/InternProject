import axios from "axios";

const host = "http://localhost:3005/api";

export const call = async (method, path, data) => {
  const response = await axios({
    method,
    url: `${host}/${path}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });

  return response.data;
};

export default { call };
