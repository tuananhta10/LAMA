const displayedColumnsClients: any[] = [
  { title: 'Name', col_name: 'name' },
  { title: 'Email', col_name: 'email_address' },
  { title: 'Mobile Phone', col_name: 'mobile_phone_no' },
  { title: 'Home Phone', col_name: 'home_phone_no' },
  { title: 'Suburb', col_name: 'suburb' },
  { title: 'Date Added', col_name: 'date_added' },
  { title: 'Disability Type', col_name: 'disability_type' },
];

const selectedColumnsClients: string[] = 
[
    'name',
    'email_address',
    'mobile_phone_no',
    'home_phone_no',
    'suburb',
    'date_added',
    'disability_type'
];

const selectedColumnsMobileClients: string[] = [
    'name',
    'email_address',
    'mobile_phone_no',
    'home_phone_no',
    'suburb',
    'date_added',
    'disability_type'
];

const tableController: any = [
    {
      name:'Edit Columns',
      class: 'edit-column',
      icon: '/assets/images/icons/edit-column.png',
      action_event: (action_event) => action_event
    },

    {
      name:'Filter',
      class: 'filter',
      icon: '/assets/images/icons/filter.png',
      action_event: (action_event) => action_event
    },

    {
      name:'Import',
      class: 'import',
      icon: '/assets/images/icons/import.png',
      action_event: (action_event) => action_event
    },

    {
      name:'Delete',
      class: 'delete',
      icon: '/assets/images/icons/delete.png',
      action_event: (action_event) => action_event
    },
];

export {   
    displayedColumnsClients,
    selectedColumnsClients,
    selectedColumnsMobileClients,
    tableController
  };