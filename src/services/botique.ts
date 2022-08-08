import axios from "./axios";

export const getBoutiques = () => {
  return axios.get(
    "https://4149o8lffa.execute-api.eu-west-1.amazonaws.com/challenge/boutiques"
  );
};

export default { getBoutiques };
