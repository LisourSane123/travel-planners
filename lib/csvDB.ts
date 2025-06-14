import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Paths to CSV files
const usersFilePath = path.join(process.cwd(), 'data', 'users.csv');
const messagesFilePath = path.join(process.cwd(), 'data', 'messages.csv');

// User type definition
export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  createdAt: string;
};

// Message type definition
export type Message = {
  id: string;
  email: string;
  message: string;
  timestamp: string;
};

// Ensure the data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Ensure CSV files exist with headers
function ensureFilesExist() {
  ensureDataDirectory();
  
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, 'id,email,password,name,createdAt\n');
  }
  
  if (!fs.existsSync(messagesFilePath)) {
    fs.writeFileSync(messagesFilePath, 'id,email,message,timestamp\n');
  }
}

// Parse CSV to array of objects
function parseCSV<T>(csvContent: string): T[] {
  const lines = csvContent.trim().split('\n');
  if (lines.length <= 1) return [];
  
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header as keyof T] = values[index] as any;
      return obj;
    }, {} as T);
  });
}

// Convert array of objects to CSV string
function objectsToCSV<T>(objects: T[], headers: string[]): string {
  const headerLine = headers.join(',');
  const rows = objects.map(obj => 
    headers.map(header => (obj as any)[header]).join(',')
  );
  return [headerLine, ...rows].join('\n');
}

// User management functions
export function getAllUsers(): User[] {
  ensureFilesExist();
  try {
    const content = fs.readFileSync(usersFilePath, 'utf-8');
    return parseCSV<User>(content);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

export function findUserByEmail(email: string): User | undefined {
  const users = getAllUsers();
  return users.find(user => user.email === email);
}

export function createUser(email: string, password: string, name?: string): User | null {
  try {
    const users = getAllUsers();
    
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return null;
    }
    
    const newUser: User = {
      id: uuidv4(),
      email,
      password,
      name: name || '',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    fs.writeFileSync(
      usersFilePath, 
      objectsToCSV(users, ['id', 'email', 'password', 'name', 'createdAt'])
    );
    
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

// Message management functions
export function getAllMessages(): Message[] {
  ensureFilesExist();
  try {
    const content = fs.readFileSync(messagesFilePath, 'utf-8');
    return parseCSV<Message>(content);
  } catch (error) {
    console.error('Error reading messages file:', error);
    return [];
  }
}

export function createMessage(email: string, message: string): Message | null {
  try {
    const messages = getAllMessages();
    
    const newMessage: Message = {
      id: uuidv4(),
      email,
      message,
      timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    fs.writeFileSync(
      messagesFilePath, 
      objectsToCSV(messages, ['id', 'email', 'message', 'timestamp'])
    );
    
    return newMessage;
  } catch (error) {
    console.error('Error creating message:', error);
    return null;
  }
}
