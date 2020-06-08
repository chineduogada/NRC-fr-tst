import moment from 'moment';

/**
 * @module - date.js - Exposes a set of date/time utility functions
 * @param { Object } _moment - a date/time package dependency. The default export
 * of this module uses the `moment.js` library
 */
export const _default = (_moment) => {
  /**
   * Provides the amount of duration between `a` and `b` dates
   * in the given `unit`
   * @description It is calculated as `b` - `a`.
   *
   * @param { Date } a Start date
   * @param { Date } b End date
   * @param { string? } unit - An optional unit of measurement
   *
   * @returns { number } the difference between the two dates in the the given `unit`.
   * If no arguemnt is passed for the `unit`, the date difference will be in days.
   */
  const getDurationBetween = (a, b, unit = 'days') => {
    const startMoment = _moment(a);
    const endMoment = _moment(b);
    return endMoment.diff(startMoment, unit);
  };

  return {
    getDurationBetween,
  };
};

export default _default(moment);
