import { styled, Theme } from '@mui/system';
import { COLOURS } from 'theme/consts';

const StyledInputElement = styled('input')((props: { theme: Theme; error: boolean }) => {
  return `
  padding: 0;
  border: 0;
  padding: 0;
  margin: 0;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  color: ${props.error ? COLOURS.ERROR : COLOURS.BLACK_01};
  font-family: 'PTRootUIWebMedium';

  &::placeholder {
    color: ${COLOURS.LIGHT_02};
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    background: none;
    color: ${COLOURS.LIGHT_02};
  }
`;
});

const textAreaLineHeight = 19;

const StyledTextareaElement = styled('textarea')((props: { theme: Theme; maxRows: number }) => {
  const { maxRows } = props;

  return `
  font-weight: 400;
  font-size: 15px;
  line-height: ${textAreaLineHeight}px;
  color: ${COLOURS.BLACK_01};
  width: 100%;
  border: 0;
  height: ${maxRows ? textAreaLineHeight * maxRows + 'px' : 'auto'};
  resize: none;
  font-family: 'PTRootUIWebMedium';

  &::placeholder {
    color: ${COLOURS.LIGHT_02};
  }

  &:focus {
    border: none;
    outline: none;
  }
`;
});

export { StyledInputElement, StyledTextareaElement };
