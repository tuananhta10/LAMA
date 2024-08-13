export interface Invoice {
    id: string;  
    number  : string;   
    ref: string;  
    to: string;  
    date: string;
    due_date: string;
    paid: string;
    due: string;
    status: string;
    sent: string;
  }
  
  export interface TableHeader {
    col_name: string;
    title: string;
  }
  
  const displayedColumns: TableHeader[] = [
    { col_name: 'id', title: 'ID' },
    { col_name: 'number', title: 'Number' },
    { col_name: 'ref', title: 'Ref' },
    { col_name: 'to', title: 'To' },
    { col_name: 'date', title: 'Date' },
    { col_name: 'due_date', title: 'Due Date' },
    { col_name: 'paid', title: 'Paid' },
    { col_name: 'due', title: 'Due' },
    { col_name: 'status', title: 'Status' },
    { col_name: 'sent', title: 'Sent' },
    { col_name: 'action', title: '' },
  ];
  
  const selectedColumns: string[] =  [
    'id',
    'number',
    'to',
    'date',
    'due_date',
    'paid',
    'due',
    'status',
    'sent',
    'action'
  ];
   
  const invoiceList: Invoice[] = [
    {
        id: '123',  
        number  : 'INV-1234',   
        ref: '1234',  
        to: 'Mack Daemon',  
        date: 'Mar 23, 2022',
        due_date: 'Mar 26, 2022',
        paid: '0.00',
        due: '1.00',
        status: 'Awaiting Payment',
        sent: ''
    },
    {
        id: '123',  
        number  : 'INV-1234',   
        ref: '1234',  
        to: 'Mack Daemon',  
        date: 'Mar 23, 2022',
        due_date: 'Mar 26, 2022',
        paid: '0.00',
        due: '1.00',
        status: 'Awaiting Payment',
        sent: ''
    },
    {
        id: '123',  
        number  : 'INV-1234',   
        ref: '1234',  
        to: 'Mack Daemon',  
        date: 'Mar 23, 2022',
        due_date: 'Mar 26, 2022',
        paid: '0.00',
        due: '1.00',
        status: 'Awaiting Payment',
        sent: ''
    },
    {
        id: '123',  
        number  : 'INV-1234',   
        ref: '1234',  
        to: 'Mack Daemon',  
        date: 'Mar 23, 2022',
        due_date: 'Mar 26, 2022',
        paid: '0.00',
        due: '1.00',
        status: 'Awaiting Payment',
        sent: ''
    },
    {
        id: '123',  
        number  : 'INV-1234',   
        ref: '1234',  
        to: 'Mack Daemon',  
        date: 'Mar 23, 2022',
        due_date: 'Mar 26, 2022',
        paid: '0.00',
        due: '1.00',
        status: 'Awaiting Payment',
        sent: ''
    },
  ];
  
  export {
    displayedColumns,
    selectedColumns,
    invoiceList
  }