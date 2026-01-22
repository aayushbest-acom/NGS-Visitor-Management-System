import { formatDate } from "@angular/common";
import { Profile } from "../models/profile";

export class HostOrStaffHelper {
    public static getHostOrStaffIdByName(name: Readonly<string>, collection: ReadonlyArray<Profile>): string | null {
        const results = collection.filter((hostOrStaff: Profile) => hostOrStaff.name.includes(name));
        if (results.length === 0) {
            return null;
        }
        return results[0].id;
    }

    public static getHostOrStaffIdByPhone(phone: Readonly<string>, collection: ReadonlyArray<Profile>): string | null {
        const results = collection.filter((hostOrStaff: Profile) => hostOrStaff.phone.includes(phone));
        if (results.length === 0) {
            return null;
        }
        return results[0].id;
    }

    public static getHostOrStaffById(hostOrStaffId: Readonly<string>, collection: Readonly<Array<Profile>>): Profile | null {
        const results = collection.filter((hostOrStaff: Profile) => hostOrStaff.id === hostOrStaffId);
        if (results.length === 0) {
            return null;
        }
        return results[0];
    }

    public static formatHostOrStaffDataById(hostOrStaff: Profile | null): string | null {
        if (hostOrStaff === null) {
            return null;
        }
        const formattedData = hostOrStaff.name + " | " + hostOrStaff.phone;
        return formattedData;
    }
}
