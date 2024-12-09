export function handleImageError(event: Event) {
  if (event.target) {
    (event.target as HTMLImageElement).src = "/defaultImg/image-1@2x.jpg";
  }
}
