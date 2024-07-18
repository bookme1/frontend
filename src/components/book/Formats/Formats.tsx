import { Dispatch, SetStateAction } from 'react';
import styled from '@emotion/styled';

const FormatSection = styled.div`
  margin-top: 20px;
`;

const FormatTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const FormatList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const FormatItem = styled.li`
  width: 60px;
`;

const FormatButton = styled.button`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
  width: 100%;
  height: 100%;
  z-index: 5;
  border: 1px solid gray;
  border-radius: 5px;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  position: relative; /* Added for the strike-through line */

  &.active {
    background-color: var(--red);
    color: white;
    border-color: var(--red);
  }

  &.disabled {
    border-color: #9f9f9f;
    background-color: #9f9f9f;
    color: #ececec;
    cursor: not-allowed; /* Optional: To indicate it's not clickable */
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: red;
      transform: rotate(-45deg);
      transform-origin: center;
    }
  }
`;

const Formats = ({
  epub,
  pdf,
  mobi,
  setChecked,
}: {
  epub: boolean;
  pdf: boolean;
  mobi: boolean;
  setChecked: Dispatch<SetStateAction<string[]>>;
}) => {
  function onFormatClicked(evt: any) {
    const format = evt.currentTarget.dataset.format;

    setChecked((prevState: string[]) => {
      if (!format) return prevState;

      if (prevState.includes(format)) {
        // Remove format
        return prevState.filter(item => item !== format);
      } else {
        // Add format
        return [...prevState, format];
      }
    });

    evt.currentTarget.classList.toggle('active');
  }

  return (
    <FormatSection>
      <FormatTitle>Формати:</FormatTitle>
      <FormatList>
        <FormatItem>
          <FormatButton
            className={!pdf ? 'disabled' : ''}
            disabled={!pdf}
            data-format="pdf"
            onClick={evt => {
              onFormatClicked(evt);
            }}
          >
            Pdf
          </FormatButton>
        </FormatItem>
        <FormatItem>
          <FormatButton
            className={!epub ? 'disabled' : ''}
            disabled={!epub}
            onClick={evt => {
              onFormatClicked(evt);
            }}
            data-format="epub"
          >
            Epub
          </FormatButton>
        </FormatItem>
        <FormatItem>
          <FormatButton
            className={!mobi ? 'disabled' : ''}
            disabled={!mobi}
            onClick={evt => {
              onFormatClicked(evt);
            }}
            data-format="mobi"
          >
            Mobi
          </FormatButton>
        </FormatItem>
      </FormatList>
    </FormatSection>
  );
};

export default Formats;
