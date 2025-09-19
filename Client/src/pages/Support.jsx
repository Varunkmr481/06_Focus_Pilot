// // import { IoChatbubble } from "react-icons/io5";
// // import { MdMail } from "react-icons/md";
// // import styled from "styled-components";

// // const ContentSupportContainer = styled.div`
// //   /* background-color: plum; */
// //   width: 100%;
// // `;

// // const GridSupportContainer = styled.div`
// //   display: grid;
// //   grid-template-columns: 100%;
// //   grid-template-rows: 20vh 70vh 20vh 20vh;
// //   row-gap: 5vh;

// //   /* .item-1,
// //   .item-3 {
// //     background-color: aqua;
// //   }

// //   .item-2,
// //   .item-4 {
// //     background-color: lightskyblue;
// //   } */

// //   .item-1 {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 1vh;
// //     align-items: center;
// //     box-sizing: border-box;
// //   }

// //   .item-2 {
// //     box-sizing: border-box;
// //     display: flex;
// //     flex-direction: column;
// //     justify-content: center;
// //     gap: 22px;
// //     border: 2px solid #5f00d9;
// //     border-radius: 1rem;
// //     padding: 1.5vh 2vh;
// //     box-sizing: border-box;
// //     background-color: white;
// //   }

// //   .item-3 {
// //     display: flex;
// //     flex-direction: column;
// //     gap: 1vh;
// //     align-items: center;
// //     text-align: center;
// //   }

// //   .item-4 {
// //     background: linear-gradient(
// //       to right,
// //       #a049f7 0%,
// //       #8149f7 30%,
// //       #8b49f7 100%
// //     );
// //     border-radius: 1rem;
// //     padding: 0 2vh;
// //     z-index: 9;
// //     position: relative;
// //     box-sizing: border-box;

// //     img {
// //       position: absolute;
// //       top: 0;
// //       left: 0;
// //       width: 100%;
// //       z-index: 9999;
// //       mix-blend-mode: multiply;
// //     }
// //   }

// //   @media (min-width: 768px) {
// //     grid-template-rows: 50vh 20vh;
// //     grid-template-columns: 40% 60%;
// //     row-gap: 5vh;

// //     .item-1,
// //     .item-3 {
// //       grid-column: 1/2;
// //     }

// //     .item-2,
// //     .item-4 {
// //       grid-column: 2/3;
// //     }

// //     .item-1 {
// //       align-items: stretch;
// //       padding: 0 0.8rem 0 0;
// //     }

// //     .item-2 {
// //       gap: 9px;
// //     }

// //     .item-3 {
// //       align-items: stretch;
// //       text-align: unset;
// //       padding: 0 0.8rem 0 0;
// //     }
// //   }
// // `;

// // const FormLayout = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   gap: 18px;
// //   justify-content: center;

// //   @media (min-width: 768px) {
// //     /* gap: 24px; */
// //   }
// // `;

// // const FormRow = styled.div`
// //   display: flex;
// //   gap: 1.5rem;
// // `;

// // const MailIcon = styled(MdMail)`
// //   font-size: 2rem;
// //   color: #5f00d9;
// // `;

// // const HeaderText = styled.div`
// //   font-size: 1.9rem;
// //   font-weight: 900;
// // `;

// // const SubHeaderText = styled.div`
// //   font-size: 1rem;
// //   color: #5a5959;
// // `;

// // const ContactFormMessage = styled.div`
// //   font-size: 1rem;
// //   font-weight: 700;
// // `;

// // const FormField = styled.div`
// //   display: flex;
// //   gap: 0.3rem;
// //   flex-direction: column;
// //   width: 50%;

// //   label {
// //     font-size: 1rem;
// //     font-weight: 500;
// //   }

// //   input {
// //     height: 2rem;
// //   }

// //   input,
// //   textarea {
// //     box-sizing: border-box;
// //     border-radius: 0.5rem;
// //     padding: 0.3rem 0.7rem;
// //     background-color: transparent;
// //     border: 2px solid rgba(152, 152, 152, 0.3);
// //     width: 100%;
// //   }
// // `;

// // const AgreementWrapper = styled.div`
// //   display: flex;
// //   gap: 0.5rem;
// //   align-items: center;

// //   label {
// //     font-size: 0.9rem;
// //     font-weight: 700;
// //   }

// //   input[type="checkbox"] {
// //     transform: scale(1.3);
// //   }

// //   @media (min-width: 768px) {
// //     font-size: 1rem;
// //     gap: 0.8rem;
// //   }
// // `;

