import { useIntl } from 'react-intl';
import { ICreatePollForm } from '../../types';

const MIN_NUMBER_OF_VALID_OPTIONS = 1;
const MIN_NUMBER_OF_WRITTEN_OPTIONS = 2;
const MIN_NUMBER_OF_QUESTION_LENGTH = 1;
export const MAX_NUMBER_OF_QUESTION_LENGTH = 250;

// https://stackoverflow.com/questions/36144406/how-to-early-break-reduce-method
function findNumberOfFilledOptions<T>(options: T[], min_number: number): number {
  return options.slice(0).reduce(
    (acc, curr, i, arr) =>
      // @ts-ignore
      acc === min_number ? arr.splice(1) : (acc += curr ? 1 : 0),
    0,
  ) as unknown as number;
}

function checkValidOptionsIsNotEmpty<T>(validOptions: T[], options: string[]) {
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
  const intl = useIntl();
  const errors: IReturnProps = {
    all: [],
  };

  if (!values.question?.trim()) {
    errors.all.push(intl.formatMessage({ id: 'questionNotBeEmpty' }));
  }

  if (values?.question?.trim().length < MIN_NUMBER_OF_QUESTION_LENGTH) {
    errors.all.push(
      intl.formatMessage({ id: 'questionValidateLongerLetters' }, { length: MIN_NUMBER_OF_QUESTION_LENGTH }),
    );
  }

  if (values?.question?.trim().length > MAX_NUMBER_OF_QUESTION_LENGTH) {
    errors.all.push(
      intl.formatMessage({ id: 'questionValidateNotLongerLetters' }, { length: MAX_NUMBER_OF_QUESTION_LENGTH }),
    );
  }

  if (
    !values?.isOpenEnded &&
    findNumberOfFilledOptions(values.options, MIN_NUMBER_OF_WRITTEN_OPTIONS) < MIN_NUMBER_OF_WRITTEN_OPTIONS
  ) {
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
