//_______________________________________________________________
//for NavBar.js,
export const currentNav = (value, path, fuzzy = false) => {
  let style = {};
  value === path || (fuzzy && path.indexOf(value) === 0) ?
    [style.backgroundColor = 'dodgerblue',
    style.color = 'white',
    style.fontWeight = 'heavy',
    style.padding = 8,
    style.borderRadius = 25,
    style.borderColor = 'black',
    style.borderWidth = 1,
    style.borderStyle = 'solid']
    :
    [style.backgroundColor = 'white',
    style.color = 'dodgerblue',
    style.fontWeight = 'heavy',
    style.padding = 8,
    style.borderRadius = 25,
    style.borderColor = 'black',
    style.borderWidth = 1,
    style.borderStyle = 'solid']
    ;
  return style;
}
