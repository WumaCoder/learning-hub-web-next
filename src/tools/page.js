export const createQuery = ({
  isUse = true,
  field,
  value,
  model = "default",
}) => {
  if (isUse) {
    return `${field}@${model}:${value}`;
  }
  return null;
};
