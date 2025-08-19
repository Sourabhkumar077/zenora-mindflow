

import axios from 'axios';

const apiClient = axios.create({

  baseURL: 'http://127.0.0.1:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDashboardData = () => {
  return apiClient.get('/dashboard-data');
};

export const getJournalEntries = (userId: number) => {
  return apiClient.get(`/journal/${userId}`);
};

export const getMoodLogs = (userId: number) => {
  return apiClient.get(`/moodlog/${userId}`);
};


export const signupUser = (data: object) => {
  return apiClient.post('/auth/signup', data);
}

// NEW: Login User
export const loginUser = (data: object) => {
  return apiClient.post('/auth/login', data);
}


export const addMoodLog = (data: object) => {
  return apiClient.post('/moodlog', data);
};

export default apiClient;