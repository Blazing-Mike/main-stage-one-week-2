export function formatPrice(number) {
  // Convert number to string first
  let numStr = number.toString();
  
  // Use a regular expression to match digits and add commas appropriately
  // (\d)(?=(\d{3})+(?!\d)) - this part of the regex matches a digit (\d)
  // followed by groups of three digits ((\d{3})+)
  // which are followed by a negative lookahead ((?!\d))
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return numStr;
}
