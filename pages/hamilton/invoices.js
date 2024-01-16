'use client';

import Button from '@/components/atoms/Buttons';
import SaveIcon from '@/components/atoms/Icons/SaveIcon';
import TemplateInvoice from '@/components/organisms/Hamilton/TemplateInvoice';
import clsx from 'clsx';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import { useEffect, useRef, useState } from 'react';
import { read, utils, readFile } from 'xlsx';

// dimenssion of A4 in mm
const A4_width = 210;
const A4_height = 297;
const base_font = 10;
const padding = 10;

const default_headers = [
    'Work Order Technician Assigned', // 0 // A
    'Property Name', // 1 //B
    'Unit Key',
    'Unit Number',
    'Service Request Create Date', // 4 // E
    'Work Log Technician',
    'Work Order WorkGroup Assigned', // 6 // G
    'Service Request Number',
    'Work Order Number', // 8 // I
    'Work Order Comments', // 9 // J
    'Work Order Status Code',
    'Time Worked', // 11 // L
    '(Time Worked / 60)', // 12 // M
    'Dollar Calcif',
    'All Serv Type $',
    'Total((Time Worked / 60))',
    'Work Order Technician Assigned',
    'Total((Time Worked / 60))',
    'Total((Time Worked / 60))',
];

export const billable_key = 'THCMAINT-Billable';
export const overtime_key = 'THCMAINT- Overtime';
export const night_service_key = 'THCMAINT-Night Service';

export const time_prices = {
    [billable_key]: 72,
    [overtime_key]: 100,
    [night_service_key]: 90,
};

const aliasString = (str) => {
    return str
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .join('-');
};

const containsAllUppercase = (str) => {
    return /^[A-Z]+$/.test(str);
};

