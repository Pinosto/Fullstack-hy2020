import React, { useState } from "react";
import { Grid, Button, Checkbox, CheckboxProps } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { DiagnosisSelection, NumberField, TextField } from "./FormField";
import { NewEntry, Entry, EntryTypesEnum, EntryTypes } from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = Omit<Entry, "id">;

export interface FormikEntryValues {
  type: EntryTypes;
  description: string;
  date: string,
  specialist: string,
  diagnosisCodes: string[],
  employerName: string,
  dischargeDate: string,
  dischargeCriteria: string,
  sickLeaveFrom: string,
  sickLeaveTo: string,
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();


  const [entryTypeRadioButton, setentryTypeRadioButton] = useState<EntryTypes>(EntryTypesEnum.Hospital);

  const handleChange = (event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) =>
    setentryTypeRadioButton(data.value as EntryTypes);

  const handleSubmit = (values: FormikEntryValues) => {
    const formedEntry: NewEntry = {
      ...values,
      discharge: { date: values.dischargeDate, criteria:values.dischargeCriteria},
      sickLeave: { startDate: values.sickLeaveFrom, endDate: values.sickLeaveTo },
    };
    console.log('values');
    console.log(formedEntry);
    onSubmit(formedEntry);
  };
  return (
    <div>
      <Grid padded centered>
        <Grid.Column width={4}>
          <Checkbox
            radio
            label='Hospital Entry'
            name='checkboxRadioGroup'
            value='Hospital'
            checked={entryTypeRadioButton === 'Hospital'}
            onChange={handleChange}

          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Checkbox
            radio
            label='Health Check'
            name='checkboxRadioGroup'
            value='HealthCheck'
            checked={entryTypeRadioButton === 'HealthCheck'}
            onChange={handleChange}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Checkbox
            radio
            label='Occupational Healthcare'
            name='checkboxRadioGroup'
            value='OccupationalHealthcare'
            checked={entryTypeRadioButton === 'OccupationalHealthcare'}
            onChange={handleChange}
          />
        </Grid.Column>
      </Grid>

      <Formik
        initialValues={{
          type: entryTypeRadioButton,
          description: "",
          date: "",
          specialist: "",
          diagnosisCodes: [],
          employerName: "",
          dischargeDate: "",
          dischargeCriteria: "",
          sickLeaveFrom: "",
          sickLeaveTo: "",
        }}
        onSubmit={handleSubmit}
        validate={values => {
          values.type = entryTypeRadioButton;
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};

          if (!values.type) {
            errors.type = requiredError;
          }
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!(Date.parse(values.date))) {
            errors.date = 'invalid date';
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          if (entryTypeRadioButton === 'OccupationalHealthcare' && !values.employerName) {
            errors.employerName = requiredError;
          }
          if (entryTypeRadioButton === 'OccupationalHealthcare' && values.sickLeaveFrom !== "" && !(Date.parse(values.sickLeaveFrom))) {
            errors.sickLeaveFrom = 'invalid date';
          }
          if (entryTypeRadioButton === 'OccupationalHealthcare' && values.sickLeaveTo !== "" && !(Date.parse(values.sickLeaveTo))) {
            errors.sickLeaveTo = 'invalid date';
          }
          if (entryTypeRadioButton === 'OccupationalHealthcare' && values.dischargeDate !== "" && !(Date.parse(values.dischargeDate))) {
            errors.dischargeDate = 'invalid date';
          }
          if (entryTypeRadioButton === 'OccupationalHealthcare' && !values.employerName) {
            errors.employerName = requiredError;
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched, }) => {
          return (
            <Form className="form ui" >
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnosis)}
              />
              {entryTypeRadioButton === "Hospital" &&
                <>
                  <Field
                    label="Discharge Date"
                    placeholder="YYYY-MM-DD"
                    name="dischargeDate"
                    component={TextField}
                  />
                  <Field
                    label="Discharge Criteria"
                    placeholder="Description"
                    name="dischargeCriteria"
                    component={TextField}
                  />
                </>
              }
              {entryTypeRadioButton === "HealthCheck" &&
                <Field
                  label="HealthCheckRating"
                  name="healthCheckRating"
                  placeholder="Zero is best and 3 Worst"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              }
              {entryTypeRadioButton === "OccupationalHealthcare" &&
                <>
                  <Field
                    label="Employer Name"
                    placeholder="EmployerName"
                    name="employerName"
                    component={TextField}
                  />
                  <Field
                    label="SickLeave From"
                    placeholder="YYYY-MM-DD"
                    name="sickLeaveFrom"
                    component={TextField}
                  />
                  <Field
                    label="SickLeave To"
                    placeholder="YYYY-MM-DD"
                    name="sickLeaveTo"
                    component={TextField}
                  />
                </>
              }
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddEntryForm;
