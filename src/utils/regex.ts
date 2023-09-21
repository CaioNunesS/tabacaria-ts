export const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6})$/;

export const phoneRegex = /^(?:(?![1-9]{2}9)\d{10}|[1-9]{2}9\d{8})$/;

export const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export const valueRegex = /^\d+(\.\d+)?$/;
