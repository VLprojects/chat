import { ICreatePollForm } from '../../types';
import intl from '../../../../utils/intl';

const MIN_NUMBER_OF_VALID_OPTIONS = 1;
const MIN_NUMBER_OF_WRITTEN_OPTIONS = 2;

// https://stackoverflow.com/questions/36144406/how-to-early-break-reduce-method
function findNumberOfFilledOptions(options: string[], min_number: number): number {
  return options.slice(0).reduce(
    (acc, curr, i, arr) =>
      // @ts-ignore
      acc === min_number ? arr.splice(1) : (acc += curr.trim() ? 1 : 0),
    0,
  ) as unknown as number;
}

function checkValidOptionsIsNotEmpty(validOptions: string[], options: string[]) {
  let result = true;
  validOptions.forEach((item, idx) => {
    if (item && !options[idx]) {
      result = false;
    }
  });

  return result;
}

interface IReturnProps {
  all: string[];
}

export default (values: ICreatePollForm): IReturnProps => {
  const errors: IReturnProps = {
    all: [],
  };

  if (!values.question?.trim()) {
    errors.all.push(intl.formatMessage({ id: 'questionNotBeEmpty' }));
  }

  if (values?.question?.trim().length < 3) {
    errors.all.push(intl.formatMessage({ id: 'questionValidateLongerLetters' }));
  }

  if (values?.question?.trim().length > 150) {
    errors.all.push("Question couldn't be longer then 150 letters");
  }

  if (findNumberOfFilledOptions(values.options, MIN_NUMBER_OF_WRITTEN_OPTIONS) < MIN_NUMBER_OF_WRITTEN_OPTIONS) {
    errors.all.push(intl.formatMessage({ id: 'questionValidateWriteLeastTwoAnswerOptions' }));
  }

  if (
    values.withAnswer &&
    findNumberOfFilledOptions(values.validOptions, MIN_NUMBER_OF_VALID_OPTIONS) < MIN_NUMBER_OF_VALID_OPTIONS
  ) {
    errors.all.push(intl.formatMessage({ id: 'questionValidateLeastOneCorrectAnswer' }));
  }

  if (values.withAnswer && !checkValidOptionsIsNotEmpty(values.validOptions, values.options)) {
    errors.all.push(intl.formatMessage({ id: 'questionValidateCorrectAnswerNotEmpty' }));
  }
  return errors;
};
