import type { Dayjs } from 'dayjs'
import type { GoogleCalendar } from '$types/GoogleCalendar'

export const getCalendarEvents = async (begin: Dayjs, end: Dayjs) => {
  let resp: GoogleCalendar = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/tech.cal.th@gmail.com/events?${new URLSearchParams(
      {
        key: 'AIzaSyBpmxgK9dbso4pEYWvg47SOoIqIBB83Pno',
        timeMin: begin.toISOString(),
        timeMax: end.endOf('day').toISOString(),
        singleEvents: 'true',
        maxResults: '999',
      }
    ).toString()}`,
    {
      headers: {
        referer: 'https://th.techcal.dev/',
      },
    }
  ).then(o => {
    if (o.ok) return o.json()
    else throw o
  })

  return resp.items
}