export const getHeaders = () => {
  const headers = new Headers();
  headers.append("x-client-id", localStorage.getItem("x-client-id"));
  headers.append("x-client-secret", localStorage.getItem("x-client-secret"));
  headers.append("x-product-instance-id", localStorage.getItem("x-product-instance-id"));
  return headers;
};