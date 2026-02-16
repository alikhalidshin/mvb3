import { Home, ClipboardList, FileText, AlertCircle, Settings, CheckCircle, Clock } from 'lucide-react';

export const properties = [
  {
    id: 1,
    address: "123 Maple Avenue, Springfield",
    type: "Single Family",
    tenant: "John Doe",
    status: "Occupied",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    address: "456 Oak Street, Kondapuram",
    type: "Apartment",
    tenant: "Jane Smith",
    status: "Vacant",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    address: "789 Pine Lane, Villageton",
    type: "Townhouse",
    tenant: "Mike Johnson",
    status: "Occupied",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36f89?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  }
];

export const inspections = [
  {
    id: 101,
    propertyId: 1,
    date: "2023-10-15",
    status: "Approved",
    analyst: "Alice Analyst",
    score: 85,
    type: "Move-In",
  },
  {
    id: 102,
    propertyId: 1,
    date: "2024-04-20",
    status: "Scheduled",
    analyst: "Bob Inspector",
    score: null,
    type: "Routine",
  },
  {
    id: 103,
    propertyId: 2,
    date: "2024-02-10",
    status: "In Progress",
    analyst: "Alice Analyst",
    score: null,
    type: "Move-Out",
  }
];

export const checklistCategories = [
  "Walls", "Floors", "Doors", "Windows", "Plumbing", "Electrical", "Appliances", "Other"
];

export const mockUser = {
  name: "Sarah Owner",
  role: "Property Owner",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60"
};
