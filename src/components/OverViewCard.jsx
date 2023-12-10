import React, { useRef, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { FaFilePdf, FaShare } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';

import MyDocument from '../pdfcomponents/Document.jsx';

const OverViewCard = (props) => {
    const { records } = props

    const [attendanceFormat, setAttendanceFormat] = useState('All')

    const share_atten_ref = useRef()

    const currentDate = new Date().toLocaleDateString();

    const [createPdf, setCreatePdf] = useState(false)
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
                <div className='flex my-2 border-4 rounded-md border-stone-700'>
                    {["All", "OnlyPresent", "OnlyAbsent"].map((entry) => (
                        <RadioGroup.Option className="text-center w-1/3" value={entry}>
                            {({ checked }) => (
                                <div className={checked ? 'font-bold text-center rounded bg-stone-700 w-full' : "bg-stone-800 rounded w-full"}>{entry}</div>
                            )}
                        </RadioGroup.Option>
                    ))}

                </div>
            </RadioGroup>


            <div className="flex py-2 gap-4">
                <button onClick={() => {
                    share_attendance(formatRecordsToString(records, attendanceFormat))
                }}
                    className='flex justify-center items-center font-semibold w-1/2 gap-2 bg-green-500 rounded-md px-2 py-1'>
                    <span ref={share_atten_ref}>Share Text</span> <FaShare />
                </button>


                {
                    createPdf ?
                        <PDFDownloadLink onClick={() => {
                            setTimeout(() => {
                                setCreatePdf(!true)
                            }, 1000)
                        }} className='font-semibold bg-green-500 p-1 px-2 rounded-md w-1/2'
                            document={<MyDocument records={records_for_pdf(records, attendanceFormat)} />}
                            fileName={`attendance-cs2ndyr-${currentDate}.pdf`}>
                            {({ blob, url, loading, error }) =>
                                loading
                                    ? 'Loading document...'
                                    : <span className='gap-2 flex justify-center items-center '>Download <FaFilePdf /></span>
                            }
                        </PDFDownloadLink>
                        : <button onClick={() => {
                            setCreatePdf(true)
                        }}
                            className='flex justify-center items-center font-semibold w-1/2 gap-2 bg-yellow-500 rounded-md px-2 py-1'>
                            <span ref={share_atten_ref}>Create Pdf</span> <FaFilePdf />
                        </button>
                }

            </div>
        </div>
    )
}

export default OverViewCard