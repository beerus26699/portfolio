import {
    billable_key,
    night_service_key,
    overtime_key,
    time_prices,
} from '@/pages/hamilton/invoices';
import clsx from 'clsx';

const TemplateInvoice = ({
    templateId,
    isShowTemplate,
    technician,
    property,
    date,
    invoiceNo,
    billableTable,
    overtimeTable,
    nightServiceTable,
}) => {
    const totalBillable =
        (billableTable.reduce((total, row) => total + row.minutes, 0) / 60) *
        time_prices[billable_key];
    const totalOvertime =
        (overtimeTable.reduce((total, row) => total + row.minutes, 0) / 60) *
        time_prices[overtime_key];
    const totalNightService =
        (nightServiceTable.reduce((total, row) => total + row.minutes, 0) /
            60) *
        time_prices[night_service_key];

    //   const renderDescription = (description) => {
    //     return description;
    //     const split_des = description.split(/(\s+)/).filter( e => e.trim().length > 0);
    //     return (
    //       <div className="flex">
    //         {split_des.map((word) => <span className="mr-3">{word}</span>)}
    //         {/* <div>HAMILTON</div>
    //         <span className="ml-3">COMPANY</span>
    //         <span className="ml-3">INC</span> */}
    //       </div>
    //     );
    //   };

    return (
        <div
            id={templateId}
            className={clsx('text-black', { hidden: !isShowTemplate })}
        >
            <div className="text-center">
                <div className="text-2xl flex justify-center text-white bg-[#3289a8] font-bold">
                    <div>HAMILTON</div>
                    <span className="ml-3">COMPANY</span>
                    <span className="ml-3">INC</span>
                </div>
                <div className="text-sm">
                    <div>39 Brighton Ave, Boston, MA 02134</div>
                    <div>Mobile - +1 (617) 783-0039</div>
                    <div>Website - thehamiltoncompany.com</div>
                </div>
                <div className="text-2xl mt-5 text-white bg-[#0b0c5c] font-bold">
                    INVOICE
                </div>
            </div>
            <div className="flex justify-center w-1/2 uppercase text-center mt-5 text-white bg-black font-bold">
                <span>BILL</span>
                <span className="ml-3">TO</span>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <div className="flex">
                        <span className="w-1/4">Name:</span>
                        <span className="font-semibold">{technician}</span>
                    </div>
                    <div className="flex">
                        <span className="w-1/4">Property:</span>
                        <span className="font-semibold">{property}</span>
                    </div>
                </div>
                <div className="w-1/2 text-end grid grid-cols-3">
                    <div className="col-span-2 pr-1">Date</div>
                    <div className="border border-b-0 text-center">{date}</div>
                    <div className="col-span-2 pr-1">Invoice No</div>
                    <div className="border text-center">{invoiceNo}</div>
                </div>
            </div>

            {/* THCMAINT-Billable Table  */}
            <div className="mt-9">
                <div className="flex mb-1">
                    <div className="w-1/2 font-bold text-lg">
                        THCMAINT-Billable
                    </div>
                    <div className="w-1/2 text-right italic">
                        Pay Rate: $72.00
                    </div>
                </div>
                <table className="w-full border-collapse border ">
                    <thead>
                        <tr>
                            <th className="border w-1/6">Date</th>
                            <th className="border w-1/2">Description</th>
                            <th className="border ">Work Orders</th>
                            <th className="border ">Hours</th>
                            <th className="border ">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {billableTable.map((row, index) => (
                            <tr
                                key={`billable_${index}`}
                                className="text-center "
                            >
                                <td className="border">{row.date}</td>
                                <td
                                    className="text-left border pl-2"
                                    style={{ letterSpacing: 0.7 }}
                                >
                                    {row.description}
                                </td>
                                <td className="border">{row.work_order}</td>
                                <td className="border">
                                    {(row.minutes / 60).toFixed(2)}
                                </td>
                                <td className="border">
                                    $
                                    {Math.round(
                                        (row.minutes / 60) *
                                            time_prices[billable_key]
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* THCMAINT-Overtime Table  */}
            <div className="mt-9">
                <div className="flex mb-1">
                    <div className="w-1/2 font-bold">THCMAINT-Overtime</div>
                    <div className="w-1/2 text-right italic">
                        Pay Rate: $100.00
                    </div>
                </div>
                <table className="w-full border-collapse border ">
                    <thead>
                        <tr>
                            <th className="border w-1/6">Date</th>
                            <th className="border w-1/2">Description</th>
                            <th className="border ">Work Orders</th>
                            <th className="border ">Hours</th>
                            <th className="border ">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {overtimeTable.map((row, index) => (
                            <tr
                                key={`overtime_${index}`}
                                className="text-center "
                            >
                                <td className="border">{row.date}</td>
                                <td
                                    className="text-left border pl-2"
                                    style={{ letterSpacing: 0.7 }}
                                >
                                    {row.description}
                                </td>
                                <td className="border">{row.work_order}</td>
                                <td className="border">
                                    {(row.minutes / 60).toFixed(2)}
                                </td>
                                <td className="border">
                                    $
                                    {Math.round(
                                        (row.minutes / 60) *
                                            time_prices[overtime_key]
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* THCMAINT-Night Service Table  */}
            <div className="mt-9">
                <div className="flex mb-1">
                    <div className="w-1/2 font-bold">
                        THCMAINT-Night Service
                    </div>
                    <div className="w-1/2 text-right italic">
                        Pay Rate: $90.00
                    </div>
                </div>
                <table className="w-full border-collapse border ">
                    <thead>
                        <tr>
                            <th className="border w-1/6">Date</th>
                            <th className="border w-1/2">Description</th>
                            <th className="border ">Work Orders</th>
                            <th className="border ">Hours</th>
                            <th className="border ">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nightServiceTable.map((row, index) => (
                            <tr
                                key={`night_service_${index}`}
                                className="text-center "
                            >
                                <td className="border">{row.date}</td>
                                <td
                                    className="text-left border pl-2"
                                    style={{ letterSpacing: 0.7 }}
                                >
                                    {row.description}
                                </td>
                                <td className="border">{row.work_order}</td>
                                <td className="border">
                                    {(row.minutes / 60).toFixed(2)}
                                </td>
                                <td className="border">
                                    $
                                    {Math.round(
                                        (row.minutes / 60) *
                                            time_prices[night_service_key]
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Total Table  */}
            <div className="mt-9">
                <div className="flex justify-end">
                    <table className="border-collapse border w-1/2">
                        <tbody>
                            <tr className="text-center">
                                <td className="text-left border font-semibold">
                                    THCMAINT-Billable
                                </td>
                                <td className="text-right border pr-2">
                                    ${totalBillable.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="text-center">
                                <td className="text-left border font-semibold">
                                    THCMAINT-Overtime
                                </td>
                                <td className="text-right border pr-2">
                                    ${totalOvertime.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="text-center">
                                <td className="text-left border font-semibold">
                                    THCMAINT-Night Service
                                </td>
                                <td className="text-right border pr-2">
                                    ${totalNightService.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="text-center">
                                <td className="text-left border font-bold">
                                    Total
                                </td>
                                <td className="text-right border pr-2">
                                    $
                                    {(
                                        totalBillable +
                                        totalOvertime +
                                        totalNightService
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-16">
                <div className="w-1/2 border-t">
                    <div className="text-center">
                        Property Manager's Signature
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateInvoice;
