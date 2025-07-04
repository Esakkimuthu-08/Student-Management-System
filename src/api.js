const VITE_API_URL = import.meta.env.VITE_API_URL;

export const GetAllloginUsers = `${VITE_API_URL}/loginUsers`
// export const GetloginUserUpdate = `${VITE_API_URL}/loginUsers/${id}`
export const GetAllTeachers = `${VITE_API_URL}/Teachers`
export const Update_DeletedTeacher = (id) => `${VITE_API_URL}/Teachers/${id}`;
export const GetAllStudents = `${VITE_API_URL}/Students`
export const Update_DeletedStudent = (id) => `${VITE_API_URL}/Students/${id}`;
