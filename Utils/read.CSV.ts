import fs from 'fs'; //File System module ของ Node.js ใช้สำหรับอ่าน/เขียนไฟล์
import path from 'path'; //ใช้จัดการเส้นทางไฟล์ ให้ถูกต้องตาม OS
import { parse } from 'csv-parse/sync'; //npm install csv-parse

export function readCSV(filePath: string, hasHeader: true): Record<string, string>[];
export function readCSV(filePath: string, hasHeader: false): string[][];
export function readCSV(
  filePath: string,
  hasHeader: boolean
): Record<string, string>[] | string[][] {
/* การ import modules
__dirname → โฟลเดอร์ปัจจุบันของไฟล์นี้ , '..' → ขยับขึ้นไป 1 โฟลเดอร์
process.cwd() → โฟลเดอร์ปัจจุบันที่ระบุคำสั่ง run ใช้กับ cicd ได้
path.resolve(...) → รวม path ทั้งหมดให้อ่านได้แล้วแต่ OS เช่น C:\project\data\users.csv
*/const absolutePath = path.resolve(process.cwd(),filePath);

/* สร้าง absolute path
fs.readFileSync → อ่านไฟล์แบบ synchronous (รันเสร็จก่อนค่อยไปบรรทัดต่อไป)
'utf-8' → กำหนด encoding ให้ได้ข้อความ (string) แทน Buffer
*/const fileContent = fs.readFileSync(absolutePath,'utf-8');

/* แปลง CSV เป็น object
parse → ฟังก์ชันจาก csv-parse/sync ที่ใช้แปลงข้อมูล CSV เป็น array ของ object
columns: true → ใช้แถวแรกเป็นชื่อ column (header) เช่น "name", "age"
skip_empty_lines: true → ข้ามบรรทัดว่าง
trim: true → ตัดช่องว่างหัว-ท้ายของค่าทุก cell
*/return parse(fileContent,{
    columns:hasHeader,
    skip_empty_lines:true,
    trim:true,
  });  //บอกว่า type Object ที่มี key และ value เป็น string
};
