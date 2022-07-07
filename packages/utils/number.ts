// Number utilities

// Converts a value (string, number, etc.) to an integer number
// Assumes radix base 10
export const toInteger = (value: any, defaultValue = Number.NaN) => {
  const integer = Number.parseInt(value, 10)
  return Number.isNaN(integer) ? defaultValue : integer
}

// Converts a value (string, number, etc.) to a number
export const toFloat = (value: any, defaultValue = Number.NaN) => {
  const float = Number.parseFloat(value)
  return Number.isNaN(float) ? defaultValue : float
}

// Converts a value (string, number, etc.) to a string
// representation with `precision` digits after the decimal
// Returns the string 'NaN' if the value cannot be converted
export const toFixed = (val: any, precision: any) =>
  toFloat(val).toFixed(toInteger(precision, 0))
