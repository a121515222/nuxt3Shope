export const removePTag = (description: string): string => {
  if (!description) return "";
  return description.replace(/<[^>]+>/g, "");
};
