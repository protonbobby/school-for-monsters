export const selected = (value, filter) => value === filter ? 'success' : 'secondary';

export const currentNav = (value, path, fuzzy = false) => {
  let style = {};
  value === path || (fuzzy && path.indexOf(value) === 0) ?
    style.fontWeight = 'bold' : null;
  return style;
}