// // const FormBtnWrapper = styled.div`
// //   display: flex;
// //   align-items: center;
// //   justify-content: space-between;
// //   flex-direction: column;
// //   gap: 0.6rem;

// //   @media (min-width: 768px) {
// //     flex-direction: row;
// //     gap: 0;
// //   }
// // `;

// // const FormBtn = styled.div`
// //   width: 100%;
// //   background-color: #5f00d9;
// //   border-radius: 0.6rem;
// //   padding: 0.4rem 0.8rem;
// //   color: white;
// //   font-size: 1rem;
// //   font-weight: 700;
// //   text-align: center;
// //   transition: all 0.3s ease-in-out;

// //   &:hover {
// //     cursor: pointer;
// //     background-color: rgb(132, 45, 247);
// //     transform: translate(2px, -2px);
// //   }

// //   @media (min-width: 768px) {
// //     width: 48%;
// //     padding: 0.6rem 1rem;
// //     font-size: 1rem;
// //   }
// // `;

// // const MessageIcon = styled(IoChatbubble)`
// //   font-size: 2rem;
// //   color: #5f00d9;
// // `;

// // const ChatbotWrapper = styled.div`
// //   display: flex;
// //   height: 100%;
// //   flex-direction: column;
// //   justify-content: center;
// //   gap: 1rem;

// //   .chatbot-sticker {
// //     background-color: white;
// //     width: 5rem;
// //     text-align: center;
// //     padding: 0.1rem;
// //     border-radius: 0.8rem;
// //     color: #5f00d9;
// //     font-size: 0.9rem;
// //     font-weight: 700;
// //   }

// //   .chatbot-header {
// //     font-size: 1.5rem;
// //     color: white;
// //     font-weight: 500;
// //   }
// // `;

// // const Support = () => {
// //   return (
// //     <ContentSupportContainer>
// //       <GridSupportContainer>
// //         <div className="item-1">
// //           <MailIcon />
// //           <HeaderText>Contact Us</HeaderText>
// //           <SubHeaderText>
// //             Have a question or just want to know more? Feel free to reach out to
// //             us.
// //           </SubHeaderText>
// //         </div>

// //         <form className="item-2">
// //           <ContactFormMessage>
// //             You will receive response within 24 hours of time of submit.
// //           </ContactFormMessage>

// //           {/* form */}
// //           <FormLayout>
// //             <FormRow>
// //               <FormField>
// //                 <label htmlFor="name">Name</label>
// //                 <input type="text" name="for" id="name" />
// //               </FormField>
// //               <FormField>
// //                 <label htmlFor="surname">Surname</label>
// //                 <input type="text" name="surname" id="surname"></input>
// //               </FormField>
// //             </FormRow>

// //             <FormRow>
// //               <FormField>
// //                 <label htmlFor="email">Email</label>
// //                 <input type="text" name="email" id="email"></input>
// //               </FormField>
// //               <FormField>
// //                 <label htmlFor="message">Message</label>
// //                 <textarea name="message" id="message" rows={4}></textarea>
// //               </FormField>
// //             </FormRow>
// //           </FormLayout>

// //           {/* form end */}

// //           <AgreementWrapper>
// //             <input type="checkbox" id="check" name="check"></input>
// //             <label htmlFor="check">
// //               I agree with <span>Terms & Conditions.</span>
// //             </label>
// //           </AgreementWrapper>

// //           <FormBtnWrapper>
// //             <FormBtn>Send a message</FormBtn>
// //             <FormBtn>Book a meeting</FormBtn>
// //           </FormBtnWrapper>
// //         </form>

// //         <div className="item-3">
// //           <MessageIcon />
// //           <HeaderText>Live Chat</HeaderText>
// //           <SubHeaderText>
// //             Don’t have time to wait for the answer? Chat with us now.
// //           </SubHeaderText>
// //         </div>

// //         <div className="item-4">
// //           <img src="/Visual.png"></img>
// //           <ChatbotWrapper>
// //             <div className="chatbot-sticker">Chatbot</div>
// //             <div className="chatbot-header">Chat with us now</div>
// //           </ChatbotWrapper>
// //         </div>
// //       </GridSupportContainer>
// //     </ContentSupportContainer>
// //   );
// // };

// // export default Support;

// import { MdMail } from "react-icons/md";
// import styled from "styled-components";

// const ContentSupportContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   padding: 3rem 1rem;
// `;

