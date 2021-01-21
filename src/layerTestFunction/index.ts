import { hi } from "/opt/nodejs/orderService";

exports.handler = async () => {
  console.log("From layer", hi);
};
