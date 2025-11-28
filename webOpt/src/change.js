export default function changeImgageSize(id, subtractWidth, subtractHeight) {
  const image = document.getElementById(id);
  if (image) {
    image.width -= subtractWidth;
    image.height -= subtractHeight;
  }
}
