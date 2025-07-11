// ================================
// UPDATED APP.JS - Main Application with All Routes
// ================================

// ================================
// SERVICES/API.JS - API Integration
// ================================
import axios from "axios";
import useAuth from "../hooks/useAuth";

const API_BASE_URL = "http://192.168.100.46:3000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const { auth } = useAuth();
//     const token = auth?.accessToken;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );


// Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response?.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (profileData) => api.put("/auth/profile", profileData),
};

// Calls API
export const callsAPI = {
  createCall: (callData) => api.post("/calls", callData),
  getCallHistory: (params) => api.get("/record-calls/history", { params }),
  getActiveCalls: () => api.get("/calls/active"),
  updateCall: (callId, updates) => api.put(`/calls/${callId}`, updates),
  endCall: (callId) => api.delete(`/calls/${callId}`),
};

// Agents API
export const agentsAPI = {
  getAgents: (params) => api.get("/agents", { params }),
  getAgentById: (agentId) => api.get(`/agents/${agentId}`),
  updateStatus: (status) => api.put("/agents/status", { status }),
  updateSkills: (skills) => api.put("/agents/skills", { skills }),
  updateAvailability: (availability) =>
    api.put("/agents/availability", availability),
  getPerformance: (agentId, params) =>
    api.get(`/agents/${agentId}/performance`, { params }),
};

// Queues API
export const queuesAPI = {
  getQueues: () => api.get("/queues"),
  createQueue: (queueData) => api.post("/queues", queueData),
  updateQueue: (queueId, updates) => api.put(`/queues/${queueId}`, updates),
  addAgent: (queueId, agentData) =>
    api.post(`/queues/${queueId}/agents`, agentData),
  removeAgent: (queueId, agentId) =>
    api.delete(`/queues/${queueId}/agents/${agentId}`),
  getStats: (queueId, params) =>
    api.get(`/queues/${queueId}/stats`, { params }),
};

// Analytics API
export const analyticsAPI = {
  getDashboard: (params) => api.get("/analytics/dashboard", { params }),
  getCallVolume: (params) => api.get("/analytics/call-volume", { params }),
  getAgentPerformance: (params) =>
    api.get("/analytics/agent-performance", { params }),
  getQueuePerformance: (params) =>
    api.get("/analytics/queue-performance", { params }),
  exportCalls: (params) => api.get("/analytics/export-calls", { params }),
};

// Phone Numbers API
export const phoneNumbersAPI = {
  getPhoneNumbers: (params) => api.get("/phone-numbers", { params }),
  purchaseNumber: (numberData) =>
    api.post("/phone-numbers/purchase", numberData),
  updateNumber: (numberId, updates) =>
    api.put(`/phone-numbers/${numberId}`, updates),
  releaseNumber: (numberId) => api.delete(`/phone-numbers/${numberId}`),
  getStats: (numberId, params) =>
    api.get(`/phone-numbers/${numberId}/stats`, { params }),
};

// Notifications API
export const notificationsAPI = {
  getNotifications: () => api.get("/notifications"),
  markAsRead: (notificationId) =>
    api.put(`/notifications/${notificationId}/read`),
  getSettings: () => api.get("/notifications/settings"),
  updateSettings: (settings) => api.put("/notifications/settings", settings),
};

export default api;
