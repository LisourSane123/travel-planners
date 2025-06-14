import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Trip type definition
export type Trip = {
  id: string;
  user_id: string;
  destination: string;
  date: string;
  endDate?: string;
  status: 'nowa' | 'w trakcie' | 'zakończona';
  created_at: string;
  category?: 'egzotyka' | 'historia' | 'city-break' | 'natura' | 'relaks' | 'sport' | 'kulinarna' | 'inne';
  continent?: 'europa' | 'azja' | 'afryka' | 'ameryka-pn' | 'ameryka-pd' | 'australia' | 'antarktyda';
  adults?: number;
  children?: number;
  comments?: string;
};

// Path to CSV file
const tripsFilePath = path.join(process.cwd(), 'data', 'trips.csv');

// Ensure file exists with headers
function ensureTripFileExists() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  if (!fs.existsSync(tripsFilePath)) {
    fs.writeFileSync(tripsFilePath, 'id,user_id,destination,date,endDate,status,created_at,category,continent,adults,children,comments\n');
  }
}

// Parse CSV to array of trips
function parseTripsCSV(csvContent: string): Trip[] {
  const lines = csvContent.trim().split('\n');
  if (lines.length <= 1) return [];
  
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, index) => {
      obj[header as keyof Trip] = values[index] as any;
      return obj;
    }, {} as Trip);
  });
}

// Convert trips to CSV string
function tripsToCSV(trips: Trip[]): string {
  const headers = ['id', 'user_id', 'destination', 'date', 'endDate', 'status', 'created_at', 'category', 'continent', 'adults', 'children', 'comments'];
  const headerLine = headers.join(',');
  const rows = trips.map(trip => 
    headers.map(header => {
      // Handle empty or undefined values
      const value = trip[header as keyof Trip];
      return value !== undefined ? value : '';
    }).join(',')
  );
  return [headerLine, ...rows].join('\n');
}

// Get all trips
export function getAllTrips(): Trip[] {
  ensureTripFileExists();
  try {
    const content = fs.readFileSync(tripsFilePath, 'utf-8');
    return parseTripsCSV(content);
  } catch (error) {
    console.error('Error reading trips file:', error);
    return [];
  }
}

// Get trips for a specific user
export function getUserTrips(userId: string): Trip[] {
  const trips = getAllTrips();
  return trips.filter(trip => trip.user_id === userId);
}

// Create a new trip
export function createTrip(
  userId: string, 
  destination: string, 
  date: string,
  endDate?: string,
  category?: string, 
  continent?: string,
  adults?: number, 
  children?: number, 
  comments?: string
): Trip | null {
  try {
    const trips = getAllTrips();
    
    const newTrip: Trip = {
      id: uuidv4(),
      user_id: userId,
      destination,
      date,
      endDate,
      status: 'nowa',
      created_at: new Date().toISOString(),
      category: category as Trip['category'],
      continent: continent as Trip['continent'],
      adults,
      children,
      comments
    };
    
    trips.push(newTrip);
    fs.writeFileSync(tripsFilePath, tripsToCSV(trips));
    
    return newTrip;
  } catch (error) {
    console.error('Error creating trip:', error);
    return null;
  }
}

// Update an existing trip
export function updateTrip(
  tripId: string,
  userId: string,
  updateData: Partial<Trip>
): Trip | null {
  try {
    const trips = getAllTrips();
    
    // Find the trip index
    const tripIndex = trips.findIndex(trip => trip.id === tripId && trip.user_id === userId);
    
    if (tripIndex === -1) {
      return null;
    }
    
    // Update the trip with new data
    trips[tripIndex] = {
      ...trips[tripIndex],
      ...updateData,
    };
    
    fs.writeFileSync(tripsFilePath, tripsToCSV(trips));
    
    return trips[tripIndex];
  } catch (error) {
    console.error('Error updating trip:', error);
    return null;
  }
}

// Delete a trip
export function deleteTrip(tripId: string, userId: string): boolean {
  try {
    const trips = getAllTrips();
    
    // Find the trip index
    const tripIndex = trips.findIndex(trip => trip.id === tripId && trip.user_id === userId);
    
    if (tripIndex === -1) {
      return false;
    }
    
    // Remove the trip
    trips.splice(tripIndex, 1);
    
    fs.writeFileSync(tripsFilePath, tripsToCSV(trips));
    
    return true;
  } catch (error) {
    console.error('Error deleting trip:', error);
    return false;
  }
}

// Get a single trip by ID
export function getTripById(tripId: string, userId: string): Trip | null {
  try {
    const trips = getAllTrips();
    const trip = trips.find(trip => trip.id === tripId && trip.user_id === userId);
    return trip || null;
  } catch (error) {
    console.error('Error getting trip by ID:', error);
    return null;
  }
}
