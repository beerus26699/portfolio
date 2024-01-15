"use client";

import Button from "@/components/atoms/Buttons";
import SaveIcon from "@/components/atoms/Icons/SaveIcon";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { useRef, useState } from "react";
import { read, utils, readFile } from "xlsx";

// dimenssion of A4 in mm
const A4_width = 210;
const A4_height = 297;
const base_font = 10;
const padding = 10;

const default_headers = [
  "Work Order Technician Assigned", // 0 // A
  "Property Name", // 1 //B
  "Unit Key",
  "Unit Number",
  "Service Request Create Date", // 4 // E
  "Work Log Technician",
  "Work Order WorkGroup Assigned", // 6 // G
  "Service Request Number",
  "Work Order Number", // 8 // I
  "Work Order Comments", // 9 // J
  "Work Order Status Code",
  "Time Worked", // 11 // L
  "(Time Worked / 60)", // 12 // M
  "Dollar Calcif",
  "All Serv Type $",
  "Total((Time Worked / 60))",
  "Work Order Technician Assigned",
  "Total((Time Worked / 60))",
  "Total((Time Worked / 60))",
];

const billable_key = "THCMAINT-Billable";
const overtime_key = "THCMAINT- Overtime";
const night_service_key = "THCMAINT-Night Service";

const time_prices = {
  [billable_key]: 72,
  [overtime_key]: 100,
  [night_service_key]: 90,
};

const aliasString = (str) => {
  return str
    .toLowerCase()
    .replace(/(\-|\.| ){2,}/, "_")
    .replace(" ", "_");
};

const containsAllUppercase = (str) => {
  return /^[A-Z]+$/.test(str);
};

