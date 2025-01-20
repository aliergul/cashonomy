const errorMessages = (response: any, ns = "generic.errors") => {
  console.log("response", response);
  console.log("ns", ns);
  return "error";
};

export default errorMessages;
