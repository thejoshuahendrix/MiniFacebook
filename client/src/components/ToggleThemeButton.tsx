import styled from "styled-components";

export const ToggleThemeButton = styled.div<{ active: boolean }>`
  background: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.text.secondary};
  padding: 1rem;
  text-align: center;
  font-size: 14px;
  height: 0px;
  width: 100px;
  border-radius: ${({ theme }) => theme.card.borderRadius};
  overflow: hidden;
  &::after {
    position: relative;
    content:"Theme";
    color: ${({ theme }) => theme.text.primary};
    top: -13px;
    color: rgba(0, 0, 0, 0);
    ${({ active }) => (active ? "right:-20px;" : "right: calc(30%);")};
    width: 30px;
    height: 20px;
    font-size: 20px;
    font-weight: bold;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background-color: ${({ active }) => (active ? "#252525 " : "#e9e9e9")};
    transition: 500ms right;
  }
  @media (max-width:${({ theme }) => theme.mobile}) {
    &::after{
      ${({ active }) => (active ? "right:0px;" : "right: calc(30%);")};
    }
  }
`;
