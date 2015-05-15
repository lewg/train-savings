export default function periodic(time_interval, periodic_cost, weeks) {
  var cost = 0;
  switch (time_interval) {
    case ('Annual'):
      cost = periodic_cost;
      break;
    case ('Monthly'):
      cost = periodic_cost * 12;
      break;
    case ('Weekly'):
      cost = periodic_cost * weeks;
      break;
    default:
      cost = periodic_cost * weeks * 5;
  }
  return(cost);
}
