import React, { useEffect, useState } from 'react'
import StudentRecord from '../components/StudentRecord.jsx'

import SearchBar from '../components/SearchBar.jsx';
import student_records from '../sdetails.js';

import Card from '../components/Card.jsx';

import OverViewCard from '../components/OverViewCard.jsx';

const Application = () => {

    const [searchValue, setSearchValue] = useState("");

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

    return (

        <div>
            <Card />

            <div className='px-2 my-4 space-y-4 pb-5'>
                <div className='flex pb-2'>
                    <button onClick={() => markAll(true)} className='bg-green-500 w-full rounded p-1 border-slate-800 border-2'>All Present</button>
                    <button onClick={() => markAll(false)} className='bg-red-500 w-full rounded p-1 border-slate-800 border-2'>All Absent</button>
                </div>
                <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>

            <div className='flex flex-col space-y-3 my-4'>
                {filteredRecords.map((record, index) => (
                    <StudentRecord key={record.rollNo} updateRecordStatus={updateRecordStatus} record={record} index={index} />
                ))}
            </div>

            <hr className='border-2 my-10 border-stone-700 rounded-full w-40 mx-auto' />

            <OverViewCard records={records} />

        </div >
    )
}

export default Application