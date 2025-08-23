import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

import { createPortal } from "react-dom";

function Portal({ children }) {
  return createPortal(children, document.body);
}

const GlassDatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px) saturate(180%);
    border: none;
    border-radius: 10px;
    color: #333;
    width: 100%;
    font-size: 0.95rem;
    transition: 0.2s ease;

    &:focus {
      background: rgba(255, 255, 255, 0.8);
      outline: none;
      box-shadow: 0 0 0 2px #9a4ef1;
    }
  }

  /* Calendar popup glass effect */
  .react-datepicker {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px) saturate(150%);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .react-datepicker__header {
    background: transparent;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }

  .react-datepicker__day--selected {
    background: linear-gradient(90deg, #9a4ef1, #ff6ec7);
    color: white;
    border-radius: 6px;
  }
`;

export default function GlassDatePicker({ selected, onChange, placeholder }) {
  return (
    <GlassDatePickerWrapper>
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        dateFormat="Pp" // Example: 08/10/2025, 3:30 PM
        placeholderText={placeholder}
      />
    </GlassDatePickerWrapper>
  );
}

// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import styled from "styled-components";

// const GlassDatePickerWrapper = styled.div`
//   .react-datepicker-popper {
//     z-index: 999999 !important;
//   }

//   .react-datepicker-wrapper {
//     width: 100%;
//   }

//   .react-datepicker__portal {
//     background: transparent !important;
//     z-index: 999999 !important;
//   }

//   .react-datepicker__input-container input {
//     padding: 0.75rem 1rem;
//     background: rgba(255, 255, 255, 0.6);
//     backdrop-filter: blur(10px) saturate(180%);
//     border: none;
//     border-radius: 10px;
//     color: #333;
//     width: 100%;
//     font-size: 0.95rem;
//     transition: 0.2s ease;

//     &:focus {
//       background: rgba(255, 255, 255, 0.8);
//       outline: none;
//       box-shadow: 0 0 0 2px #9a4ef1;
//     }
//   }

//   /* Calendar popup glass effect */
//   .react-datepicker {
//     background: rgba(255, 255, 255, 0.85);
//     backdrop-filter: blur(12px) saturate(150%);
//     border-radius: 12px;
//     box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
//     border: 1px solid rgba(255, 255, 255, 0.3);
//     z-index: 9999 !important;
//   }

//   .react-datepicker__header {
//     background: transparent;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.3);
//   }

//   .react-datepicker__day--selected {
//     background: linear-gradient(90deg, #9a4ef1, #ff6ec7);
//     color: white;
//     border-radius: 6px;
//   }
// `;

// export default function GlassDatePicker({ selected, onChange }) {
//   return (
//     <GlassDatePickerWrapper>
//       <DatePicker
//         selected={selected}
//         onChange={onChange}
//         showTimeSelect
//         dateFormat="Pp" // Example: 08/10/2025, 3:30 PM
//         popperContainer={(props) => <div {...props} />}
//         portalId="root-date-picker"
//         withPortal
//       />
//     </GlassDatePickerWrapper>
//   );
// }
