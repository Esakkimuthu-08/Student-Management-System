import React, { useEffect, useState } from 'react'
import { LuUserRoundSearch } from "react-icons/lu";
import { Addteachers } from '../components/Addteachers';
import { GetAllTeachers, Update_DeletedTeacher } from '../api';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { RxUpdate } from "react-icons/rx";
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export default function Teachers() {

    const [addTeachers, setAddteachers] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [updateTeachers, setUpdateTeachers] = useState({})

    useEffect(() => {
        getTeachers()
    }, [])

    const getTeachers = async () => {
        const url = GetAllTeachers;
        try {
            const res = await axios.get(url);
            setTeachers(res.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleDelete = async (ID) => {
        let url = Update_DeletedTeacher(ID)
        try {
            await axios.delete(url)
            getTeachers()
            toast.success("Delete Success");
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    }

    const handleUpdate = (ID) => {
        const data = teachers.find((data) => data.id === ID)
        setUpdateTeachers(data)
        setAddteachers(true)
    }

    const exportToXLSX = () => {
        if (teachers.length === 0) {
            toast.error("No student data to export!");
            return;
        }
        const worksheet = XLSX.utils.json_to_sheet(teachers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Teachers");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Teachers.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success("XLSX file exported successfully!");
    };


    const getSubjectDataForChart = () => {
        const subjectCount = {};
        teachers.forEach(teacher => {
            subjectCount[teacher.subject] = (subjectCount[teacher.subject] || 0) + 1;
        });
        return Object.entries(subjectCount).map(([subject, count]) => ({
            subject,
            count
        }));
    };

    return (
        <div className=' w-[90%] mx-auto my-10'>
            <ToastContainer />
            <div className=' lg:flex justify-between' >
                <div>
                    <h1 className=' text-gray-500 font-bold  md:text-[20px]'>Admin Tools for Managing Teachers</h1>
                    <p>Easily manage and view teacher profiles, assign classes, and track performance.</p>
                </div>
                <div className='flex md:mt-8 lg:mt-0 gap-6'>
                    <button onClick={exportToXLSX} className=' text-blue-400 transition duration-500 ease-in-out hover:scale-125 '>Export CSV</button>
                    <button onClick={() => setAddteachers(true)} className=' text-white border bg-blue-400 p-2 rounded-lg transition duration-500 ease-in-out hover:scale-125 hover:bg-blue-600'>
                        Add Teachers
                    </button>
                </div>
            </div>
            <div className=' flex items-center md:gap-2 md:my-5 md:text-[15px]'>
                <LuUserRoundSearch size={25} />
                <input type="text" placeholder='Search for a Teachers by name or email' className='border border-none w-full p-3 placeholder:text-[20px] text-gray-400 font-semibold rounded-md ' />
            </div>

            {addTeachers ? (
                <Addteachers setAddteacher={setAddteachers} getTeachers={getTeachers} updateTeachers={updateTeachers} setUpdateTeachers={setUpdateTeachers} />
            ) : (
                <div className="">
                    <h2 className='text-xl font-semibold text-gray-700 my-4'>Teachers per Subject</h2>
                    <div className="w-full h-[300px] bg-white p-4 rounded-lg shadow mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getSubjectDataForChart()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3182CE" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {
                        teachers.length <= 0 ? (<div className=" text-center ">
                            <h1 className="font-semibold text-[28px] text-gray-600">
                                No Teachers at this time
                            </h1>
                            <p className="font-medium text-[14px] text-gray-400">
                                Teachers will appear here after they enroll in your school.
                            </p>
                        </div>) : (
                            <div className='h-[450px] overflow-scroll'>
                                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">S.No</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Degree</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Subject</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Phone</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Gender</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Password</th>
                                            <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teachers.map((teacher, i) => (
                                            <tr key={teacher.id} className="hover:bg-gray-50 ">
                                                <td className="py-3 px-4 border-t border-gray-200">{i + 1}</td>
                                                <td className="py-3 px-4 border-t border-gray-200">{teacher.name}</td>
                                                <td className="py-3 px-4 border-t border-gray-200">{teacher.email}</td>
                                                <td className="py-3 px-4 border-t border-gray-200">{teacher.degree}</td>
                                                <td className="py-3 px-4 border-t border-gray-200">{teacher.subject}</td>
                                                <td className="py-3 px-4 border-t border-gray-200">{teacher.phone}</td>
                                                <td className="py-3 px-4 border-t border-gray-200">{teacher.gender}</td>
                                                <td className="py-3 px-4 border-t border-gray-200">{teacher.password}</td>
                                                <td className="py-3 px-4 border-t border-gray-200 flex gap-2 items-center">
                                                    <span><MdDelete onClick={() => handleDelete(teacher.id)} size={30} color='red' /></span>
                                                    <span> <RxUpdate onClick={() => handleUpdate(teacher.id)} size={20} color='blue-400' /></span>
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
