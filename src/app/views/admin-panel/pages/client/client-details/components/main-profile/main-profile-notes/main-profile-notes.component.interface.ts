export interface ClientAdminNotes {
    id: string;  
    time: string;   
    clientName: string;
    date: string;
    title: string;  
    description: string;
    info: {
      diagnosis?: string;
      email?: string;
      address?: string;
      mobile_no?: string;
    };
    color: string;
    type: string;
  }

  const clientAdminNotesList: ClientAdminNotes[] = [
    {
      id: "1",
      time: "05:22",
      clientName: "George Lucas",
      date: "01-07-2022",
      title: 'SUPPORT-Coordination of support',
      description: 'The Coordination of support Support coordination – coordination of supports: This support will assist you to build the skills you need to understand, implement and use your plan. A support coordinator will work with you to ensure a mix of supports are used to increase your capacity to maintain relationships, manage service delivery tasks, live more independently and be included in your community.',
      info: {},
      color: "#006EE5",
      type: 'important'
    },
    {
      id: "2",
      time: "02:00",
      clientName: "Luke Combs",
      date: "01-07-2022",
      title: 'Fresh or Frozen (No Sugar Added) Fruits',
      description: 'The Coordination of support Support coordination – coordination of supports: This support will assist you to build the skills you need to understand, implement and use your plan. A support coordinator will work with you to ensure a mix of supports are used to increase your capacity to maintain relationships, manage service delivery tasks, live more independently and be included in your community.',
      info: {
        diagnosis: '342424121',
        email: 'Usertest@gmail.com',
        address: 'San Antonio MI 47096',
        mobile_no: '(+63) 934 3432',
      },
      color: "#1FB2A1",
      type: 'important'
    },
    {
      id: "3",
      time: "05:22",
      clientName: "George Lucas",
      date: "01-07-2022",
      title: 'SUPPORT-Coordination of support',
      description: 'The Coordination of support Support coordination – coordination of supports: This support will assist you to build the skills you need to understand, implement and use your plan. A support coordinator will work with you to ensure a mix of supports are used to increase your capacity to maintain relationships, manage service delivery tasks, live more independently and be included in your community.',
      info: {},
      color: "#FEC040",
      type: 'archived'
    },
  ];
  
  export {
    clientAdminNotesList
  }