export function hasAccess(role, rolesAllowed) {
  for (let i = 0; i < rolesAllowed?.length; i++) {
    if (rolesAllowed[i] === role) return true;
  }

  return false;
}
