import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Input as InputMui,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import arrayMutators from 'final-form-arrays';
import FieldHOC from 'hoc/FieldHOC';
import React, { FC, useEffect, useState } from 'react';
import { Field, FieldInputProps, Form } from 'react-final-form';
import { FieldArray, FieldArrayProps } from 'react-final-form-arrays';
import { FormattedMessage, useIntl } from 'react-intl';
import CloseIcon from 'ui-kit/icons/CloseIcon';
import useKeystone from '../../../../keystone';
import Channel from '../../../../keystone/chat/channel';
import { Button } from '../../../../ui-kit';
import { createPoll } from '../../services';
import { ICreatePollForm, PollTypeEnum } from '../../types';
import ErrorMessage from '../ErrorMessage';
import useStyles from './styles';
import validate from './validate';

interface IProps {
  channel: Channel;
  selectedPollType: PollTypeEnum;
}

const InputField = FieldHOC(InputMui);
const CheckboxField = FieldHOC(Checkbox);
const MAX_ADDED_OPTIONS = 10;
const MAX_OPTION_LENGTH = 150;
const EMPTY_POLL = { question: '', options: ['', ''], withAnswer: false, validOptions: [], templateId: null };

const CreatePollForm: FC<IProps> = (props) => {
  const intl = useIntl();
  const { channel, selectedPollType } = props;
  const { ui } = useKeystone();
  const classes = useStyles();

  const POLL_TYPE_STATE = {
    withAnswer: selectedPollType === PollTypeEnum.OneAnswer,
    isOpenEnded: selectedPollType === PollTypeEnum.OpenEndedAnswer,
  };
  const [createPollData, setCreatePollData] = useState<ICreatePollForm>({
    ...EMPTY_POLL,
    ...POLL_TYPE_STATE,
  });

  useEffect(() => {
    setCreatePollData({
      ...EMPTY_POLL,
      ...POLL_TYPE_STATE,
    });
  }, [selectedPollType]);

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

  const onChangeRadio = (idx: number, fields: FieldArrayProps<FieldInputProps<unknown>, any>, values: any) => {
    const resArr = [];
    for (let i = 0; i < fields.length; i++) {
      resArr.push(i === idx);
    }

    setCreatePollData({
      ...values,
      validOptions: resArr,
    });
  };

  return (
    <Form onSubmit={onSubmit} initialValues={createPollData} mutators={{ ...arrayMutators }} validate={validate}>
      {({ handleSubmit, values, errors }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ marginBottom: 4 }}>
              <FormattedMessage id="pollQuestion" />
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                sx={{ m: 0 }}
                control={
                  <Field
                    name="question"
                    component={InputField}
                    rows={3}
                    multiline
                    data-qa="enterYourQuestion"
                    placeholder={intl.formatMessage({ id: 'enterYourQuestion' })}
                    classes={{ root: classes.textInput }}
                    disableUnderline
                  />
                }
                label=""
              />
            </FormGroup>
          </FormControl>

          {selectedPollType !== PollTypeEnum.OpenEndedAnswer && (
            <>
              <FormControl component="fieldset" fullWidth sx={{ mt: 1, mb: 0.5 }}>
                <FormLabel component="legend">
                  <FormattedMessage id="pollOptions" />
                </FormLabel>
              </FormControl>

              <FieldArray name="options">
                {({ fields }) => (
                  <>
                    <RadioGroup>
                      {fields.map((field, idx) => (
                        <FormControl component="fieldset" fullWidth key={field} style={{ marginBottom: 16 }}>
                          <FormGroup row>
                            {selectedPollType === PollTypeEnum.OneAnswer && (
                              <FormControlLabel
                                name={`validOptions.${idx}`}
                                value={`validOptions.${idx}`}
                                control={<Radio onChange={() => onChangeRadio(idx, fields, values)} />}
                                label=""
                              />
                            )}
                            {selectedPollType === PollTypeEnum.MultipleAnswer && (
                              <FormControlLabel
                                control={
                                  <Field name={`validOptions.${idx}`} type="checkbox" component={CheckboxField} />
                                }
                                label=""
                              />
                            )}
                            <FormControlLabel
                              sx={{ margin: 0, flexGrow: 1 }}
                              control={
                                <Field
                                  name={`${field}`}
                                  component={InputField}
                                  data-qa={`enterOption-${idx}`}
                                  placeholder={intl.formatMessage({ id: 'enterOption' })}
                                  classes={{ root: classes.textInput }}
                                  disableUnderline
                                  inputProps={{
                                    maxLength: MAX_OPTION_LENGTH,
                                  }}
                                />
                              }
                              label=""
                            />
                            <FormControlLabel
                              control={
                                <IconButton
                                  onClick={() => {
                                    if (values.options.length > 2) fields.remove(idx);
                                  }}
                                  style={{ marginLeft: 12 }}
                                >
                                  <CloseIcon />
                                </IconButton>
                              }
                              label=""
                            />
                          </FormGroup>
                        </FormControl>
                      ))}

                      <Button
                        variant="flatTransparent"
                        fullWidth
                        size="large"
                        data-qa="addOption"
                        onClick={() => fields.value.length < MAX_ADDED_OPTIONS && fields.push('')}
                      >
                        <Typography>
                          <FormattedMessage id="addOption" />
                        </Typography>
                      </Button>
                    </RadioGroup>
                  </>
                )}
              </FieldArray>
            </>
          )}

          <Box>
            <ErrorMessage style={{ fontSize: 14, paddingTop: 10 }} message={errors?.all[0]} />
          </Box>
          <Button data-qa="createPoll" type="submit" variant="submit" fullWidth size="large" disabled={errors?.all[0]}>
            <Typography>
              <FormattedMessage id="createPoll" />
            </Typography>
          </Button>
        </form>
      )}
    </Form>
  );
};

export default CreatePollForm;
