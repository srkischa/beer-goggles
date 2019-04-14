type PartialKeyValueObject = {
  [key: string]: string | number | undefined;
};

function toQueryStringParams(obj: PartialKeyValueObject) {
  const l = Object.keys(obj).map(key => {
    if (obj[key] !== undefined) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(obj[
        key
      ] as string)}`;
    } else {
      return "";
    }
  });

  return l.filter(value => !!value).join("&");
}

export default toQueryStringParams;
