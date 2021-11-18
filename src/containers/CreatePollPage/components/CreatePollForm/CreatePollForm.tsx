import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Input as InputMui,
  Typography,
} from '@mui/material';
import arrayMutators from 'final-form-arrays';
import FieldHOC from 'hoc/FieldHOC';
import React, { FC } from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { FormattedMessage, useIntl } from 'react-intl';
import CloseIcon from 'ui-kit/icons/CloseIcon';
import useKeystone from '../../../../keystone';
import Channel from '../../../../keystone/chat/channel';
import { Button } from '../../../../ui-kit';
import { createPoll } from '../../services';
import { ICreatePollForm } from '../../types';
import ErrorMessage from '../ErrorMessage';
import useStyles from './styles';
import validate from './validate';

const InputField = FieldHOC(InputMui);
const CheckboxField = FieldHOC(Checkbox);
const MAX_ADDED_OPTIONS = 10;
const MAX_OPTION_LENGTH = 150;

interface IProps {
  channel: Channel;
}
const EMPTY_POLL = { options: ['', ''], withAnswer: false, validOptions: [] };

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
    <Form onSubmit={onSubmit} initialValues={EMPTY_POLL} mutators={{ ...arrayMutators }} validate={validate}>
      {({ handleSubmit, values, errors }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ marginBottom: 4 }}>
              <FormattedMessage id="pollQuestion" />
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                style={{ margin: 0 }}
                control={
                  <Field
                    name="question"
                    component={InputField}
                    rows={5}
                    multiline
                    placeholder={intl.formatMessage({ id: 'enterYourQuestion' })}
                    classes={{ root: classes.textInput }}
                    disableUnderline
                  />
                }
                label=""
              />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth>
            <FormGroup>
              <FormControlLabel
                control={<Field name="withAnswer" component={CheckboxField} />}
                label={intl.formatMessage({ id: 'pollWithCorrectAnswer' })}
              />
            </FormGroup>
          </FormControl>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" style={{ marginBottom: 4 }}>
              <FormattedMessage id="pollOptions" />
            </FormLabel>
          </FormControl>

          <FieldArray name="options">
            {({ fields }) => (
              <>
                {fields.map((field, idx) => (
                  <FormControl component="fieldset" fullWidth key={field} style={{ marginBottom: 16 }}>
                    <FormGroup row>
                      {values.withAnswer && (
                        <FormControlLabel
                          control={<Field name={`validOptions.${idx}`} component={CheckboxField} />}
                          label=""
                        />
                      )}
                      <FormControlLabel
                        style={{ margin: 0, flexGrow: 1 }}
                        control={
                          <Field
                            name={`${field}`}
                            component={InputField}
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
                  onClick={() => fields.value.length < MAX_ADDED_OPTIONS && fields.push('')}
                >
                  <Typography>
                    <FormattedMessage id="addOption" />
                  </Typography>
                </Button>
              </>
            )}
          </FieldArray>
          <ErrorMessage message={errors?.all[0]} />
          <Button type="submit" variant="submit" fullWidth size="large" disabled={errors?.all[0]}>
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
