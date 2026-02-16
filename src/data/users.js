export const users = [
  {
    username: 'owner',
    password: 'password123',
    role: 'owner',
    name: 'Sarah Owner',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
  },
  {
    username: 'analyst',
    password: 'password123',
    role: 'analyst',
    name: 'Alice Analyst',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
  },
  {
    username: 'tenant',
    password: 'password123',
    role: 'tenant',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
  }
];

export const pageAccess = {
  owner: ['/owner', '/owner/properties', '/owner/settings', '/owner/items'],
  analyst: ['/analyst', '/analyst/inspection'],
  tenant: ['/tenant', '/tenant/reports']
};
