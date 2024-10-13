export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

export const setCookie = (name, value, options = {}) => {
  let cookieString = `${name}=${value}; path=${options.path || "/"};`;

  if (options.maxAge) {
    cookieString += `max-age=${options.maxAge};`;
  }

  if (options.domain) {
    cookieString += `domain=${options.domain};`;
  }

  document.cookie = cookieString;
};
