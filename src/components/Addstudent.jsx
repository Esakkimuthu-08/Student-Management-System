import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { GetAllloginUsers, GetAllStudents, Update_DeletedStudent } from "../api";
import axios from "axios";
import { toast } from "react-toastify";


export const Addstudent = ({ setAddstudent, getStudents, updateStudent, setUpdateStudent }) => {

    const initialStudentsData = {
        name: "",
        reg_no: "",
        email: "",
        department: "",
        phone: "",
        gender: "",
        password: "",
        subject: "",
        address: ""

    }
    const [studentData, setStudentData] = useState(initialStudentsData)

    useEffect(() => {
        if (updateStudent) {
            setStudentData({
                name: updateStudent.name || "",
                reg_no: updateStudent.reg_no || "",
                email: updateStudent.email || "",
                department: updateStudent.department || "",
                phone: updateStudent.phone || "",
                gender: updateStudent.gender || "",
                password: updateStudent.password || "",
                subject: updateStudent.subject || "",
                address: updateStudent.address || ""

            })

        }
    }, [updateStudent])


    const handleChange = (e) => {
        const { name, value } = e.target
        setStudentData((data) => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updateStudent && updateStudent.id) {
            let url = Update_DeletedStudent(updateStudent.id)
            await axios.put(url, studentData)
            setUpdateStudent({})
            setAddstudent(false)
            toast.success("Successfully Updated")
            getStudents()
        } else {
            let url = GetAllStudents;
            let urlLogin = GetAllloginUsers;
            let payloadLogin = {
                username: studentData.name,
                password: studentData.password
            }
            console.log(urlLogin, payloadLogin);

            try {
                await axios.post(url, studentData)
                await axios.post(urlLogin, payloadLogin)
                setStudentData(initialStudentsData)
                getStudents()
                setAddstudent(false)
                toast.success("Successfully Added")

            } catch (error) {
                console.error("error fetching students", error)
            }
        }
    }

    return (
        <div>
            <div className=" w-[80%] mx-auto my-0 ">

                <div>
                    <h1 className=" font-semibold text-[32px] text-gray-800">Add Student</h1>
                </div>

                <form onSubmit={handleSubmit} className="bg-white   flex p-6 rounded-lg shadow-md font-medium text-[14px] text-gray-500">
                    <table className=" table-auto w-[75%]">
                        <tbody >
                            <tr className=" flex pb-10 gap-10" >
                                <td>
                                    <h1>Full Name</h1>
                                    <input
                                        required
                                        name="name"
                                        value={studentData.name}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder=""
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sml"
                                    />
                                </td>
                                <td>
                                    <h1>Reg No</h1>
                                    <input
                                        required
                                        name="reg_no"
                                        onChange={handleChange}
                                        value={studentData.reg_no}
                                        type="text"
                                        placeholder=""
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sml"

                                    />
                                </td>
                            </tr>
                            <tr className=" flex gap-10 pb-10 items-center">
                                <td className="">
                                    <h1>Email</h1>
                                    <input
                                        required
                                        name="email"
                                        onChange={handleChange}
                                        value={studentData.email}
                                        type="email"
                                        placeholder=""
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sml"

                                    />
                                </td>
                                <td >
                                    <h1>Department</h1>
                                    <input
                                        required
                                        name="department"
                                        onChange={handleChange}
                                        value={studentData.department}
                                        type="text"
                                        placeholder=""
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sml"

                                    />
                                </td>
                                <td className="mt-5">
                                    <select name="gender" required onChange={handleChange} value={studentData.gender}
                                        className=" p-1" id="">
                                        <option value="" disabled selected hidden>Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className=" flex  pb-10 gap-10">
                                <td>
                                    <h1>Password</h1>
                                    <input
                                        required
                                        name="password"
                                        onChange={handleChange}
                                        value={studentData.password}
                                        type="password"
                                        placeholder=""
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sml"

                                    />
                                </td>
                                <td >
                                    <h1>Phone number</h1>
                                    <input
                                        required
                                        name="phone"
                                        onChange={handleChange}
                                        value={studentData.phone}
                                        type="text"
                                        placeholder=""
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sml"

                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <h1>Address</h1>
                                    <input
                                        required
                                        name="address"
                                        onChange={handleChange}
                                        value={studentData.address}
                                        type="text"
                                        placeholder=""
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm md:text-sml"

                                    />
                                </td>
                            </tr>
                        </tbody>
                        <div className=" flex gap-20 font-medium text-[16px] text-gray-500 mt-10">
                            <button type="submit" className=" border bg-gray-300 px-4 py-2 rounded-md transition duration-500 ease-in-out hover:bg-blue-600  hover:text-white hover:scale-110">
                                {updateStudent && updateStudent.id ? "Update student" : "Add student"}
                            </button>
                        </div>
                    </table>
                    <IoMdCloseCircle
                        onClick={() => { setAddstudent(false), setUpdateStudent({}) }}
                        className="cursor-pointer hover:text-red-500 transition"
                        size={50}
                    />
                </form>
            </div >
        </div>
    )
}