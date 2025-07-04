import React, { useEffect, useState } from "react";
import { LuUserRoundSearch } from "react-icons/lu";
import { Addstudent } from "../components/Addstudent";
import { GetAllStudents, Update_DeletedStudent } from "../api";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import * as XLSX from 'xlsx';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export default function Student() {
    const [addStudent, setAddstudent] = useState(false)
    const [students, setStudents] = useState([])
    const [updateStudent, setUpdateStudent] = useState({})

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {
        const url = GetAllStudents
        try {
            const res = await axios.get(url);
            setStudents(res.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    }
    const handleDelete = async (ID) => {
        let url = Update_DeletedStudent(ID)
        try {
            await axios.delete(url)
            getStudents()
            toast.success("Delete Success")
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    }

    const handleUpdate = (ID) => {
        let data = students.find((data) => data.id == ID)
        setUpdateStudent(data)
        setAddstudent(true)
    }

    const exportToXLSX = () => {
        if (students.length === 0) {
            toast.error("No student data to export!");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(students);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'students.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("XLSX file exported successfully!");
    };

    const getDepartmentDataForChart = () => {
        const departmentCount = {};
        students.forEach(student => {
            departmentCount[student.department] = (departmentCount[student.department] || 0) + 1;
        });
        return Object.entries(departmentCount).map(([department, count]) => ({
            department,
            count
        }));
    };
    



    return (
        <div className='w-[90%] mx-auto my-10'>
            <ToastContainer />
            <div className='flex justify-between'>
                <div>
                    <h1 className=' text-gray-500 font-bold text-[20px]'>Manage Your Students Efficiently</h1>
                    <p>View student profiles, track their progress, and assign classes—all in one centralized place.</p>
                </div>
                <div className='flex gap-6'>
                    <button onClick={exportToXLSX} className=' text-blue-400 transition duration-500 ease-in-out hover:scale-125'>Export CSV</button>
                    <button onClick={() => setAddstudent(true)} className=' text-[#FFFFFF] border bg-blue-400 p-2 rounded-lg transition duration-500 ease-in-out hover:bg-blue-600 hover:scale-125 '  >Add Student</button>
                </div>
            </div>
            <div className='flex items-center gap-2 my-5 text-[15px]'>
                <LuUserRoundSearch size={25} />
                <input type="text" placeholder='Search for a student by name or email' className='border border-none w-full p-3 placeholder:text-[20px] text-gray-400 font-semibold rounded-md' />
            </div>

            {addStudent ? (
                <Addstudent setAddstudent={setAddstudent} getStudents={getStudents} updateStudent={updateStudent} setUpdateStudent={setUpdateStudent} />

            ) : (
                <div>
                    <h2 className='text-xl font-semibold text-gray-700 my-4'>Student per Department</h2>
                    <div className="w-full h-[300px] bg-white p-4 rounded-lg shadow mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getDepartmentDataForChart()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="department" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3182CE" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {
                        students.length <= 0 ? (
                            <div className="h-[80vh] flex justify-center items-center">
                                <div className="text-center ">
                                    <h1 className="font-semibold text-[28px] text-gray-600">
                                        No Student at this time
                                    </h1>
                                    <p className="font-medium text-[14px] text-gray-400">
                                        Student will appear here after they enroll in your school.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className='h-[450px] overflow-scroll'>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">S.No</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">register no</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">department</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Phone</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Gender</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Password</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Address</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, i) => (
                                            <tr key={student.id} className="hover:bg-gray-50 ">
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{i + 1}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.name}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.email}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.reg_no}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.department}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.phone}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.gender}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.password}</th>
                                                <th className="py-3 px-4 text-left font-semibold text-gray-700">{student.address}</th>
                                                <td className="py-3 px-4 border-t border-gray-200 flex gap-2 items-center">
                                                    <span><MdDelete onClick={() => handleDelete(student.id)} size={30} color='red' /></span>
                                                    <span> <RxUpdate onClick={() => handleUpdate(student.id)} size={20} color='blue-400' /></span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </div>
            )}
        </div>
    )
}