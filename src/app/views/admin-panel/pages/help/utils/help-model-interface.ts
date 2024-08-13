export interface HelpFaqs{
  id: number;
  icon: string;  
  question: string;  
  answer: string;  
  route?: string;
}


const HelpFaqsMenu: HelpFaqs[] = [
  {
    "id": 1,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "What is LAMA software and how does it work?",
    "answer": "LAMA software is an operation system designed specifically for NDIS providers to help them manage their participants, employees, and services. It simplifies processes like pricing, scheduling, invoicing, and compliance, and provides tools for tracking communication and document access."
  },
  {
    "id": 2,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "Is LAMA software easy to use?",
    "answer": "LAMA software has been designed with the user experience in mind, with the goal of making it intuitive and straightforward to use."
  },
  {
    "id": 3,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "Can LAMA software help me run my business more efficiently?",
    "answer": "Yes, LAMA software is intended to help NDIS providers streamline their operations and save time and effort. It can assist with tasks like pricing and invoicing, and provide insight into your business through data collection."
  },
  {
    "id": 4,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "Is LAMA software affordable?",
    "answer": "LAMA software is priced to be accessible to businesses of all sizes, with the goal of helping you grow your business without breaking the bank."
  },
  {
    "id": 5,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "Does LAMA software offer support for its users?",
    "answer": "Yes, LAMA software provides support to its users to ensure that they are able to make the most of the system and get any questions or issues resolved quickly."
  },
  {
    "id": 6,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "How does LAMA software handle data security and privacy?",
    "answer": "LAMA software is designed with data security and privacy in mind, and follows all relevant regulations and guidelines to protect sensitive information."
  },
  {
    "id": 7,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "Can LAMA software be customized to fit the needs of my business?",
    "answer": "LAMA software offers a range of features and settings that can be adjusted to fit the specific needs and preferences of your business."
  },
  {
    "id": 8,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "Is LAMA software compatible with other systems or software that my business uses?",
    "answer": "LAMA software is designed to be flexible and compatible with a variety of other systems and software, making it easier to integrate into your existing workflow."
  },
  {
    "id": 9,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "How is LAMA software updated and maintained?",
    "answer": "LAMA software is regularly updated to add new features, fix any issues, and ensure that it remains effective and efficient. Maintenance is handled by the LAMA Care team to ensure smooth operation."
  },
  {
    "id": 10,
    "icon": "/assets/images/icons/help-warning.png",
    "question": "Is LAMA software only available to NDIS providers in Australia?",
    "answer": "LAMA software is currently only available to NDIS providers in Australia, but the team is exploring options for expanding to other regions in the future."
  }
]

export {
  HelpFaqsMenu
}