import { DatesAsStrings } from "./Dates";

export async function get<T>(apiPath: string) : Promise<T> {
    const response = await fetch(`api/${apiPath}`)
    return await response.json();
}

export async function getWithDatesArray<T>(apiPath: string, convert: (data: DatesAsStrings<T>) => T) : Promise<T[]> {
    const data = await get<DatesAsStrings<T>[]>(apiPath);
    return (data.map(convert));
}

export async function getWithDates<T>(apiPath: string, convert: (data: DatesAsStrings<T>) => T) : Promise<T> {
    const data = await get<DatesAsStrings<T>>(apiPath);
    return convert(data);
}

export async function post(apiPath: string, data : any) : Promise<boolean>
{
    const response = await fetch(`api/${apiPath}`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      return response.ok;
}