export default function Invoice() {
  const fileRef = useRef(null);
  const [technicians, setTechnicians] = useState({});
  const [invoiceNo, setInvoiceNo] = useState("");
  const [technician, setTechnician] = useState("");
  const [property, setProperty] = useState("");
  const [billableTable, setBillableTable] = useState([]);
  const [overtimeTable, setOvertimeTable] = useState([]);
  const [nightServiceTable, setNightServiceTable] = useState([]);

  const totalBillable =
    (billableTable.reduce((total, row) => total + row.minutes, 0) / 60) *
    time_prices[billable_key];
  const totalOvertime =
    (overtimeTable.reduce((total, row) => total + row.minutes, 0) / 60) *
    time_prices[overtime_key];
  const totalNightService =
    (nightServiceTable.reduce((total, row) => total + row.minutes, 0) / 60) *
    time_prices[night_service_key];

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
        type: "binary",
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
            [billable_key, overtime_key, night_service_key].includes(row[6])
          ) {
            const work_type = row[6];
            const time_workded = row[11];
            const date = dayjs(row[4]).format("MM/DD/YYYY");
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

        console.log("🚀 ~ handleClick ~ technicians:", technicians);
        console.log("🚀 ~ handleClick ~ technicians:", error_rows);
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleExportPdf = (technician_name, property_name) => {
    setTechnician(technician_name);
    setProperty(property_name);
    setInvoiceNo((Math.random() * 100000).toFixed(0));

    let _billableTable = [];
    let _overtimeTable = [];
    let _nightServiceTable = [];
    for (const row of technicians[technician_name][property_name]) {
      if (row.work_type === billable_key) {
        _billableTable.push(row);
      } else if (row.work_type === overtime_key) {
        _overtimeTable.push(row);
      } else if (row.work_type === night_service_key) {
        _nightServiceTable.push(row);
      }
    }

    setBillableTable(_billableTable);
    setOvertimeTable(_overtimeTable);
    setNightServiceTable(_nightServiceTable);

    const filename = `Invoice_${technician_name.replace(
      " ",
      "-"
    )}_${property_name.replace(" ", "-")}.pdf`;
    const doc = new jsPDF({
      orientation: "p",
      format: "a4",
      unit: "px",
      hotfixes: ["px_scaling"],
    });

    doc.setFont("times");

    doc.html(document.getElementById("template"), {
      callback(doc) {
        doc.output("dataurlnewwindow");
        // doc.save(filename);
      },
      x: 0,
      y: 0,
      autoPaging: "text",
      //   html2canvas: {},
      margin: 20,
      width: 750,
      windowWidth: 830,
    });
  };

  return (
    <div className="p-2 bg-white text-black">
      <div className="uppercase text-center p-3 text-3xl font-semibold">
        HAMILTON Company Inc
      </div>
      <input type="file" ref={fileRef} className="" />
      <Button
        text="Export Invoice"
        onClick={handleParseFileRaw}
        variant="gradient"
        className="mb-10 ml-5"
      />

      <div className="my-10">
        {Object.keys(technicians).map((technician, index) => (
          <div className="mt-3 border border-black p-2" key={technician}>
            <div className="text-yellow-500 flex items-center">
              <span>
                {index + 1}. {technician}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {Object.keys(technicians[technician]).map((property) => (
                <div key={`${technician}__${property}`}>
                  <div className="text-black flex items-center">
                    <span>{property}</span>
                    <SaveIcon
                      className="w-4 h-4 cursor-pointer ml-1"
                      onClick={() => handleExportPdf(technician, property)}
                    />
                  </div>
                  <ul className="text-sm text-gray-500 list-disc">
                    {Object.keys(technicians[technician][property]).map(
                      (row) => (
                        <li className="truncate">
                          {technicians[technician][property][row].date}:{" "}
                          {technicians[technician][property][row].description}:
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-6 text-xl border-y">Template Invoice</div>

      <div id="template" className="text-black">
        <div className="text-center">
          <div className="text-2xl flex justify-center text-white bg-[#3289a8] font-bold">
            <div>HAMILTON</div>
            <span className="ml-3">COMPANY</span>
            <span className="ml-3">INC</span>
          </div>
          <div>HAMILTON COMPANY INC</div>
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
            <div className="border border-b-0 text-center">
              {dayjs().format("MMM - DD")}
            </div>
            <div className="col-span-2 pr-1">Invoice No</div>
            <div className="border text-center">{invoiceNo}</div>
          </div>
        </div>

        {/* THCMAINT-Billable Table  */}
        <div className="mt-9">
          <div className="flex mb-1">
            <div className="w-1/2 font-bold text-lg">THCMAINT-Billable</div>
            <div className="w-1/2 text-right italic">Pay Rate: $72.00</div>
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
                <tr key={`billable_${index}`} className="text-center ">
                  <td className="border">{row.date}</td>
                  <td className="text-left border pl-2">{row.description}</td>
                  <td className="border">{row.work_order}</td>
                  <td className="border">{(row.minutes / 60).toFixed(2)}</td>
                  <td className="border">
                    $
                    {Math.round(
                      (row.minutes / 60) * time_prices[billable_key]
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
            <div className="w-1/2 text-right italic">Pay Rate: $100.00</div>
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
                <tr key={`overtime_${index}`} className="text-center ">
                  <td className="border">{row.date}</td>
                  <td className="text-left border pl-2">{row.description}</td>
                  <td className="border">{row.work_order}</td>
                  <td className="border">{(row.minutes / 60).toFixed(2)}</td>
                  <td className="border">
                    $
                    {Math.round(
                      (row.minutes / 60) * time_prices[overtime_key]
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
            <div className="w-1/2 font-bold">THCMAINT-Night Service</div>
            <div className="w-1/2 text-right italic">Pay Rate: $90.00</div>
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
                <tr key={`night_service_${index}`} className="text-center ">
                  <td className="border">{row.date}</td>
                  <td className="text-left border pl-2">{row.description}</td>
                  <td className="border">{row.work_order}</td>
                  <td className="border">{(row.minutes / 60).toFixed(2)}</td>
                  <td className="border">
                    $
                    {Math.round(
                      (row.minutes / 60) * time_prices[night_service_key]
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
                  <td className="text-left border font-bold">Total</td>
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
            <div className="text-center">Property Manager's Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}
