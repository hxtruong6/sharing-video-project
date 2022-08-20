const randomInt = (min, max) => {
  return Math.floor(min) + Math.floor(Math.random() * Math.floor(max));
};

const checkLogged = () => {
  return !!window?.localStorage?.getItem("user");
};

const logout = () => {
  window?.localStorage?.clear();
};

export { randomInt, checkLogged, logout };
