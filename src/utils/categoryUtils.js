export function findLabel(categoryId, categoryIds) {
  for (let i = 0; i < categoryIds.length; i++) {
    if (categoryId === categoryIds[i].id) return categoryIds[i].label;
  }
  return "";
}

export function findPage(categoryId, categoryIds) {
  for (let i = 0; i < categoryIds.length; i++) {
    if (categoryId === categoryIds[i].id) return categoryIds[i].page;
  }
  return "";
}
