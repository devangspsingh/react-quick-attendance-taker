import React, { useEffect } from 'react'
import { useState } from 'react'
import { Switch } from '@headlessui/react'


const StudentRecord = (props) => {
    const { record, index, updateRecordStatus } = props
    const [enabled, setEnabled] = useState(record.status)

    const toggleSwitch = () => {
        setEnabled(!enabled)
        updateRecordStatus(record, !enabled)

    }

    useEffect(() => {
        setEnabled(record.status)
    }, [record.status])


    return (
        <div className={`${enabled ? "bg-green-950" : (index % 2 !== 0 ? "bg-stone-950" : "bg-stone-800")} px-5 py-2 rounded-full `}>
            <div onClick={toggleSwitch} className="flex hover:cursor-pointer justify-between items-center">
                <div>
                    <span className='mr-4'>{record.rollNo.toString().slice(7,)}.</span>
                    <span className=''>{record.name}</span>
                </div>

                <div>
                    <Switch
                        checked={enabled}
                        onChange={toggleSwitch}
                        className={`${enabled ? 'bg-green-500' : 'bg-red-500'
                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                    >
                        <span className="sr-only">Toggle Present</span>
                        <span
                            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default StudentRecord