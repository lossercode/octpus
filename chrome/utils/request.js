export const request = async (url, config) => {
  const baseURL = "http://127.0.0.1:7001";
  try {
    const res = await fetch(`${baseURL}/${url}`, config);
    const data = await res.json()
    if (data.code !== 200) {
      console.log("some error in server");
      return Promise.reject(data)
    } else {
      return data.data
    }
  } catch (error) {
    console.log(error);
    return Promise.reject(error)
  }
};
