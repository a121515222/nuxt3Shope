export const removePTag = (description: string): string => {
  return description.replace(/<[^>]+>/g, "");
};
