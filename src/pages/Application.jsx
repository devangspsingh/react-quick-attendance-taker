import React, { Fragment, useEffect, useRef, useState } from 'react'
import StudentRecord from '../components/StudentRecord.jsx'

import SearchBar from '../components/SearchBar.jsx';
import student_records from '../sdetails.js';

import { RadioGroup } from '@headlessui/react'
import { FaPaperPlane, FaPlane, FaShare, FaWhatsapp } from 'react-icons/fa';
import Card from '../components/Card.jsx';

import { Tab } from '@headlessui/react'

const Application = () => {
    const [attendanceFormat, setAttendanceFormat] = useState('OnlyPresent')
    const share_atten_ref = useRef()

    const [searchValue, setSearchValue] = useState("");
    // const [filter, setFilter] = useState("all");

    const [records, setRecords] = useState(student_records)
    const [filteredRecords, setFilteredRecords] = useState(records)

    const markAll = (value) => {
        const updatedRecords = records.map((record) => ({
            ...record,
            status: value,
        }));
        setRecords(updatedRecords);
        console.log(updatedRecords)
    };

    const updateRecordStatus = (record, value) => {
        const updatedRecords = records.map((rec) => {
            if (rec.rollNo === record.rollNo && rec.name === record.name) {
                return {
                    ...rec,
                    status: value,
                };
            }
            return rec;
        });
        setRecords(updatedRecords);
    }

    useEffect(() => {
        setFilteredRecords(records)
        setSearchValue("")
    }, [records])

    useEffect(() => {
        const filtered = records.filter(entry => entry.rollNo.toString().includes(searchValue) || entry.name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredRecords(filtered)
    }, [searchValue])

    const formatRecordsToString = (records, filter = null) => {
        let formattedString = "";

        records.forEach((record) => {
            if (filter === "OnlyPresent") {
                if (record.status == true) {
                    formattedString += `${record.rollNo.toString().slice(7,)} ${record.status ? "P" : "A"} ${record.name}\n`;
                }
            }
            else if (filter === "OnlyAbsent") {
                if (!record.status) {
                    formattedString += `${record.rollNo.toString().slice(7,)} ${record.status ? "P" : "A"} ${record.name}\n`;
                }
            }
            else {
                formattedString += `${record.rollNo.toString().slice(7,)} ${record.status ? "P" : "A"} ${record.name}\n`;
            }
        });

        return formattedString;
    };

    const share_attendance = (text_attendance) => {
        if (navigator.share) {
            navigator
                .share({
                    // title: document.title,
                    // url: document.URL,
                    text: text_attendance
                })
                .then(() => {
                    //   console.log('Thanks for sharing!');
                })
                .catch(console.error);
        } else {
            navigator.clipboard.writeText(text_attendance);

            const past_state = share_atten_ref.current.innerText
            share_atten_ref.current.innerText = "copied !!!"
            setTimeout(function () {
                share_atten_ref.current.innerText = past_state;
            }, 2000);
        }
    }

    return (
        <div>
            <div>
                <Card />
            </div>

            <div className='px-2 my-4 space-y-4 pb-5'>
                <div className='flex pb-2'>
                    <button onClick={() => markAll(true)} className='bg-green-500 w-full rounded p-1 border-slate-800 border-2'>All Present</button>
                    <button onClick={() => markAll(false)} className='bg-red-500 w-full rounded p-1 border-slate-800 border-2'>All Absent</button>
                </div>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            {/* <RadioGroup value={filter} onChange={setFilter}>
                <RadioGroup.Label className="font-semibold">Filter</RadioGroup.Label>
                <div className='flex border rounded my-2'>
                    {["All", "Present", "Absent"].map((entry) => (
                        <RadioGroup.Option className="text-center w-1/3" value={entry}>
                            {({ checked }) => (
                                <div className={checked ? 'text-center bg-stone-700 w-full' : "w-full"}>{entry}</div>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup> */}

            <div className='flex flex-col space-y-3 my-4'>
                {filteredRecords.map((record, index) => (
                    <StudentRecord key={index} updateRecordStatus={updateRecordStatus} record={record} index={index} />
                ))}
            </div>

            <hr className='border-2 my-4 border-stone-700 rounded-full w-40 mx-auto' />
            <div>
                Overview

                Present Students:
                {records.filter(entry => entry.status).length}
                Total:{records.length}
            </div>

            <RadioGroup value={attendanceFormat} onChange={setAttendanceFormat}>
                <RadioGroup.Label className="font-semibold">Choose Attendance Format to Export</RadioGroup.Label>
                <div className='flex gap-2 my-2'>
                    <RadioGroup.Option value="all">
                        {({ checked }) => (
                            <span className={checked ? 'bg-stone-700 py-1 px-2 rounded' : 'py-1 px-2 rounded border'}>All</span>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="OnlyPresent">
                        {({ checked }) => (
                            <span className={checked ? 'bg-stone-700 py-1 px-2 rounded' : 'py-1 px-2 rounded border'}>OnlyPresent</span>
                        )}
                    </RadioGroup.Option>
                    <RadioGroup.Option value="OnlyAbsent">
                        {({ checked }) => (
                            <span className={checked ? 'bg-stone-700 py-1 px-2 rounded' : 'py-1 px-2 rounded border'}>OnlyAbsent</span>
                        )}
                    </RadioGroup.Option>
                </div>
            </RadioGroup>


            <div className="flex py-2">
                <button onClick={() => {
                    console.log(formatRecordsToString(records, attendanceFormat))
                    share_attendance(formatRecordsToString(records, attendanceFormat))
                }}
                    className='flex justify-center items-center font-semibold gap-2 bg-green-500 rounded-md px-2 py-1'>
                    <span ref={share_atten_ref}>Share Attendance</span> <FaShare />
                </button>
            </div>


        </div>
    )
}

export default Application