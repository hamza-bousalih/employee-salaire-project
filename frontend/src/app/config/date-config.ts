import {formatDate} from "@angular/common";

export class DateConfig {
  public static tostring(date: Date, format: string = 'yyyy-MM-dd'): string {
    return formatDate(date,format,'en-US')
  }
}
