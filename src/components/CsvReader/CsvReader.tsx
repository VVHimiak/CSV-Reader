import React, { useState, useEffect } from 'react';
import './CsvReader.scss';

// enum Items {
//   'Full name',
//   'Phone',
//   'Email',
//   'Age',
//   'Experience',
//   'Yearly income',
//   'Has children',
//   'License states',
//   'Expiration date',
//   'License number',
// }

// interface IFilters {
//   id: keyof Items; // <-- "id" | "filter1" | "filter2"
// }

export const CsvReader: React.FC = () => {
  const [CsvFile, setCsvFile] = useState<Blob | null>(null);
  const [CsvArray, setCsvArray] = useState<{}[] | null>(null);

  const processCsv = (str: string, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map((row: string) => {
      const values = row.split(delim);
      const eachObj = headers.reduce((obj: {[k: string]: string}, header, i) => {
        const gg = obj;

        gg[header] = values[i];

        return gg;
      }, {});

      return eachObj;
    });

    setCsvArray(newArray);

    // eslint-disable-next-line no-console
    console.log(newArray);
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(CsvFile);

    const file = CsvFile;
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target !== null) {
        const text = e.target.result;

        // eslint-disable-next-line no-console
        console.log(text);
        if (typeof (text) === 'string') {
          processCsv(text);
        }
      }
    };

    if (file !== null) {
      reader.readAsText(file);
      // eslint-disable-next-line no-console
      console.log(CsvArray);
    }
  }, [CsvFile]);

  return (
    <form>
      <input
        type="file"
        accept=".csv"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.files) {
            setCsvFile(event.target.files[0]);
          }
        }}
      />
    </form>
  );
};
