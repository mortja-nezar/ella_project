export function shortDescription(desc) {
  return desc.length > 50 ? desc.substring(0, 50) + "..." : desc;
}
