import i18next from "i18next";

const errorMessages = (response: any) => {
  if (!response) {
    return i18next.t("errors:network");
  }

  const errorCode = response?.data?.errorCode;
  if (errorCode && i18next.exists(`errors:${errorCode}`)) {
    return i18next.t(`errors:${errorCode}`);
  }

  return i18next.t("errors:unexpected");
};

export default errorMessages;
