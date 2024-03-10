import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import "../calender.css"
import { DatesSetArg, EventContentArg } from '@fullcalendar/core'
import { Balance, CalenderContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/finnanceCalculations'
import { formatCurrency } from '../utils/formatting'

interface CalenderProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const Calender = ({ monthlyTransactions, setCurrentMonth }: CalenderProps) => {
  const events = [
    {
      title: "Meeting",
      start: "2024-03-11",
      income: 300,
      expense: 200,
      balance: 100,
    },
  ];

  // 月の取引データ
  const dailyBalances = calculateDailyBalances(monthlyTransactions);

  // FullCalender用のイベントを生成する関数
  const createCalenderEvents = (
    dailyBalances: Record<string, Balance>
  ): CalenderContent[] => {
    return Object.keys(dailyBalances).map((date) => {
      const { income, expense, balance } = dailyBalances[date];
      return {
        start: date,
        income: formatCurrency(income),
        expense: formatCurrency(expense),
        balance: formatCurrency(balance),
      };
    });
  };
  const calenderEvents = createCalenderEvents(dailyBalances);
  console.log(calenderEvents);

  const renderEventContent = (eventInfo: EventContentArg) => {
    console.log(eventInfo);
    return (
      <div>
        <div className="money" id="event-income">
          {eventInfo.event.extendedProps.income}
        </div>
        <div className="money" id="event-expense">
          {eventInfo.event.extendedProps.expense}
        </div>
        <div className="money" id="event-balance">
          {eventInfo.event.extendedProps.balance}
        </div>
      </div>
    );
  };

  const handleDateSet = (datesetInfo: DatesSetArg) => {
    console.log(datesetInfo)
    setCurrentMonth(datesetInfo.view.currentStart)
  };

  return (
    <FullCalendar
      locale={jaLocale}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calenderEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet}
    />
  );
};

export default Calender