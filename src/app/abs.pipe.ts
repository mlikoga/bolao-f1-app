import { Pipe, PipeTransform } from '@angular/core';
/*
 * Absolute value
 * Usage:
 *   value | abs
 * Example:
 *   {{ -2 | abs }}
 *   formats to: 2
*/
@Pipe({name: 'abs'})
export class AbsPipe implements PipeTransform {
  transform(value: number): number {
    return Math.abs(value);
  }
}