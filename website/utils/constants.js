const ApiMethod = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

const ApiStatus = {
  Success: "success",
  Fail: "fail",
  Error: "error",
};

const NotifyType = {
  Success: "success",
  Info: "info",
  Warning: "warning",
  Error: "error",
};

const ApiCode = {
  Ok: 200,
  Created: 201,

  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,

  InternalServerError: 500,
  ServiceUavailable: 503,
};

export { ApiMethod, ApiStatus, ApiCode, NotifyType };
