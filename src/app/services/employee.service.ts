import { Injectable, signal, Signal } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Employee } from '../utility/model';


const DB_NAME = 'EmployeeDB';
const STORE_NAME = 'employees';
const DB_VERSION = 1;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  private db!: IDBPDatabase;
  private readonly employeesSignal = signal<Employee[]>([]);

  constructor() {
    this.initializeDB();
  }

  private async initializeDB(): Promise<void> {
    this.db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      },
    });
    this.fetchAllEmployees();
  }

  async addEmployee(employee: Employee): Promise<void> {
    await this.db.add(STORE_NAME, employee);
    await this.fetchAllEmployees();
  }

  async updateEmployee(employee: Employee): Promise<void> {
    if (!employee.id) throw new Error('Employee ID is required for update');
    await this.db.put(STORE_NAME, employee);
    await this.fetchAllEmployees();
  }

  async deleteEmployee(id: number): Promise<void> {
    await this.db.delete(STORE_NAME, id);
    await this.fetchAllEmployees();
  }

  async getEmployeeById(id: number): Promise<Employee | undefined> {
    return await this.db.get(STORE_NAME, id);
  }

  async fetchAllEmployees(): Promise<void> {
    const employees = await this.db.getAll(STORE_NAME);
    this.employeesSignal.set(employees);
  }

  get employees(): Signal<Employee[]> {
    return this.employeesSignal;
  }
}