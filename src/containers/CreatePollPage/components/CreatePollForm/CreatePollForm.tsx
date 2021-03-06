import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, Radio, SvgIcon, Typography } from '@mui/material';
import arrayMutators from 'final-form-arrays';
import FieldHOC from 'hoc/FieldHOC';
import useKeystone from 'keystone';
import Channel from 'keystone/chat/channel';
import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Input } from 'ui-kit';
import CloseIcon from 'ui-kit/icons/CloseIcon';

import { createPoll } from '../../services';
import { ICreatePollForm, PollTypeEnum } from '../../types';
import SelectPollType from '../SelectPollType';
import useStyles from './styles';
import validate, { MAX_NUMBER_OF_QUESTION_LENGTH } from './validate';

interface IProps {
  channel: Channel;
}

const InputField = FieldHOC(Input);
const CheckboxField = FieldHOC(Checkbox);

const MAX_ADDED_OPTIONS = 8;

const initialValues: ICreatePollForm = {
  withAnswer: false,
  isOpenEnded: false,
  question: '',
  options: ['', '', ''],
  validOptions: [],
};

const CreatePollForm: FC<IProps> = (props) => {
  const intl = useIntl();
  const { channel } = props;
  const { ui } = useKeystone();
  const classes = useStyles();

  const onSubmit = async (values: ICreatePollForm) => {
    try {
      if (values?.options) {
        values.options = values.options.filter((option) => option);
      }

      const response = await createPoll(values, +channel.id);
      channel.addPoll(response);
      ui.back();
    } catch {
      // show error
    }
  };

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} mutators={{ ...arrayMutators }} validate={validate}>
      {({ handleSubmit, values, errors, form }) => {
        /*
          multipleAnswer: withAnswer = false, isOpenEnded = false;
          oneAnswer: withAnswer = true;
          OpenEndedAnswer: isOpenEnded = true;
        */
        const selectedPollType = values.withAnswer
          ? PollTypeEnum.OneAnswer
          : values.isOpenEnded
          ? PollTypeEnum.OpenEndedAnswer
          : PollTypeEnum.MultipleAnswer;

        return (
          <form onSubmit={handleSubmit} className={classes.form}>
            <SelectPollType form={form} selectedPollType={selectedPollType} />
            <Box paddingRight="24px">
              <FormControl component="fieldset" fullWidth>
                <Typography marginBottom={3}>
                  <FormattedMessage id="pollQuestion" />
                </Typography>

                <FormGroup>
                  <FormControlLabel
                    sx={{ m: 0 }}
                    control={
                      <Field
                        name="question"
                        component={InputField}
                        rows={5}
                        multiline
                        fullWidth
                        data-qa="enterYourQuestion"
                        placeholder={intl.formatMessage({ id: 'enterYourQuestion' })}
                        inputProps={{ maxLength: MAX_NUMBER_OF_QUESTION_LENGTH }}
                      />
                    }
                    label=""
                  />
                </FormGroup>

                <Typography variant="body2" mt={1} color="text.light02">
                  {values.question?.length || 0} / {MAX_NUMBER_OF_QUESTION_LENGTH}
                </Typography>
              </FormControl>

              {selectedPollType !== PollTypeEnum.OpenEndedAnswer && (
                <>
                  <Box sx={{ mt: 5, mb: 3 }}>
                    <Typography color="text.black02">
                      <FormattedMessage id="pollOptions" />
                    </Typography>
                  </Box>

                  <FieldArray name="options">
                    {({ fields }) => (
                      <>
                        <Grid container rowGap={2} justifyContent="center">
                          {fields.map((field, idx) => (
                            <Grid item xs={12} container wrap="nowrap" alignItems="center" key={idx}>
                              {selectedPollType === PollTypeEnum.OneAnswer && (
                                <Radio
                                  checked={!!values.validOptions[idx]}
                                  onChange={() =>
                                    form.change(
                                      'validOptions',
                                      values.options.map((_, arrIdx) => arrIdx === idx),
                                    )
                                  }
                                />
                              )}
                              {/* temporarily removed option to propose multiple correct answers */}
                              {/* {selectedPollType === PollTypeEnum.MultipleAnswer && (
                                <Field name={`validOptions.${idx}`} type="checkbox" component={CheckboxField} />
                              )} */}

                              <Field
                                name={`${field}`}
                                component={InputField}
                                data-qa={`enterOption-${idx}`}
                                placeholder={intl.formatMessage({ id: 'enterOption' })}
                                fullWidth
                                inputProps={{
                                  maxLength: MAX_NUMBER_OF_QUESTION_LENGTH,
                                }}
                                rightIcon={
                                  values.options.length > 2 && (
                                    <SvgIcon onClick={() => fields.remove(idx)}>
                                      <CloseIcon />
                                    </SvgIcon>
                                  )
                                }
                              />
                            </Grid>
                          ))}
                          {MAX_ADDED_OPTIONS - values.options.length !== 0 && (
                            <Typography color="text.light02" variant="body2" textAlign="center">
                              <FormattedMessage
                                id="addOptionsNumber"
                                values={{ number: MAX_ADDED_OPTIONS - values.options.length }}
                              />
                            </Typography>
                          )}
                          <Button
                            variant="link"
                            fullWidth
                            data-qa="addOption"
                            onClick={() => fields.value.length < MAX_ADDED_OPTIONS && fields.push('')}
                          >
                            <Typography>
                              <FormattedMessage id="addOption" />
                            </Typography>
                          </Button>
                        </Grid>
                      </>
                    )}
                  </FieldArray>
                </>
              )}

              <Typography color="text.light02" variant="body2" textAlign="center" mt={3} mb={3}>
                {errors?.all[0]}
              </Typography>
              <Button
                data-qa="createPoll"
                type="submit"
                variant="primary"
                fullWidth
                size="large"
                disabled={errors?.all[0]}
              >
                <Typography>
                  <FormattedMessage id="createPoll" />
                </Typography>
              </Button>
            </Box>
          </form>
        );
      }}
    </Form>
  );
};

export default CreatePollForm;
