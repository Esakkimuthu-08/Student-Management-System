import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { GetAllloginUsers, GetAllTeachers, Update_DeletedTeacher } from "../api";
import axios from "axios";
import { toast } from "react-toastify";

export const Addteachers = ({ setAddteacher, getTeachers, updateTeachers, setUpdateTeachers }) => {

    const initialTeachersData = {
        name: "",
        email: "",
        degree: "",
        subject: "",
        phone: "",
        gender: "",
        password: ""
    };

    const [teachersData, setTeachersData] = useState(initialTeachersData)

    useEffect(() => {
        if (updateTeachers) {
            setTeachersData({
                name: updateTeachers.name || "",
                email: updateTeachers.email || "",
                degree: updateTeachers.degree || "",
                subject: updateTeachers.subject || "",
                phone: updateTeachers.phone || "",
                gender: updateTeachers.gender || "",
                password: updateTeachers.password || ""
            });
        }
    }, [updateTeachers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeachersData((data) => ({
            ...data,
            [name]: value
        }));
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updateTeachers && updateTeachers.id) {
            const url = Update_DeletedTeacher(updateTeachers.id)
            await axios.put(url, teachersData);
            setUpdateTeachers({})
            setAddteacher(false)
            getTeachers()
            toast.success("Updated successfully!");
        } else {
            let url = GetAllTeachers;
            let urlLogin = GetAllloginUsers;
            let payloadLogin = {
                username: teachersData.name,
                password: teachersData.password
            }
            try {
                await axios.post(url, teachersData);
                await axios.post(urlLogin, payloadLogin)
                setUpdateTeachers([])
                setTeachersData(initialTeachersData);
                setAddteacher(false)
                toast.success("Created successfully!");
                getTeachers()
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        }
    };

    return (
        <div>
            <div className="w-[80%] mx-auto my-0 p-2">
                <div>
                    <h1 className="font-semibold text-[32px] text-gray-800">Add Teachers</h1>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 flex justify-between rounded-lg shadow-md font-medium text-[14px] text-gray-500 boxShadowCard"
                >
                    <table className="table-auto w-[70%]">
                        <tbody>
                            <tr>
                                <td className="pb-10">
                                    <label htmlFor="name">Full </label>
                                    <input
                                        required
                                        name="name"
                                        value={teachersData.name}
                                        onChange={handleChange}
                                        type="text"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm"
                                    />
                                </td>
                            </tr>
                            <tr className="flex gap-10 pb-10 items-center">
                                <td>
                                    <lable>Email</lable>
                                    <input
                                        required
                                        name="email"
                                        value={teachersData.email}
                                        onChange={handleChange}
                                        type="email"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm"
                                    />
                                </td>
                                <td>
                                    <label>degree</label>
                                    <input
                                        required
                                        name="degree"
                                        value={teachersData.degree}
                                        onChange={handleChange}
                                        type="text"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm"
                                    />
                                </td>
                                <td className="mt-5">
                                    <select
                                        required
                                        name="gender"
                                        value={teachersData.gender}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="" disabled selected hidden>
                                            Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </td>
                            </tr>
                            <tr className="flex pb-10 gap-10">
                                <td>
                                    <label>Password</label>
                                    <input
                                        required
                                        name="password"
                                        value={teachersData.password}
                                        onChange={handleChange}
                                        type="password"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm"
                                    />
                                </td>
                                <td>
                                    <label>Phone number</label>
                                    <input
                                        required
                                        name="phone"
                                        value={teachersData.phone}
                                        onChange={handleChange}
                                        type="tel"
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm md:text-sm"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Subject</label>
                                    <input
                                        required
                                        name="subject"
                                        value={teachersData.subject}
                                        onChange={handleChange}
                                        type="text"
                                        className="border border-gray-300 p-2 rounded w-full"
                                    />
                                </td>
                            </tr>
                        </tbody>

                        <div className="flex gap-20 font-medium text-[16px] text-gray-500 mt-4">
                            <button
                                type="submit"
                                className="border bg-gray-300 px-4 py-2 rounded-md transition duration-500 ease-in-out hover:bg-blue-600 hover:text-white hover:scale-110"
                            >
                                {updateTeachers && updateTeachers.id ? "Update Teacher" : "Add Teacher"}
                            </button>
                        </div>
                    </table>

                    <IoMdCloseCircle
                        onClick={() => { setAddteacher(false), setUpdateTeachers([]) }}
                        className="cursor-pointer hover:text-red-500 transition"
                        size={50}
                    />
                </form>
            </div>
        </div>
    );
};
