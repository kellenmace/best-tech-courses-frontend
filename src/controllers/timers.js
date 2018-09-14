// COUNTDOWN TIMER EXAMPLES:
// https://www.npmjs.com/package/react-countdown-now
// https://stackoverflow.com/questions/40885923/countdown-timer-in-react
// https://codesandbox.io/s/zmP5vGEOm
// https://medium.com/@sairamkrish/reactjs-countdown-timer-with-support-for-callbacks-browsercrash-and-optimal-rendering-performance-ba38b045c65d

const TIMERS_KEY = 'timers';
const TIMER_DURATION = 30 * 60000; // 30 mins in milliseconds.

const isExpired = timer => timer.startTimestamp + TIMER_DURATION < Date.now();

const hasCourseId = (timer, courseId) => timer.courseId === courseId;

const getTimersFromLocalStorage = () => JSON.parse(localStorage.getItem(TIMERS_KEY)) || [];

export const getActiveTimersFromLocalStorage = () =>
  getTimersFromLocalStorage().filter(timer => !isExpired(timer));

export const saveTimersToLocalStorage = timers =>
  localStorage.setItem(TIMERS_KEY, JSON.stringify(timers));

export const deleteTimersFromLocalStorage = () => localStorage.removeItem(TIMERS_KEY);

// Get the other non-expired timers, excluding the ones with this course ID.
export const getOtherActiveTimers = (timers, courseId) =>
  timers.filter(timer => !isExpired(timer)).filter(timer => !hasCourseId(timer, courseId));