// const SupportCard = styled.div`
//   max-width: 900px;
//   width: 100%;
//   background: rgba(255, 255, 255, 0.15);
//   backdrop-filter: blur(14px) saturate(180%);
//   border-radius: 1.2rem;
//   padding: 2rem;
//   box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
//   border: 1px solid rgba(255, 255, 255, 0.3);
// `;

// const HeaderSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   margin-bottom: 1.5rem;

//   svg {
//     font-size: 2.4rem;
//     color: rgb(95, 0, 217);
//     background: rgba(95, 0, 217, 0.1);
//     border-radius: 50%;
//     padding: 0.5rem;
//   }
// `;

// const HeaderText = styled.div`
//   font-size: 1.9rem;
//   font-weight: 900;
//   color: #000000ff;
// `;

// const SubHeaderText = styled.div`
//   font-size: 1rem;
//   color: rgba(0, 0, 0, 0.85);
// `;

// const ContactFormMessage = styled.div`
//   font-size: 1rem;
//   font-weight: 700;
//   color: #090808ff;
//   margin-bottom: 1.5rem;
// `;

// const FormLayout = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1.2rem;
// `;

// const FormRow = styled.div`
//   display: flex;
//   gap: 1rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const FormField = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;

//   label {
//     font-size: 0.9rem;
//     font-weight: 600;
//     color: #0b0a0aff;
//     margin-bottom: 0.3rem;
//   }

//   input,
//   textarea {
//     padding: 0.6rem 0.8rem;
//     border-radius: 0.5rem;
//     border: 2px solid rgba(134, 71, 215, 1);
//     background: rgba(255, 255, 255, 0.05);
//     color: #050404ff;
//     outline: none;
//     transition: all 0.3s ease;

//     &:focus {
//       border-color: rgb(95, 0, 217);
//       background: rgba(95, 0, 217, 0.15);
//     }
//   }

//   textarea {
//     resize: none;
//   }
// `;

// const AgreementWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   margin-top: 0.5rem;

//   input {
//     transform: scale(1.3);
//     accent-color: rgb(95, 0, 217);
//   }

//   label {
//     font-size: 0.85rem;
//     font-weight: 500;
//     color: #040303ff;

//     span {
//       color: rgb(173, 123, 255);
//       font-weight: 600;
//     }
//   }
// `;

// const FormBtnWrapper = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//   }
// `;

// const FormBtn = styled.button`
//   flex: 1;
//   background: linear-gradient(
//     135deg,
//     rgba(111, 0, 255, 0.9),
//     rgba(128, 0, 255, 0.8)
//   );
//   border: none;
//   border-radius: 0.6rem;
//   padding: 0.8rem;
//   color: white;
//   font-size: 1rem;
//   font-weight: 700;
//   text-align: center;
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     cursor: pointer;
//     background: linear-gradient(
//       135deg,
//       rgba(128, 0, 255, 0.95),
//       rgba(150, 50, 255, 0.9)
//     );
//     transform: translateX(2px) translateY(-2px);
//     box-shadow: 0 4px 12px rgba(95, 0, 217, 0.4);
//   }
// `;

// const Support = () => {
//   return (
//     <ContentSupportContainer>
//       <SupportCard>
//         <HeaderSection>
//           <MdMail />
//           <div>
//             <HeaderText>Contact Us</HeaderText>
//             <SubHeaderText>
//               Have a question or just want to know more? Feel free to reach out.
//             </SubHeaderText>
//           </div>
//         </HeaderSection>

//         <ContactFormMessage>
//           You will receive a response within 24 hours after submission.
//         </ContactFormMessage>

//         <form>
//           <FormLayout>
//             <FormRow>
//               <FormField>
//                 <label htmlFor="name">Name</label>
//                 <input type="text" id="name" name="name" />
//               </FormField>
//               <FormField>
//                 <label htmlFor="surname">Surname</label>
//                 <input type="text" id="surname" name="surname" />
//               </FormField>
//             </FormRow>

//             <FormRow>
//               <FormField>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" id="email" name="email" />
//               </FormField>
//               <FormField>
//                 <label htmlFor="message">Message</label>
//                 <textarea id="message" name="message" rows={4}></textarea>
//               </FormField>
//             </FormRow>
//           </FormLayout>

//           <AgreementWrapper>
//             <input type="checkbox" id="check" name="check" />
//             <label htmlFor="check">
//               I agree with <span>Terms & Conditions.</span>
//             </label>
//           </AgreementWrapper>

