// frontend/src/components/CalendarComponnet.jsx

import React, { useState, useRef, useEffect } from 'react';
import 'cally';

const CalendarComponent = () => {
  const [date, setDate] = useState('Pick a date');
  const [isOpen, setIsOpen] = useState(false);
  const callyRef = useRef(null);

  useEffect(() => {
    const callyElement = document.querySelector('calendar-date.cally');
    if (callyElement) {
      callyElement.addEventListener('change', (e) => {
        if (e.detail && e.detail.value) {
          setDate(e.detail.value);
          setIsOpen(false); // Close the popover after selecting a date
        }
      });
    }
  }, []);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className = 'mt-2 flex justify-center'>
      <button onClick={togglePopover} className="input input-border" id="cally1" style={{ anchorName: "--cally1" }} >
        {date}
      </button>
      {isOpen && ( 
      
      <div id="cally-popover1" className="dropdown bg-base-100 rounded-box shadow-lg" style={{ positionAnchor: "--cally1" }} >
          <calendar-date ref={callyRef} class="cally">
            <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
            <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
            <calendar-month></calendar-month>
          </calendar-date>
      </div>
      
      )}
    </div>
  );
};

export default CalendarComponent;