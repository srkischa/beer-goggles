type KeyValueObject = {
  [key: string]: string | undefined;
};

type Partial<T> = { [P in keyof T]?: T[P] };

type PartialKeyValues = Partial<KeyValueObject>;

function toQueryStringParams(obj: KeyValueObject) {
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
