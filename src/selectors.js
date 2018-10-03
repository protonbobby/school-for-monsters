//_______________________________________________________________
//for NavBar.js,
export const currentNav = (value, path, fuzzy = false) => {
  let style = {};
  value === path || (fuzzy && path.indexOf(value) === 0) ?
    style.fontWeight = 'bold' : null;
  return style;
}

//_______________________________________________________________
//for Students.js,
export const selected = (value, filter) => value === filter ? 'success' : 'secondary';

export const matchSchool = (schools, schoolId) => {
  const school = schools.find(school => {
    return school.id === schoolId
  })
  return school.name
}

export const enrolled = (students, filter = undefined) => {
  let enrollment = students;
  if (filter) {
    if (filter === 'enrolled' || typeof filter * 1 === 'number') {
      enrollment = enrollment.filter(student => student.schoolId)
    }
    if (filter === 'unenrolled') {
      enrollment = enrollment.filter(student => !student.schoolId)
    }
  }
  return enrollment;
}

//_______________________________________________________________
//for SchoolCreateUpdate.js, StudentCreateUpdate.js
export const giveMeOne = (collection, id) => {
  return collection.find(item => item.id === id * 1)
}
