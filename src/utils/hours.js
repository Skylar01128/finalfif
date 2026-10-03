const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// "07:00" -> "7am", "18:30" -> "6:30pm"
export function formatTime(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return m ? `${hour}:${String(m).padStart(2, '0')}${suffix}` : `${hour}${suffix}`
}

// Day and minutes-since-midnight in the shop's own time zone, so a visitor
// browsing from elsewhere still sees the right open/closed state.
function shopClock(timeZone, now) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type) => parts.find((p) => p.type === type).value
  return {
    day: DAY_NAMES.indexOf(get('weekday')),
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export function openStatus(hours, timeZone, now = new Date()) {
  const { day, minutes } = shopClock(timeZone, now)
  const scheduleFor = (d) => hours.find((h) => h.open && h.days.includes(d))

  const today = scheduleFor(day)
  if (today && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Open now · until ${formatTime(today.close)}` }
  }

  for (let offset = 0; offset <= 7; offset++) {
    const d = (day + offset) % 7
    const schedule = scheduleFor(d)
    if (!schedule) continue
    if (offset === 0 && minutes >= toMinutes(schedule.open)) continue
    const when = offset === 0 ? '' : offset === 1 ? 'tomorrow ' : `${DAY_NAMES[d]} `
    return { open: false, label: `Closed · opens ${when}${formatTime(schedule.open)}` }
  }
  return { open: false, label: 'Closed' }
}
