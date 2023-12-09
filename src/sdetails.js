// const student_records = [
//     {
//         rollNo: 100220117,
//         name: "Devang Shaurya Pratap Singh",
//         status: false,
//     },
//     {
//         rollNo: 100220118,
//         name: "John Doe",
//         status: false,
//     },
//     {
//         rollNo: 100220119,
//         name: "Jane Smith",
//         status: false,
//     },
//     {
//         rollNo: 100220120,
//         name: "Alice Johnson",
//         status: false,
//     },
//     {
//         rollNo: 100220121,
//         name: "Emily Brown",
//         status: false,
//     },
//     {
//         rollNo: 100220122,
//         name: "Oliver Wilson",
//         status: false,
//     },
//     {
//         rollNo: 100220123,
//         name: "Sophia Taylor",
//         status: false,
//     },
//     {
//         rollNo: 100220124,
//         name: "Liam Anderson",
//         status: false,
//     },
//     {
//         rollNo: 100220125,
//         name: "Mia Martinez",
//         status: false,
//     },
//     {
//         rollNo: 100220126,
//         name: "Ava Harris",
//         status: false,
//     },
//     {
//         rollNo: 100220127,
//         name: "Aarav Patel",
//         status: false,
//     },
//     {
//         rollNo: 100220128,
//         name: "Ishaan Sharma",
//         status: false,
//     },
//     {
//         rollNo: 100220129,
//         name: "Aanya Gupta",
//         status: false,
//     },
//     {
//         rollNo: 100220130,
//         name: "Advait Singhania",
//         status: false,
//     },
//     {
//         rollNo: 100220131,
//         name: "Ananya Verma",
//         status: false,
//     },
//     {
//         rollNo: 100220132,
//         name: "Arjun Kapoor",
//         status: false,
//     },
//     {
//         rollNo: 100220133,
//         name: "Arya Reddy",
//         status: false,
//     },
//     {
//         rollNo: 100220134,
//         name: "Aryan Desai",
//         status: false,
//     },
//     {
//         rollNo: 100220135,
//         name: "Avani Joshi",
//         status: false,
//     },
//     {
//         rollNo: 100220136,
//         name: "Ayush Sharma",
//         status: false,
//     },
//     {
//         rollNo: 100220137,
//         name: "Chahat Gupta",
//         status: false,
//     },
//     {
//         rollNo: 100220138,
//         name: "Dhruv Singhania",
//         status: false,
//     },
//     {
//         rollNo: 100220139,
//         name: "Diya Verma",
//         status: false,
//     },
//     {
//         rollNo: 100220140,
//         name: "Eesha Kapoor",
//         status: false,
//     },
//     {
//         rollNo: 100220141,
//         name: "Esha Reddy",
//         status: false,
//     },

// ];
const csvData = `rollNo,name
100220101,ABHINAW SHUKLA
100220102,ABHISHEK GUPTA
100220103,ABHISHEK MAURYA
100220104,ABHISHEK VAISHYA
100220106,AKASH KUMAR
100220107,AMAN KUMAR
100220108,AMAN PRATAP SINGH
100220109,ANKIT PAL
100220110,ANMOL CHAURASIYA
100220112,ANUBHAV SINGH
100220113,ANUPAM PANDEY
100220114,ARCHANA
100220115,AYUSH KUMAR
100220116,CHIRAG TOMAR
100220117,DEVANG SHAURYA PRATAP SINGH
100220118,DHEERAJ YADAV
100220119,DHRUV PAL
100220120,HARPRIT SINGH
100220121,HARSH YADAV
100220122,HARSHIT SRIVASTAVA
100220123,JITENDRA CHAURASIYA
100220124,KANISHKA
100220125,KASHISH CHOUDHARY
100220126,KHUSHBOO
100220127,KHUSHI PAL
100220128,KUSHAGRA MUDGAL
100220129,MANISH KUSHWAHA
100220130,MANVENDRA PRATAP RAJBHAR
100220131,MOHD YUSUF
100220132,MOHIT KUMAR
100220133,MRITUNJAY TIWARI
100220135,NITESH TIWARI
100220136,OM PRAKASH
100220138,PIYUSH BHARDWAJ
100220139,PRIYANSHI KESHARI
100220140,PULKIT MOURYA
100220141,RAHUL YADAV
100220142,RAJU PATEL
100220143,RAMJI SINGARAUR
100220144,RISHABH BHARDWAJ
100220145,RISHABH KUMAR TIWARI
100220146,RISHI KUMAR
100220147,ROLI YADAV
100220148,SAKSHI
100220149,SALMAN KHAN
100220150,SAMARTH GUPTA
100220151,SARTHAK SINGH
100220152,SHANKEY MATHUR
100220153,SHIVAM TIWARI
100220154,SHIVANK
100220155,SIDDHANT ANAND RAI
100220156,STUTI YADAV
100220157,SUDHEER PATHAK
100220158,TUSHAR CHAUDHARY
100220159,UJJWAL TYAGI
100220160,VEDKANTHA NEOGI
100220161,VINAY KUMAR
100220162,VISHWASH MISHRA
100220164,YASH SHUKLA
0LATERAL01,ADITYA KUMAR
0LATERAL02,KHUSHI GUPTA
0LATERAL03,KM NISHA
0LATERAL04,MOHD ARIF ANSARI
0LATERAL05,NITISH KUMAR SINGH
0LATERAL06,RAHUL KUMAR BHARATI
0LATERAL07,SATYAM MISHRA
0LATERAL08,VINEET KUMAR`

const lines = csvData.split('\n');
const keys = lines[0].split(',');

const dataDict = lines.slice(1).map(line => {
    const values = line.split(',');
    return keys.reduce((obj, key, i) => ({ ...obj, [key]: values[i] }), {});
});

const student_records = dataDict
console.log(dataDict);
export default student_records