export default function Invoice() {
    const fileRef = useRef(null);
    const [technicians, setTechnicians] = useState({});
    const [errRows, setErrRows] = useState([]);
    const [invoices, setInvoices] = useState([]);

    const handleParseFileRaw = () => {
        const file = fileRef.current.files[0];
        const reader = new FileReader();

        const validateHeaders = (headers) => {
            return JSON.stringify(default_headers) == JSON.stringify(headers);
        };

        reader.onload = async function (e) {
            const data = e.target.result;
            const raw_sheet_index = 1;
            const workbook = read(data, {
                type: 'binary',
                cellDates: true,
                dense: true,
            });

            const worksheet = utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[raw_sheet_index]],
                { header: 1 }
            );

            if (validateHeaders(worksheet.shift())) {
                const error_rows = [];
                const technicians = {};

                worksheet.forEach((row, index) => {
                    if (
                        [
                            billable_key,
                            overtime_key,
                            night_service_key,
                        ].includes(row[6])
                    ) {
                        const work_type = row[6];
                        const time_workded = row[11];
                        const date = dayjs(row[4]).format('MM/DD/YYYY');
                        const description = row[9];
                        const work_order = row[8];
                        const technician_name = row[0];
                        const property_name = row[1];

                        if (!technicians[technician_name]) {
                            technicians[technician_name] = {};
                        }

                        if (!technicians[technician_name][property_name]) {
                            technicians[technician_name][property_name] = [];
                        }

                        technicians[technician_name][property_name].push({
                            work_type,
                            date,
                            description,
                            work_order,
                            minutes: time_workded,
                        });
                    } else {
                        error_rows.push(index + 2);
                    }
                });

                setTechnicians(technicians);
                setErrRows(error_rows);

                console.log('🚀 ~ handleClick ~ technicians:', technicians);
                console.log('🚀 ~ handleClick ~ technicians:', error_rows);
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleRenderInvoices = async (technician_name) => {
        setInvoices([]);
        const _invoices = [];
        for (const property_name in technicians[technician_name]) {
            const {
                billableTable,
                overtimeTable,
                nightServiceTable,
                invoiceNo,
            } = prepareTemplate(technician_name, property_name);
            let date = '';

            if (billableTable.length) {
                date = billableTable[0].date;
            } else if (overtimeTable.length) {
                date = overtimeTable[0].date;
            } else if (nightServiceTable.length) {
                date = nightServiceTable[0].date;
            }

            date = dayjs(date).format('MMM - YYYY');

            _invoices.push({
                templateId: 'template_' + invoiceNo,
                isShowTemplate: true,
                technician: technician_name,
                property: property_name,
                date,
                invoiceNo,
                billableTable,
                overtimeTable,
                nightServiceTable,
            });
        }

        if (_invoices.length) {
            setInvoices(_invoices);
        }
    };

    const prepareTemplate = (technician_name, property_name) => {
        const billableTable = [];
        const overtimeTable = [];
        const nightServiceTable = [];
        for (const row of technicians[technician_name][property_name]) {
            if (row.work_type === billable_key) {
                billableTable.push(row);
            } else if (row.work_type === overtime_key) {
                overtimeTable.push(row);
            } else if (row.work_type === night_service_key) {
                nightServiceTable.push(row);
            }
        }

        return {
            billableTable,
            overtimeTable,
            nightServiceTable,
            invoiceNo: (Math.random() * 100000).toFixed(0),
        };
    };

    useEffect(() => {
        if (!invoices.length) return;
        for (const invoice of invoices) {
            const filename = `Invoice_${aliasString(
                invoice.technician
            )}_${aliasString(invoice.property)}.pdf`;

            const doc = new jsPDF({
                orientation: 'p',
                format: 'a4',
                unit: 'px',
                hotfixes: ['px_scaling'],
            });

            doc.setFont('times');
            doc.html(document.getElementById(invoice.templateId), {
                async callback(doc) {
                    //   doc.output("dataurlnewwindow");
                    doc.save(filename);
                },
                x: 0,
                y: 0,
                autoPaging: 'text',
                //   html2canvas: {},
                margin: 20,
                width: 750,
                windowWidth: 830,
            });
        }
    }, [invoices]);

    return (
        <div className="p-2 bg-white text-black">
            <div className="uppercase text-center p-3 text-3xl font-semibold">
                HAMILTON Company Inc
            </div>
            <input type="file" ref={fileRef} className="" />
            <Button
                text="Parse File Raw"
                onClick={handleParseFileRaw}
                variant="gradient"
                className="mb-10 ml-5"
            />
            <div>
                {!!errRows.length && (
                    <div>
                        <span className="text-red-500">Error row excel: </span>
                        {errRows.join(', ')}
                        <span></span>
                    </div>
                )}
            </div>
            <div className="my-10">
                {Object.keys(technicians).map((technician, index) => (
                    <div
                        className="mt-3 border border-black p-2"
                        key={technician}
                    >
                        <div className="text-yellow-500 flex items-center">
                            <span>
                                {index + 1}. {technician}
                            </span>
                            <SaveIcon
                                className="w-4 h-4 cursor-pointer ml-1"
                                onClick={() => handleRenderInvoices(technician)}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {Object.keys(technicians[technician]).map(
                                (property) => (
                                    <div key={`${technician}__${property}`}>
                                        <div className="text-black flex items-center">
                                            <span>{property}</span>
                                        </div>
                                        <ul className="text-sm text-gray-500 list-disc">
                                            {Object.keys(
                                                technicians[technician][
                                                    property
                                                ]
                                            ).map((row) => (
                                                <li className="truncate">
                                                    {
                                                        technicians[technician][
                                                            property
                                                        ][row].date
                                                    }
                                                    :{' '}
                                                    {
                                                        technicians[technician][
                                                            property
                                                        ][row].description
                                                    }
                                                    :
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center my-6 text-xl border-y">
                Template Invoice
            </div>
            <div id="templates">
                {invoices.map((template) => (
                    <TemplateInvoice {...template} key={template.invoiceNo} />
                ))}
            </div>
        </div>
    );
}
