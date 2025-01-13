export const saveForm = data => {
  return http.request("post", baseUrlApi("product/addOrUpdate"), { data });
};
