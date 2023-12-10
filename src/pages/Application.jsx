import React, { Fragment, useEffect, useRef, useState } from 'react'
import StudentRecord from '../components/StudentRecord.jsx'

import SearchBar from '../components/SearchBar.jsx';
import student_records from '../sdetails.js';
import ReactDOM from 'react-dom';

import { RadioGroup } from '@headlessui/react'
import { FaDownload, FaFilePdf, FaPaperPlane, FaPlane, FaShare, FaTextHeight, FaWhatsapp, FaWordpressSimple } from 'react-icons/fa';
import Card from '../components/Card.jsx';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import { Tab } from '@headlessui/react'
import MyDocument from '../pdfcomponents/Document.jsx';

const Application = () => {
    const [attendanceFormat, setAttendanceFormat] = useState('All')
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
        // console.log(updatedRecords)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [records])

    useEffect(() => {
        const filtered = records.filter(
            entry =>
                entry.rollNo.toString().toLowerCase().slice(7,).includes(searchValue) ||
                entry.name.toLowerCase().includes(searchValue.toLowerCase()
                )
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setFilteredRecords(filtered)
    }, [searchValue])

    const formatRecordsToString = (records, filter = null) => {
        let formattedString = "";

        if (filter === "OnlyPresent") {
            formattedString = `Present Students: ${records.filter(entry => entry.status).length}\n\n`;
        }

        records.forEach((record) => {
            if (filter === "OnlyPresent") {
                if (record.status) {
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

    const records_for_pdf = (records, filter = null) => {
        let filtered_records_for_pdf = records
        if (filter === "OnlyPresent") {
            filtered_records_for_pdf = records.filter(entry => entry.status);
        }
        else if (filter === "OnlyAbsent") {
            filtered_records_for_pdf = records.filter(entry => !entry.status);
        }

        return filtered_records_for_pdf;
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
                    <StudentRecord key={record.rollNo} updateRecordStatus={updateRecordStatus} record={record} index={index} />
                ))}
            </div>

            <hr className='border-2 my-10 border-stone-700 rounded-full w-40 mx-auto' />

            <div className='bg-stone-800 rounded-lg p-8 my-10'>

                <div className='font-semibold text-lg mb-2 -mt-4 text-center text-stone-300'>Overview</div>
                <hr className='w-8 mx-auto mb-4 border-2 rounded-full border-stone-600' />
                <table className="min-w-full rounded">
                    <thead className="">
                        <tr className='text-white rounded-full'>
                            <th scope="col" className="rounded-tl-md bg-stone-700 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Present
                            </th>
                            <th scope="col" className="bg-stone-700 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Absent
                            </th>
                            <th scope="col" className="rounded-tr-md bg-stone-700 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">

                        <tr>
                            <td className="bg-stone-600 rounded-bl-md px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm font-medium">{records.filter(entry => entry.status).length}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="bg-stone-600 px-6 py-4 whitespace-nowrap">
                                <div className="text-sm"> {records.filter(entry => !entry.status).length}</div>
                            </td>
                            <td className="rounded-br-md bg-stone-600 px-6 py-4 whitespace-nowrap">
                                <div className="text-sm">{records.length}</div>
                            </td>
                        </tr>

                    </tbody>
                </table>



                <RadioGroup value={attendanceFormat} className="my-8" onChange={setAttendanceFormat}>
                    <RadioGroup.Label className="font-semibold">Choose Attendance Format to Export</RadioGroup.Label>
                    <div className='flex gap-2 my-2 border'>
                        {["All", "OnlyPresent", "OnlyAbsent"].map((entry) => (
                            <RadioGroup.Option className="text-center w-1/3" value={entry}>
                                {({ checked }) => (
                                    <div className={checked ? 'text-center bg-stone-700 w-full' : "w-full"}>{entry}</div>
                                )}
                            </RadioGroup.Option>
                        ))}

                    </div>
                </RadioGroup>


                <div className="flex py-2 gap-4">
                    <button onClick={() => {
                        // console.log(formatRecordsToString(records, attendanceFormat))
                        share_attendance(formatRecordsToString(records, attendanceFormat))
                    }}
                        className='flex justify-center items-center font-semibold w-1/2 gap-2 bg-green-500 rounded-md px-2 py-1'>
                        <span ref={share_atten_ref}>Share Text</span> <FaShare />
                    </button>

                    <PDFDownloadLink className='font-semibold bg-green-500 p-1 px-2 rounded-md w-1/2'
                        document={<MyDocument records={records_for_pdf(records, attendanceFormat)} />}
                        fileName="quick-attendance-dspsc.pdf">
                        {({ blob, url, loading, error }) =>
                            loading
                                ? 'Loading document...'
                                : <span className='gap-2 flex justify-center items-center '>Download <FaFilePdf /></span>
                        }
                    </PDFDownloadLink>
                </div>
            </div>

            {/* 
            <PDFViewer className='w-full h-[125vh]'>
                <MyDocument records={records_for_pdf(records, attendanceFormat)} />
            </PDFViewer> */}
        </div >
    )
}

export default Application