//           <FormBtnWrapper>
//             <FormBtn type="submit">Send a message</FormBtn>
//             <FormBtn type="button">Book a meeting</FormBtn>
//           </FormBtnWrapper>
//         </form>
//       </SupportCard>
//     </ContentSupportContainer>
//   );
// };

// export default Support;

import React from "react";
import { MdMail } from "react-icons/md";
import { IoChatbubbleOutline } from "react-icons/io5";
import styled from "styled-components";

// --- General Styles ---
const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* padding: 3rem 1rem; */
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
`;

const ContentCard = styled.div`
  max-width: 1100px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 1.2rem;
  padding: 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

// --- Left Section (Form) Styles ---
const LeftSection = styled.div`
  flex: 1;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionHeader = styled.div`
  margin-bottom: 0.6rem;
`;

const HeaderIcon = styled.div`
  background: #eef2ff;
  border-radius: 50%;
  padding: 0.75rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;

  svg {
    font-size: 2.2rem;
    color: #4f46e5;
  }
`;

const HeaderText = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const SubHeaderText = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.5;
`;

const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.4rem;
  }

  input,
  textarea {
    padding: 0.8rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;
    background-color: #ffffff;
    color: #1f2937;
    outline: none;
    transition: all 0.2s ease-in-out;
    font-size: 0.95rem;

    &:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
    }
    &::placeholder {
      color: #9ca3af;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const AgreementWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.5rem;

  input[type="checkbox"] {
    transform: scale(1.1);
    accent-color: #4f46e5;
    cursor: pointer;
  }

  label {
    font-size: 0.9rem;
    color: #4b5563;

    span {
      color: #4f46e5;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const FormButton = styled.button`
  width: 100%;
  padding: 0.9rem 1.5rem;
  background-color: #5f00d9;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);

  &:hover {
    background-color: #8842e3ff;
    box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
  }
`;

// --- Right Section (Visual/Testimonial) Styles ---
const RightSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%);
  position: relative;
  min-height: 300px;

  @media (min-width: 992px) {
    min-height: 100%;
  }
`;

const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("visual_2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const TestimonialOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 0.7) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.5rem;
`;

const TestimonialText = styled.p`
  font-size: 1.15rem;
  font-weight: 500;
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
`;

const AuthorTitle = styled.span`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
`;

const Support = () => {
  return (
    <PageWrapper>
      <ContentCard>
        <LeftSection>
          <SectionHeader>
            <HeaderIcon>
              <MdMail />
            </HeaderIcon>
            <HeaderText>Chat to our team</HeaderText>
            <SubHeaderText>
              Got a question, feedback, or a brilliant idea? We're here to help!
              Submit your query below, and our team will reach out to you via
              email within 24 hours.
            </SubHeaderText>
          </SectionHeader>

          <FormLayout>
            <FormRow>
              <FormField>
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                />
              </FormField>
              {/* <FormField>
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                />
              </FormField> */}
              <FormField>
                <label htmlFor="workEmail">Work email</label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  placeholder="you@company.com"
                />
              </FormField>
            </FormRow>

            {/* <FormRow>
              <FormField>
                <label htmlFor="workEmail">Work email</label>
                <input
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  placeholder="you@company.com"
                />
              </FormField>
              <FormField>
                <label htmlFor="phoneNumber">Phone number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+91 98765 43210"
                  pattern="[+91]{3} [0-9]{5} [0-9]{5}"
                />
              </FormField>
            </FormRow> */}

            <FormRow>
              <FormField>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="e.g., Bug in Login Page"
                />
              </FormField>
            </FormRow>

            <AgreementWrapper>
              <input type="checkbox" id="termsCheck" name="termsCheck" />
              <label htmlFor="termsCheck">
                I agree with <span>Terms & Conditions.</span>
              </label>
            </AgreementWrapper>

            <FormButton type="submit">Get in touch</FormButton>
          </FormLayout>
        </LeftSection>

        <RightSection>
          <ImageBackground />
          <TestimonialOverlay>
            <TestimonialText>
              "Our software helps us manage cash flow, financial reporting and
              payroll with ease. It’s a great solution for startups looking for
              an efficient way to manage their finances all-in-one."
            </TestimonialText>
            <AuthorInfo>
              <AuthorName>Varun Kumar</AuthorName>
              <AuthorTitle>Founder & CEO, Open Ventures</AuthorTitle>
            </AuthorInfo>
          </TestimonialOverlay>
        </RightSection>
      </ContentCard>
    </PageWrapper>
  );
};

export default Support;
