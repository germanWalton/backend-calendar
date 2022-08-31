import moment from "moment";

const isDate = (value) => {
  if (!value) {
    return false;
  }
  const date = moment(value);
  if (date.isValid()) {
    return true;
  } else {
    return false;
  }
};

export default isDate;
